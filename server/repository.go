package main

import "encoding/json"

func updateCryptage(cryptage Cryptage) error {
	stateJson, err := json.Marshal(cryptage.State)
	if err != nil {
		return err
	}

	return updateOne(CryptageDocument{
		Address:     cryptage.Address,
		StateBuffer: stateJson,
		Cards:       cryptage.Cards,
		Events:      cryptage.Events,
	})
}

func getCryptage(address string, reset bool, sendBlockNumber uint) (*Cryptage, error) {
	if reset {
		return &Cryptage{
			Address: address,
			State:   NewState(sendBlockNumber),
			Cards:   make([]uint, len(config.Cards)),
			Events:  [][]byte{},
		}, nil
	}

	cryptageDocument, err := findOne(address)
	if err != nil {
		return nil, err
	}

	var state State
	err = json.Unmarshal(cryptageDocument.StateBuffer, &state)
	if err != nil {
		return nil, err
	}

	return &Cryptage{
		Address: address,
		State:   &state,
		Cards:   cryptageDocument.Cards,
		Events:  cryptageDocument.Events,
	}, nil
}
