import {
  TOGGLE_TUTORIAL,
  SHOW_TUTORIAL,
  GET_PAGES_FOR_TUTORIAL,
  CHANGE_PAGE,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  tutorialOpen: false,
  showTutorial: false,
  pages: [],
  currentPage: 0,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_TUTORIAL:
      return { ...state, tutorialOpen: !state.tutorialOpen };

    case SHOW_TUTORIAL:
      return { ...state, showTutorial: !state.showTutorial };

    case GET_PAGES_FOR_TUTORIAL:
      return { ...state, pages: payload };

    case CHANGE_PAGE:
      return { ...state, currentPage: payload };

    default:
      return state;
  }
};