import cardConfig from '../constants/cards.json';

const acceptedAssetDropIds = Object.keys(cardConfig.cards).filter(key => cardConfig.cards[key].type !== 'Location');
const acceptedLocationDropIds = Object.keys(cardConfig.cards).filter(key => cardConfig.cards[key].type === 'Location');
export const containerIds = Object.keys(cardConfig.cards).filter(key => cardConfig.cards[key].type === 'Container');

export const LOCATION_ITEM_DROP_SLOTS = [
  { accepts: [...acceptedAssetDropIds], lastDroppedItem: null },
  { accepts: [...acceptedAssetDropIds], lastDroppedItem: null },
  { accepts: [...acceptedAssetDropIds], lastDroppedItem: null },
  { accepts: [...acceptedAssetDropIds], lastDroppedItem: null },
  { accepts: [...acceptedAssetDropIds], lastDroppedItem: null },
  { accepts: [...acceptedAssetDropIds], lastDroppedItem: null },
];

export const LOCATION_DROP_SLOTS = [
  { accepts: [...acceptedLocationDropIds], lastDroppedItem: null },
  { accepts: [...acceptedLocationDropIds], lastDroppedItem: null },
  { accepts: [...acceptedLocationDropIds], lastDroppedItem: null },
  { accepts: [...acceptedLocationDropIds], lastDroppedItem: null },
  { accepts: [...acceptedLocationDropIds], lastDroppedItem: null },
  { accepts: [...acceptedLocationDropIds], lastDroppedItem: null },
];

// APP
export const LOADING_ENDED = 'loading_ended';
export const GET_ACCOUNT_SUCCESS = 'get_account_success';
export const GET_ACCOUNT_ERROR = 'get_account_error';
export const UPDATE_BLOCK_NUMBER = 'update_block_number';

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

// GAMEPLAY
export const DROP_LOCATION = 'drop_location';
export const DROP_ASSET = 'drop_asset';
export const SET_ACTIVE_LOCATION = 'set_active_location';
export const LOAD_STATE_FROM_STORAGE = 'load_state_from_storage';
export const CHANGE_GAMEPLAY_VIEW = 'change_gameplay_view';
export const UPDATE_GLOBAL_VALUES = 'update_global_values';
export const LEVEL_UP_CARD = 'level_up_card';

// GAMEPLAY_VIEWS
export const GP_BUY_BOOSTER = 'buy_booster';
export const GP_LOCATION = 'location';
