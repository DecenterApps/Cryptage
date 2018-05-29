package main

import (
  "encoding/hex"
  "encoding/binary"

  "github.com/ethereum/go-ethereum/crypto"
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
  //TODO find better way
  byteExperience := make([]byte, 32)
  padding := 0
  experience := cryptage.State.Experience
  for experience > 0 {
    padding++
    experience /= 256
  }

  binary.LittleEndian.PutUint64(byteExperience, uint64(cryptage.State.Experience))
  for i := 31; i > 31-padding; i-- {
    byteExperience[i] = byteExperience[i+padding-32]
  }

  for i := 31-padding; i >=0; i-- {
    byteExperience[i] = 0
  }

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
