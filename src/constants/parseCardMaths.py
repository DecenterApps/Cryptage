#!/usr/local/bin/python
# coding: utf-8
import sys
import csv
import json
import copy
import re

fileName = 'Special mechanics - Cards maths.csv'
if len(sys.argv) > 1:
    fileName = sys.argv[1]

def parseInt(i):
	try:
		return int(i)
	except:
		return i

def parseParam(param):
	param = param.split('(')[1]
	param = param.replace(',', '').replace(')', '').strip()
	return param

def parseParams(params):
	params = params.split(',')
	params = map(parseParam, params)
	params = map(parseInt, params)
	return params

def parseMech(input):
	cardMech = []
	for mech in input.split('\n'):
		mech = mech.replace(' ', '')
		if '[' not in mech:
			name = mech.replace(',', '')
			cardMech.append({"name": name})
		else:
			parts = re.findall(r'[^\[\]]+', mech)
			name = parts[0]
			params = parts[1]
			if name == 'projectGlobalStatCardNum':
				params = params.split('((')
				param0 = parseParam(params[0])
				param1 = params[1].split(',(')
				param1 = map(parseParams, param1)
				params = [param0, param1]
			else:
				params = parseParams(params) 
			cardMech.append({"name": name, "params": params})
	# print(cardMech)
	return cardMech

cards = {}

with open(fileName, 'r') as file: 
    lines = csv.reader(file)
    card = {}
    for parts in lines:
        if not parts[1].isdigit():
            continue
        if parts[0].isdigit():
            card = {}
            card['ID'] = parts[0]
            card['title'] = parts[2]
            card['image'] = parts[2].strip().lower().replace(' ', '-').replace('Đ', 'd') + '.jpg'
            card['type'] = parts[3].replace('Mining Container', 'Container')
            level = int(parts[6])
            card['level'] = level

            if parts[7] != '-':
            	card['tags'] = map(lambda tag: tag.strip(), parts[7].split(','))
            else:
            	card['tags'] = []

            if parts[8] != '-':
            	card['acceptedTags'] = map(lambda tag: tag.strip(), parts[8].split(','))
            else:
            	card['acceptedTags'] = []
            
            card['cost'] = {}
            if parts[5] != '-':
                card['cost']['level'] = int(parts[5])
            else:
                card['cost']['level'] = 0

            if parts[9] != '-':
                card['cost']['funds'] = int(parts[9])
            else:
                card['cost']['funds'] = 0

            if parts[10] != '-':
                card['cost']['space'] = int(parts[10])
            else:
                card['cost']['space'] = 0

            if parts[11] != '-':
                card['cost']['containerSpace'] = int(parts[11])
            else:
                card['cost']['containerSpace'] = 0

            if parts[12] != '-':
                card['cost']['power'] = int(parts[12])
            else:
                card['cost']['power'] = 0

            if parts[13] != '-':
                card['cost']['development'] = int(parts[13])
            else:
                card['cost']['development'] = 0

            if parts[14] != '-':
                card['cost']['time'] = int(parts[14])
            else:
                card['cost']['time'] = 0


            gains = {}
            if parts[16] != '-':
                gains['funds'] = int(parts[16])
            else:
                gains['funds'] = 0

            if parts[17] != '-':
                gains['space'] = int(parts[17])
            else:
                gains['space'] = 0

            if parts[18] != '-':
                gains['containerSpace'] = int(parts[18])
            else:
                gains['containerSpace'] = 0

            if parts[19] != '-':
                gains['power'] = int(parts[19])
            else:
                gains['power'] = 0

            if parts[20] != '-':
                gains['development'] = int(parts[20])
            else:
                gains['development'] = 0

            if parts[22] != '-':
                gains['fundsPerBlock'] = int(parts[22])
            else:
                gains['fundsPerBlock'] = 0

            if parts[23] != '-':
                gains['experience'] = int(parts[23])
            else:
                gains['experience'] = 0

            if card['type'].lower() == 'location' or card['type'].lower() == 'container':
                card['values'] = gains
            else:
                card['bonus'] = gains

            # card['starting'] = parts[24] == 'TRUE'
            card['rarityScore'] = parts[25]

            if parts[26] != '-':
            	card['mechanics'] = parseMech(parts[26])

            card['mechanicsText'] = parts[29]
            card['flavorText'] = parts[30]

            cards[card['ID']] = {}
            cards[card['ID']][level] = card

        else:
            card = copy.deepcopy(card)
            
            level = int(parts[6])
            card['level'] = level

            card['cost'] = {}
            if parts[5] != '-':
                card['cost']['level'] = int(parts[5])
            else:
                continue
                card['cost']['level'] = 0

            if parts[9] != '-':
                card['cost']['funds'] = int(parts[9])
            else:
                card['cost']['funds'] = 0

            if parts[10] != '-':
                card['cost']['space'] = int(parts[10])
            else:
                card['cost']['space'] = 0

            if parts[11] != '-':
                card['cost']['containerSpace'] = int(parts[11])
            else:
                card['cost']['containerSpace'] = 0

            if parts[12] != '-':
                card['cost']['power'] = int(parts[12])
            else:
                card['cost']['power'] = 0

            if parts[13] != '-':
                card['cost']['development'] = int(parts[13])
            else:
                card['cost']['development'] = 0

            if parts[14] != '-':
                card['cost']['time'] = int(parts[14])
            else:
                card['cost']['time'] = 0


            gains = {}
            if parts[16] != '-':
                gains['funds'] = int(parts[16])
            else:
                gains['funds'] = 0

            if parts[17] != '-':
                gains['space'] = int(parts[17])
            else:
                gains['space'] = 0

            if parts[18] != '-':
                gains['containerSpace'] = int(parts[18])
            else:
                gains['containerSpace'] = 0

            if parts[19] != '-':
                gains['power'] = int(parts[19])
            else:
                gains['power'] = 0

            if parts[20] != '-':
                gains['development'] = int(parts[20])
            else:
                gains['development'] = 0

            if parts[22] != '-':
                gains['fundsPerBlock'] = int(parts[22])
            else:
                gains['fundsPerBlock'] = 0

            if parts[23] != '-':
                gains['experience'] = int(parts[23])
            else:
                gains['experience'] = 0

            if card['type'].lower() == 'location' or card['type'].lower() == 'container':
                card['values'] = gains
            else:
                card['bonus'] = gains

            if parts[26] != '-':
            	card['mechanics'] = parseMech(parts[26])
                
            if parts[27] != '':
                card['mechanicsText'] = parts[27]
            
            cards[card['ID']][level] = card

with open('cards.json', 'w') as outfile:
    json.dump(cards, outfile, sort_keys=True)