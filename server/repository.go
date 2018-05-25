package main

import "encoding/json"

type Cryptage struct {
  Exists bool
  Address string
  Name string
  State *State
}

func updateCryptage(cryptage Cryptage) error {
  stateJson, err := json.Marshal(cryptage.State)
  if err != nil {
    return err
  }

  return update(CryptageDocument{
    Exists: cryptage.Exists,
    Address: cryptage.Address,
    Name: cryptage.Name,
    StateBuffer: stateJson,
  })
}

func GetCryptage(address string) (*Cryptage, error) {
  cryptageDocument, err := get(address)
  if err != nil {
    return nil, err
  }

  if cryptageDocument.Exists == false {
    state, err := NewState()
    if err != nil {
      return nil, err
    }

    return &Cryptage{
      Exists: cryptageDocument.Exists,
      Address: address,
      Name: cryptageDocument.Name,
      State: state,
    }, nil
  }

  var state State
  err = json.Unmarshal(cryptageDocument.StateBuffer, &state)
  if err != nil {
    return nil, err
  }

  return &Cryptage{
    Exists: cryptageDocument.Exists,
    Address: address,
    Name: cryptageDocument.Name,
    State: &state,
  }, nil
}
