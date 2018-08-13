import os
import json


"""
==============
This script is going to fill config.json file with addresses and abi's from last build. 
This means whenever you do "truffle migrate", you need to run this script and update config file.
==============

==============
To run: $ python update_config.py
==============

"""
directory = "../solidity/build/contracts"
dict = {}
abi = {}
network_id = 4

for contract in os.listdir(directory):
    if contract.endswith(".json"):
        with open(os.path.join(directory,contract)) as json_contract:
            dictdump = json.loads(json_contract.read())
            if(dictdump.get("networks") == {}):
                continue

            if contract == "Booster.json":
                contract = "boosterContract"
            if contract == "CryptageCards.json":
                contract = "cardContract"
            if contract == "CardMetadata.json":
                contract = "metadataContract"

            if(dictdump["abi"] != None):
                abi[contract] = dictdump["abi"]
            if(dictdump["networks"].get(str(network_id)) != None ):
                #print (contract,dictdump["networks"]["4447"]["address"])
                dict[contract] = dictdump["networks"][str(network_id)]["address"]
            else:
                print("{} doesn't have address on network id: {}".format(contract, network_id))



for key in dict:
    print(key, dict[key])

with open("../src/constants/config.json.dist","r+") as jsonFile:
    data = json.load(jsonFile)

    for key in data:
        if (type(data[key]) is not dict) or (data[key].get("abi") == None) or (dict.get(key) == None):
            continue
        data[key]["abi"] = abi[key]
        data[key]["address"] = dict[key]

    data["network"] = network_id

    jsonFile.seek(0)
    json.dump(data, jsonFile)
    jsonFile.truncate()
