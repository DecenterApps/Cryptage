package main

import (
  "log"
  "net/http"
  "encoding/json"
  "io/ioutil"
  "encoding/hex"
)

type Input struct {
  Address string `json "address`
  Name string `json name`
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

  hexBytes, err := hex.DecodeString(input.Moves)

  if err != nil {
    panic(err)
  }

  sendBlockNumber, moves := decodeMoves(hexBytes)

  cryptage, err := getCryptage(input.Address)
  cryptage.state.update(sendBlockNumber, moves)
  cryptage.name = input.Name

  updateCryptage(*cryptage)
}

func main() {
  log.Println("Server started on: http://localhost:8080")
  http.HandleFunc("/save", save)
  http.ListenAndServe(":8080", nil)
}
