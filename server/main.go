package main

import (
  "log"
  "net/http"
  "encoding/json"
  "io/ioutil"
  "encoding/hex"
)

type Input struct {
  Moves string `json:"moves"`
}

func update(w http.ResponseWriter, r *http.Request) {
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

  sendBlock, moves := decodeMoves(hexBytes)

  print(sendBlock)
  print(moves)
}

func main() {
  log.Println("Server started on: http://localhost:8080")
  http.HandleFunc("/update", update)
  http.ListenAndServe(":8080", nil)
}
