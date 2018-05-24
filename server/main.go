package main

import (
  "log"
  "net/http"
  "encoding/json"
  "io/ioutil"
  "encoding/hex"
)

type Input struct {
  Address string `json:"address"`
  Name string `json:"name"`
  Moves string `json:"moves"`
}

func save(w http.ResponseWriter, r *http.Request) {
  body, err := ioutil.ReadAll(r.Body)

  if err != nil {
    panic(err)
  }

  var input Input
  err = json.Unmarshal(body, &input)

  if err != nil {
    panic(err)
  }

  hexMoves, err := hex.DecodeString(input.Moves)

  if err != nil {
    panic(err)
  }

  sendBlockNumber, moves := decodeMoves(hexMoves)

  cryptage, err := getCryptage(input.Address)
  err = cryptage.state.update(sendBlockNumber, moves)
  if err != nil {
    panic(err)
  }

  err = verifyCardsOwnership(input.Address, cryptage.state.maximumCardsCount, cryptage.state.level)
  if err != nil {
    panic(err)
  }

  cryptage.name = input.Name

  sig, err := sign(*cryptage, hexMoves, input.Address)
  if err != nil {
    panic(err)
  }

  updateCryptage(*cryptage)

  w.Write(sig)
}

func main() {
  log.Println("Server started on: http://localhost:8080")
  http.HandleFunc("/save", save)
  http.ListenAndServe(":8080", nil)
}

