package main

import (
  "log"
  "net/http"
  "io/ioutil"
  "encoding/hex"
  "encoding/json"
)

type Input struct {
  Address string `json:"address"`
  Name string `json:"name"`
  Moves string `json:"moves"`
}

type ErrorJsonResponse struct {
  Ok bool `json:"ok"`
  Message string `json:"message"`
}

type JsonResponse struct {
  Ok bool `json:"ok"`
  Signature Signature `json:"signature"`
  Experience uint `json:"experience"`
}

func packErrorJsonResponse(message string) []byte {
  jsonResponse, _ := json.Marshal(ErrorJsonResponse{false, message})
  return jsonResponse
}

func packJsonResponse(signature Signature, experience uint) []byte {
  jsonResponse, _ := json.Marshal(JsonResponse{true, signature, experience})
  return jsonResponse
}

func save(w http.ResponseWriter, r *http.Request) {
  body, err := ioutil.ReadAll(r.Body)
  if err != nil {
    w.Write([]byte(packErrorJsonResponse("Unable to read input")))
  }

  var input Input

  err = json.Unmarshal(body, &input)
  if err != nil {
    w.Write([]byte(packErrorJsonResponse("Unable to decode json")))
    return
  }

  hexMoves, err := hex.DecodeString(input.Moves)
  if err != nil {
    w.Write([]byte(packErrorJsonResponse("Unable to decode moves")))
    return
  }

  sendBlockNumber, moves := DecodeMoves(hexMoves)

  cryptage, err := GetCryptage(input.Address)
  err = cryptage.State.update(sendBlockNumber, moves)
  if err != nil {
    w.Write([]byte(packErrorJsonResponse("State update failed")))
    return
  }

  err = verifyCardsOwnership(input.Address, cryptage.State.MaximumCardsCount, cryptage.State.Level)
  if err != nil {
    w.Write([]byte(packErrorJsonResponse("Card ownership check failed")))
    return
  }

  sig, err := sign(*cryptage, hexMoves, input.Address)
  if err != nil {
    w.Write([]byte(packErrorJsonResponse("Signing response failed")))
    return
  }

  print(hex.EncodeToString(sig.Hash))

  cryptage.Name = input.Name
  updateCryptage(*cryptage)

  w.Write(packJsonResponse(*sig, cryptage.State.Experience))
}

func main() {
  log.Println("Server started on: http://localhost:8080")
  http.HandleFunc("/save", save)
  http.ListenAndServe(":8080", nil)
}

