import {
  TOGGLE_TUTORIAL,
  SHOW_TUTORIAL,
  GET_PAGES_FOR_TUTORIAL,
  CHANGE_PAGE,
} from './actionTypes';
import pagesForLevel from '../constants/tutorialConfig.json';

export const toggleTutorial = () => async (dispatch) => {
  dispatch({ type: TOGGLE_TUTORIAL });
  setTimeout(() => dispatch({ type: SHOW_TUTORIAL }), 400);
};

export const getPagesForTutorial = () => (dispatch, getState) => {
  const { level } = getState().gameplay.stats;
  dispatch({ type: GET_PAGES_FOR_TUTORIAL, payload: pagesForLevel[level] });
  return !!pagesForLevel[level];
};

export const changePage = changeType => (dispatch, getState) => {
  const { currentPage, pages } = getState().tutorials;
  if (currentPage + 1 > pages.length) return;
  let newPage;
  if (changeType === 'next') newPage = currentPage + 1;
  if (changeType === 'back') newPage = currentPage - 1;
  dispatch({ type: CHANGE_PAGE, payload: newPage });
};

export const finishTutorial = () => (dispatch) => {
  dispatch({ type: SHOW_TUTORIAL });
  setTimeout(() => dispatch({ type: TOGGLE_TUTORIAL }), 400);
};
