import cardConfig from '../constants/cards.json';

export const CHANGE_GAMEPLAY_VIEW = 'change_gameplay_view';

export const EMPTY_DROP_SLOTS = [
  { accepts: [cardConfig.cardTypes[0], cardConfig.cardTypes[0]], lastDroppedItem: null },
  { accepts: [cardConfig.cardTypes[0], cardConfig.cardTypes[0]], lastDroppedItem: null },
  { accepts: [cardConfig.cardTypes[0], cardConfig.cardTypes[0]], lastDroppedItem: null },
  { accepts: [cardConfig.cardTypes[0], cardConfig.cardTypes[0]], lastDroppedItem: null },
  { accepts: [cardConfig.cardTypes[0], cardConfig.cardTypes[0]], lastDroppedItem: null },
  { accepts: [cardConfig.cardTypes[0], cardConfig.cardTypes[0]], lastDroppedItem: null },
];

// GAMEPLAY_VIEWS
export const GP_BUY_BOOSTER = 'buy_booster';
export const GP_LOCATION = 'location';

// BOOSTER
export const BOOSTERS_REQUEST = 'boosters_request';
export const BOOSTERS_SUCCESS = 'boosters_success';
export const BOOSTERS_ERROR = 'boosters_error';

export const USERS_CARDS_FETCH = 'users_cards_fetch';
export const USERS_CARDS_SUCCESS = 'users_cards_success';
export const USERS_CARDS_ERROR = 'users_cards_error';

export const BUY_BOOSTER_REQUEST = 'buy_booster_request';
export const BUY_BOOSTER_SUCCESS = 'buy_booster_success';
export const BUY_BOOSTER_ERROR = 'buy_booster_error';

export const REVEAL_REQUEST = 'reveal_request';
export const REVEAL_SUCCESS = 'reveal_success';
export const REVEAL_ERROR = 'reveal_error';

// LOCATION
export const ADD_ACTIVE_LOC = 'add_active_loc';
export const SET_ACTIVE_LOCATION = 'set_active_location';

