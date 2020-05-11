/* eslint-disable no-param-reassign */
import { Effect, ImmerReducer, Subscription } from 'umi';
import { ENUMS } from '@/utils';

export interface HomeModelState {
  gameStatus: ENUMS.GAME_STATUS;
}

export interface HomeModelType {
  state: HomeModelState;
  effects: {
    changeGameStatus: Effect;
  };
  reducers: {
    changeGameStatusR: ImmerReducer<HomeModelState>;
  };
  subscriptions: { setup?: Subscription };
}

const HomeModel: HomeModelType = {
  state: {
    gameStatus: ENUMS.GAME_STATUS.UPCOMING,
  },
  effects: {
    *changeGameStatus({ payload }, { put }) {
      try {
        const { gameStatus } = payload;
        yield put({ type: 'changeGameStatusR', payload: gameStatus });
      } catch (error) {
        // console.log('error', error);
      }
    },
  },
  reducers: {
    changeGameStatusR(state, action) {
      state.gameStatus = action.payload;
    },
  },
  subscriptions: {},
};

export default HomeModel;
