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

env_path = Path('../solidity') / '.env'
load_dotenv(dotenv_path=env_path)

api = ipfsapi.connect('127.0.0.1', 5001)

with open("../src/constants/cards.json","r+") as jsonFile:
    data = json.load(jsonFile)

with open("../src/constants/config.json","r+") as jsonFile:
    config = json.load(jsonFile)

network_id = config["network"]
metadata_address = Web3.toChecksumAddress(config["metadataContract"]["address"])
metadata_abi = config["metadataContract"]["abi"]

cards = data["cards"]
num_of_cards = len(cards.keys())

w3 = Web3(HTTPProvider('https://rinkeby.decenter.com'))
w3.middleware_stack.inject(geth_poa_middleware, layer=0) # needed for Rinkeby network
contract = w3.eth.contract(address=metadata_address, abi=metadata_abi, ContractFactoryClass=ConciseContract)

# w3 = Web3(TestRPCProvider())

my_account = w3.eth.account.privateKeyToAccount(os.getenv('ETHEREUM_ACCOUNT_MNEMONIC'))

w3.eth.defaultAccount = my_account.address

nonce = w3.eth.getTransactionCount(my_account.address)

for i in range(0,num_of_cards):
    card_id = str(i)
    
    card = {}
    card['name'] = cards[card_id]["1"]["title"]
    card['description'] = cards[card_id]["1"]["flavorText"]
    card['attributes'] = {"rarity": {"keyLan":"Rarity", "value":cards[card_id]["1"]["rarityScore"]}}

    res = api.add("../src/constants/cardImages/"+cards[card_id]["1"]["image"])

    card['image'] = res['Hash']
    
    artistsAddr = ['0xae0aFD6a330D6CA572441f29F6ef0dc4372d8ee4', '0x54b44C6B18fc0b4A1010B21d524c338D1f8065F6', '0xd07C572DF544C2C6BD31f3ea413BbEF839B00eB1']
    
    ipfsHash = api.add_json(card)
    rarity = int(cards[card_id]["1"]["rarityScore"])
    artist = random.choice(artistsAddr)

    w3.middleware_stack.add(construct_sign_and_send_raw_middleware(my_account))

    res = contract.addCardMetadata(rarity, ipfsHash, artist, transact={'from': my_account.address, 'nonce': nonce+i})

    print("Added {} {}/{} -> 0x{}".format(card['name'], i+1, num_of_cards, res.hex()))

    sleep(1)

print("---------------------------------------------------------------------------------------------")
print("DONE")
print("From account: {}".format(my_account.address))
print("Contract: {}".format(metadata_address))