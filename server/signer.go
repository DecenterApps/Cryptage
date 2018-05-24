package main

import (
  "github.com/ethereum/go-ethereum/crypto"
)

func sign(cryptage Cryptage, hexMoves []byte, address string) ([]byte, error) {
  //export filepath to env
  privateKey, err := crypto.LoadECDSA("/root/.ssh/key")
  if err != nil {
    return nil, err
  }

  return crypto.Sign(crypto.Keccak256(append(append(hexMoves, byte(cryptage.state.experience))), []byte(address)), privateKey)
}
