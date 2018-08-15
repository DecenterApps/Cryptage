import ipfsapi
import json
from web3 import Web3, HTTPProvider, TestRPCProvider
from web3.contract import ConciseContract
from web3.middleware import geth_poa_middleware, construct_sign_and_send_raw_middleware
import random
from time import sleep
from dotenv import load_dotenv
from pathlib import Path  # python3 only
import os
import requests


api = ipfsapi.connect('127.0.0.1', 5001)

with open("../src/constants/config.json","r+") as jsonFile:
    config = json.load(jsonFile)

network_id = config["network"]
metadata_address = Web3.toChecksumAddress(config["metadataContract"]["address"])
metadata_abi = config["metadataContract"]["abi"]

w3 = Web3(HTTPProvider('https://rinkeby.decenter.com'))
w3.middleware_stack.inject(geth_poa_middleware, layer=0) # needed for Rinkeby network
contract = w3.eth.contract(address=metadata_address, abi=metadata_abi, ContractFactoryClass=ConciseContract)

num_of_cards = contract.getNumberOfCards()
print("Number of cards: {}".format(num_of_cards))

replication_url = "http://ipfs.decenter.com/ipfs/"

for i in range(0, num_of_cards):
    res = contract.properties(i)
    
    ipfsHash = res[2]
    cardData = api.get_json(ipfsHash)

    # replicate image from json
    url =  replication_url + cardData['image']
    req = requests.get(url)
    print(url)

    # replicate json itself
    url = replication_url + ipfsHash
    req = requests.get(url)
    print(url)

    print("Replication in progress {}/{}".format(i+1, num_of_cards))
    sleep(0.5)

print("--------------------------------------")
print("Finished replication")