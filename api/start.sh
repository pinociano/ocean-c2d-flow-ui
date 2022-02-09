#!/bin/bash

echo "Starting application ..."

#export OPERATOR_SERVICE_URL=https://c2d-dev.operator.oceanprotocol.com/

export ADDRESS_FILE=~/.ocean/ocean-contracts/artifacts/address.json
export OCEAN_NETWORK_URL=http://localhost:8545

cd src
poetry run python server.py
