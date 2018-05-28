package main

import (
  "github.com/ethereum/go-ethereum/crypto"
  "encoding/binary"
  "encoding/hex"
)

type Signature struct {
  Raw        []byte   `json:"raw"`
  String     string   `json:"string"`
  Hash       []byte   `json:"hash"`
  HashString string   `json:"hash_string"`
  R          [32]byte `json:"r"`
  S          [32]byte `json:"s"`
  V          uint8    `json:"v"`
}

func sign(cryptage Cryptage, hexMoves []byte, address string) (*Signature, error) {
  privateKey, err := crypto.LoadECDSA("/root/.ethereum/key")
  if err != nil {
    return nil, err
  }

  byteAddress, err := hex.DecodeString(address[2:])
  if err != nil {
    return nil, err
  }

  byteExperience := make([]byte, 32)
  binary.LittleEndian.PutUint64(byteExperience, uint64(cryptage.State.Experience))

  sha := crypto.Keccak256(hexMoves, byteExperience, make([]byte, 12), byteAddress)
  sig, err := crypto.Sign(sha, privateKey)
  if err != nil {
    return nil, err
  }

  var r, s [32]byte

  copy(r[:], sig[:32])
  copy(s[:], sig[32:64])

  return &Signature{
    sig,
    hex.EncodeToString(sig),
    sha,
    hex.EncodeToString(sha),
    r,
    s,
    uint8(int(sig[64])) + 27,
  }, nil
}
