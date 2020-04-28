/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { request } from 'umi';

export default {
  login: (data: any) =>
    request(
      'https://api.es.dota2.esportseyes.com/esportseyes/v1/token/get_manager_token22',
      { data, method: 'post' },
    ),
};
