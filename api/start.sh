#!/bin/bash

echo "Starting application ..."

export ADDRESS_FILE=~/.ocean/ocean-contracts/artifacts/address.json

cd src
poetry run python server.py
