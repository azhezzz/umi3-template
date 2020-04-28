/* eslint-disable no-param-reassign */
import { Effect, ImmerReducer, Subscription } from 'umi';
import { UserAPI } from '@/api';

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
    *login({ payload }, { call, put }) {
      console.log(payload);
      try {
        const res = yield call(UserAPI.login, payload);
        console.log('res', res);
      } catch (error) {
        console.log(error);
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
