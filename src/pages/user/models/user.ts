/* eslint-disable no-param-reassign */
import { Effect, ImmerReducer, Subscription, history } from 'umi';
import { UserAPI } from '@/api';
import { CONSTANTS } from '@/utils';

export interface UserModelState {
  name: string;
}

export interface UserModelType {
  state: UserModelState;
  effects: {
    login: Effect;
  };
  reducers: {
    save: ImmerReducer<UserModelState>;
  };
  subscriptions: { setup?: Subscription };
}

const UserModel: UserModelType = {
  state: {
    name: '',
  },
  effects: {
    *login({ payload }, { call, _put }) {
      try {
        const { loginForm, refreshInitState } = payload;
        const { token } = yield call(UserAPI.login, loginForm);
        // eslint-disable-next-line no-unused-expressions
        globalThis?.localStorage.setItem(CONSTANTS.STORAGE_KEY.TOKEN, token);
        yield call(refreshInitState);
        history.push('/');
      } catch (error) {
        // console.log('error', error);
      }
    },
  },
  reducers: {
    // 启用 immer 之后
    save(state, action) {
      state.name = action.payload;
    },
  },
  subscriptions: {},
};

export default UserModel;
