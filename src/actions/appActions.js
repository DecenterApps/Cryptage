import { CHANGE_GAMEPLAY_VIEW } from './actionTypes';

/**
 * Dispatches action to change the view of central gameplay view
 *
 * @param {String} payload - view name
 *
 * @return {Function}
 */
export const changeGameplayView = payload => (dispatch) => { dispatch({ type: CHANGE_GAMEPLAY_VIEW, payload }); };
