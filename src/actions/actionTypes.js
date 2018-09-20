import cardConfig from '../constants/cards.json';

export const DESKTOP_WIDTH = 1920;

export const containerIds = Object.keys(cardConfig.cards).filter(key => cardConfig.cards[key]['1'].type === 'Container');  // eslint-disable-line

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
export const GENERATE_NEW_GAMEPLAY = 'generate_new_gameplay';
export const ON_NEW_BLOCK = 'on_new_block';
export const RESTART_PROJECT = 'restart_project';

export const DROP_LOCATION = 'drop_location';
export const DROP_ASSET = 'drop_asset';

export const SET_ACTIVE_LOCATION = 'set_active_location';
export const LOAD_STATE_FROM_STORAGE = 'load_state_from_storage';
export const CHANGE_GAMEPLAY_VIEW = 'change_gameplay_view';
export const SWITCH_IN_GAMEPLAY_VIEW = 'switch_in_gameplay_view';
export const REMOVE_CARD = 'remove_card';
export const ADD_NEW_LEVEL_CARDS = 'add_new_cards';
export const CLEAR_REVEALED_CARDS = 'clear_revealed_cards';
export const CLEAR_TURNS = 'clear_turns';
export const REMOVE_NEW_FROM_CARD = 'remove_new_from_card';

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

// TUTORIALS
export const TOGGLE_TUTORIAL = 'toggle_tutorial';
export const SHOW_TUTORIAL = 'show_tutorial';
export const GET_PAGES_FOR_TUTORIAL = 'get_pages_for_tutorial';
export const CHANGE_PAGE = 'change_page';

export const typeGradients = {
  misc: ['#3215E6', 'rgba(49, 20, 230, 0)'],
  power: ['#CE060D', 'rgba(206, 5, 13, 0)'],
  location: ['#3CC8CC', 'rgba(60, 200, 204, 0)'],
  person: ['#9F00C7', 'rgba(95, 38, 79, 0)'],
  project: ['#1E9500', 'rgba(30, 149, 0, 0)'],
  mining: ['#FF9D14', 'rgba(255, 157, 20, 0)'],
  container: ['#75341F', 'rgba(117, 52, 30, 0)'],
};


// delete
export const rarities = {
  normal: '#9797FB',
  blue: '#0086D1',
  purple: '#9B01C1',
  gold: '#FF9D14',
};
