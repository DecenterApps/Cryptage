import cardConfig from '../constants/cards.json';

export const DESKTOP_WIDTH = 1920;

export const acceptedAssetDropIds =
  Object.keys(cardConfig.cards).filter(key =>
    cardConfig.cards[key]['1'].type !== 'Location' &&
    cardConfig.cards[key]['1'].type !== 'Mining' &&
    cardConfig.cards[key]['1'].type !== 'Project');

export const acceptedAssetLevelUpIds =
  Object.keys(cardConfig.cards).filter(key =>
    cardConfig.cards[key]['1'].type !== 'Location' &&
    cardConfig.cards[key]['1'].type !== 'Mining' &&
    cardConfig.cards[key]['1'].type !== 'Misc' &&
    cardConfig.cards[key]['1'].type !== 'Container' &&
    cardConfig.cards[key]['1'].type !== 'Project');

const minerIds = Object.keys(cardConfig.cards).filter(key => cardConfig.cards[key]['1'].type === 'Mining');
export const fpbCardIds = [...minerIds, '18', '22', '23', '26', '43'];
export const timeReduceIds = ['17', '40', '31'];

export const acceptedLocationDropIds = Object.keys(cardConfig.cards).filter(key => cardConfig.cards[key]['1'].type === 'Location'); // eslint-disable-line

export const acceptedProjectDropIds = Object.keys(cardConfig.cards).filter(key => cardConfig.cards[key]['1'].type === 'Project');  // eslint-disable-line

export const containerIds = Object.keys(cardConfig.cards).filter(key => cardConfig.cards[key]['1'].type === 'Container');  // eslint-disable-line

const LOCATION_ITEM_SLOT = { accepts: [...acceptedAssetDropIds], lastDroppedItem: null, slotType: 'location_slot' };
export const LOCATION_ITEM_DROP_SLOTS = [
  LOCATION_ITEM_SLOT, LOCATION_ITEM_SLOT, LOCATION_ITEM_SLOT, LOCATION_ITEM_SLOT, LOCATION_ITEM_SLOT,
  LOCATION_ITEM_SLOT,
];
export const ADDITIONAL_LOCATION_ITEM_DROP_SLOTS = [LOCATION_ITEM_SLOT];

const LOCATION_SLOT = { accepts: [...acceptedLocationDropIds], lastDroppedItem: null, slotType: 'location' };
export const LOCATION_DROP_SLOTS = [
  LOCATION_SLOT, LOCATION_SLOT, LOCATION_SLOT, LOCATION_SLOT, LOCATION_SLOT, LOCATION_SLOT,
];
export const ADDITIONAL_LOCATION_DROP_SLOTS = [LOCATION_SLOT];

const PROJECT_SLOT = { accepts: [...acceptedProjectDropIds], lastDroppedItem: null, slotType: 'project' };
export const PROJECT_DROP_SLOTS = [
  PROJECT_SLOT, PROJECT_SLOT, PROJECT_SLOT, PROJECT_SLOT, PROJECT_SLOT,
  PROJECT_SLOT, PROJECT_SLOT, PROJECT_SLOT, PROJECT_SLOT, PROJECT_SLOT,
];

export const bonusDevPerLocationCards = ['16', '23', '39'];

// APP
export const LOADING_ENDED = 'loading_ended';
export const GET_ACCOUNT_SUCCESS = 'get_account_success';
export const GET_ACCOUNT_ERROR = 'get_account_error';
export const UPDATE_BLOCK_NUMBER = 'update_block_number';
export const TOGGLE_CARD_DRAG = 'toggle_card_drag';
export const CLEAR_STORE = 'clear_store';

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

// STATE
export const SAVE_STATE_REQUEST = 'save_state_request';
export const SAVE_STATE_SUCCESS = 'save_state_success';
export const SAVE_STATE_ERROR = 'save_state_error';

// GAMEPLAY
export const DROP_LOCATION = 'drop_location';
export const DROP_ASSET = 'drop_asset';
export const DROP_MINER = 'drop_miner';
export const DROP_PROJECT = 'drop_project';
export const SET_ACTIVE_LOCATION = 'set_active_location';
export const CHANGE_PROJECT_STATE = 'change_project_state';
export const LOAD_STATE_FROM_STORAGE = 'load_state_from_storage';
export const CHANGE_GAMEPLAY_VIEW = 'change_gameplay_view';
export const UPDATE_GLOBAL_VALUES = 'update_global_values';
export const LEVEL_UP_CARD = 'level_up_card';
export const ADD_LOCATION_SLOTS = 'add_location_slots';
export const ADD_ASSET_SLOTS = 'add_location_slots';
export const REMOVE_ASSET_SLOTS = 'remove_location_slots';
export const ADD_EXPERIENCE = 'add_experience';
export const SWITCH_IN_GAMEPLAY_VIEW = 'switch_in_gameplay_view';
export const PLAY_TURN = 'play_turn';
export const INCREMENT_TURN = 'increment_turn';
export const REMOVE_CARD = 'remove_card';
export const RETURN_CARDS = 'return_cards';
export const UPDATE_FUNDS_PER_BLOCK = 'update_funds_per_block';
export const UPDATE_LOCATIONS = 'update_locations';
export const ADD_NEW_LEVEL_CARDS = 'add_new_cards';
export const CLEAR_REVEALED_CARDS = 'clear_revealed_cards';
export const CLEAR_TURNS = 'clear_turns';
export const REMOVE_NEW_FROM_CARD = 'remove_new_from_card';
export const CHANGE_LOCATIONS_STATE = 'change_locations_state';
export const UPDATE_PROJECT_EXECUTION_TIME_PERCENT = 'update_project_execution_time_percent';

// GAMEPLAY_VIEWS
export const GP_BUY_BOOSTER = 'buy_booster';
export const GP_LOCATION = 'location';
export const GP_LOCATION_MAIN = 'location_main';
export const GP_LOCATION_CONTAINER = 'location_container';
export const GP_LOCATION_COLLECTION = 'location_collection';
export const GP_NO_LOCATIONS = 'no_locations';
export const GP_NO_NICKNAME = 'no_nickname';
export const GP_LEADERBOARD = 'leaderboard';

export const SUBMIT_NICKNAME_SUCCESS = 'submit_nickname_success';

// MODAL
export const TOGGLE_MODAL = 'toggle_modal';

// LEADERBOARD
export const FETCH_LEADERBOARD_DATA = 'fetch_leaderboard_data';
export const FETCH_LEADERBOARD_DATA_SUCCESS = 'fetch_leaderboard_data_success';
export const FETCH_LEADERBOARD_DATA_ERROR = 'fetch_leaderboard_data_error';

export const TOGGLE_TUTORIAL = 'toggle_tutorial';

export const typeGradients = {
  misc:       ['#3215E6', 'rgba(49, 20, 230, 0)'],
  power:      ['#CE060D', 'rgba(206, 5, 13, 0)'],
  location:   ['#3CC8CC', 'rgba(60, 200, 204, 0)'],
  person:     ['#9F00C7', 'rgba(95, 38, 79, 0)'],
  project:    ['#1E9500', 'rgba(30, 149, 0, 0)'],
  mining:     ['#FF9D14', 'rgba(255, 157, 20, 0)'],
  container:  ['#75341F', 'rgba(117, 52, 30, 0)'],
};

export const rarities = {
  normal: '#9797FB',
  blue: '#0086D1',
  purple: '#9B01C1',
  gold: '#FF9D14',
};
