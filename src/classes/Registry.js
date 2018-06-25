
const cardTypes = new Map();
let defaultCardType = class {};

export function registerCardTypeConstructor(name, constructor) {
  cardTypes.set(name, constructor);
}

export function setDefaultCardType(type) {
  defaultCardType = type;
}

export function getCardTypeConstructor(type) {
  if (cardTypes.has(type)) {
    return cardTypes.get(type);
  }
  return defaultCardType;
}
