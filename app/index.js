const Web3 = require("web3");

const {
  Ocean,
  DataTokens,
  OceanPlatformTechStatus,
} = require("@oceanprotocol/lib");

const {
  factoryABI,
} = require("@oceanprotocol/contracts/artifacts/DTFactory.json");

const {
  datatokensABI,
} = require("@oceanprotocol/contracts/artifacts/DataTokenTemplate.json");

const { config, contracts, urls } = require("./config");

const dateCreated = new Date(Date.now()).toISOString().split(".")[0] + "Z";
const tokenAmount = "1000";
const timeout = 86400;
const price = "2";

const asset = {
  main: {
    type: "dataset",
    name: "UK Weather information 2011",
    dateCreated: dateCreated,
    datePublished: dateCreated,
    author: "Met Office",
    license: "CC-BY",
    files: [
      {
        url: "https://raw.githubusercontent.com/tbertinmahieux/MSongsDB/master/Tasks_Demos/CoverSongs/shs_dataset_test.txt",
        checksum: "efb2c764274b745f5fc37f97c6b0e764",
        contentLength: "4535431",
        contentType: "text/csv",
        encoding: "UTF-8",
        compression: "zip",
      },
    ],
  },
};

const algoAsset = {
  main: {
    type: "algorithm",
    name: "Test Algo",
    dateCreated: dateCreated,
    datePublished: dateCreated,
    author: "DevOps",
    license: "CC-BY",
    files: [
      {
        url: "https://raw.githubusercontent.com/oceanprotocol/test-algorithm/master/javascript/algo.js",
        contentType: "text/js",
        encoding: "UTF-8",
      },
    ],
    algorithm: {
      language: "js",
      format: "docker-image",
      version: "0.1",
      container: {
        entrypoint: "node $ALGO",
        image: "node",
        tag: "10",
      },
    },
  },
};

const init = async () => {
  const ocean = await Ocean.getInstance(config);
  const accounts = await ocean.accounts.list();

  const data = { t: 1, url: config.metadataCacheUri };
  const blob = JSON.stringify(data);

  const owner = accounts[0];
  const alice = accounts[1];
  const bob = accounts[2];

  console.log("Owner account address:", owner.getId());
  console.log("Alice account address:", alice.getId());
  console.log("Bob account address:", bob.getId());

  const datatoken = new DataTokens(
    contracts.DTFactory,
    factoryABI,
    datatokensABI,
    new Web3(urls.networkUrl),
    null
  );

  const tokenAddressWithTrustedAlgo = await datatoken.create(
    blob,
    alice.getId(),
    "10000000000",
    "AssetWithTrustedDT",
    "AWTDT"
  );

  const computeService = ocean.compute.createComputeService(
    alice,
    "1000",
    dateCreated
  );

  const datasetWithTrustedAlgo = await ocean.assets.create(
    asset,
    alice,
    [computeService],
    tokenAddressWithTrustedAlgo
  );

  const tokenAddressAlgorithm = await datatoken.create(
    blob,
    alice.getId(),
    "10000000000",
    "AlgoDT",
    "ALGDT"
  );

  const service = await ocean.assets.createAccessServiceAttributes(
    alice,
    price,
    dateCreated,
    0
  );
  const algorithmAsset = await ocean.assets.create(
    algoAsset,
    alice,
    [service],
    tokenAddressAlgorithm
  );

  console.log("datasetWithTrustedAlgo:", datasetWithTrustedAlgo);
  console.log("algorithmAsset:", algorithmAsset);

  await ocean.metadataCache.waitForAqua(datasetWithTrustedAlgo.id);
  await ocean.metadataCache.waitForAqua(algorithmAsset.id);

  await datatoken.mint(tokenAddressWithTrustedAlgo, alice.getId(), tokenAmount);
  await datatoken.mint(tokenAddressAlgorithm, alice.getId(), tokenAmount);

  let bobBalance, aliceBalance;

  const dTamount = "200";
  await datatoken.transfer(
    tokenAddressWithTrustedAlgo,
    bob.getId(),
    dTamount,
    alice.getId()
  );
  bobBalance = await datatoken.balance(
    tokenAddressWithTrustedAlgo,
    bob.getId()
  );

  console.log("Bob Balance Data: ", bobBalance);

  await datatoken.transfer(
    tokenAddressAlgorithm,
    bob.getId(),
    dTamount,
    alice.getId()
  );
  bobBalance = await datatoken.balance(tokenAddressAlgorithm, bob.getId());

  console.log("Bob Balance Alg : ", bobBalance);
};

init();
