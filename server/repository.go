package main

type Cryptage struct {
  exists bool
  address string
  name string
  state State
}

func updateCryptage(cryptage Cryptage) error {
  return update(CryptageDocument{
    Exists: cryptage.exists,
    Address: cryptage.address,
    Name: cryptage.name,
    StateBuffer: encode(cryptage.state),
  })
}

func getCryptage(address string) (*Cryptage, error) {
  cryptageDocument, err := get(address)

  if err != nil {
    return nil, err
  }

  return &Cryptage{
    exists: cryptageDocument.Exists,
    address: address,
    name: cryptageDocument.Name,
    state: decode(cryptageDocument.StateBuffer),
  }, nil
}
