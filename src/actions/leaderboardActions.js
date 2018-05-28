import ethereumService from '../services/ethereumService';
import { calculateLevelData } from '../services/gameMechanicsService';
import { FETCH_LEADERBOARD_DATA, FETCH_LEADERBOARD_DATA_ERROR, FETCH_LEADERBOARD_DATA_SUCCESS } from './actionTypes';

/**
 * Fetches all leaderboard data from the leaderBoard smart contract
 */

export const getLeaderboardData = () => async (dispatch, getState) => {
  const { account } = getState().app;

  dispatch({ type: FETCH_LEADERBOARD_DATA });

  try {
    const leaderboardContract = await ethereumService.getLeaderboardContract(account);
    let data = await leaderboardContract.methods.getLeaderboard().call();

    data = data[0]
      .map((address, index) => {
        const xp = parseInt(data[1][index], 10);
        return {
          nickname: web3.utils.toUtf8(data[2][index]),
          address,
          xp,
          level: calculateLevelData(xp).level,
        };
      })
      .sort((a, b) => b.xp - a.xp);

    dispatch({ type: FETCH_LEADERBOARD_DATA_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: FETCH_LEADERBOARD_DATA_ERROR, payload: 'Could not load data from the smart contract.' });
  }
};
