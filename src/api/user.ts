/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { request } from 'umi';

const baseUrl = 'https://api.es.dota2.esportseyes.com/esportseyes/v1/';
const urlReg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
function concatUrl(url: string) {
  if (urlReg.test(url)) return url;
  return `${baseUrl}${url}`;
}

export default {
  login: (data: any) =>
    request(concatUrl('token/get_manager_token'), { data, method: 'post' }),
  verify: (token: string) =>
    request(concatUrl('token/verify_token'), { params: { token } }),
};
