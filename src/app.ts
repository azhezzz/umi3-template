// @ts-nocheck
import { RequestConfig, request as umiRequest } from 'umi';
import { ResponseError } from 'umi-request';

/*  初始化状态  */
export async function getInitialState() {
  const data = await umiRequest('http://localhost:4000/top/mv?limit=10');
  return data;
}

/*  请求  */
interface ErrorInfoStructure {
  success: boolean; // if request is success
  data?: any; // response data
  errorCode?: string; // code for errorType
  errorMessage?: string; // message display to user
  showType?: number; // error display type： 0 silent; 1 message.warn; 2 message.error; 4 notification; 9 page
  traceId?: string; // Convenient for back-end Troubleshooting: unique request ID
  host?: string; // onvenient for backend Troubleshooting: host of current access server
}
interface RequestError extends Error {
  data?: any; // 这里是后端返回的原始数据
  info?: ErrorInfoStructure;
}

export const request: RequestConfig = {
  timeout: 10 * 1000,
  errorConfig: {
    adaptor: resData => ({
      ...resData,
      success: resData.status === 0 || resData.code === 200,
      errorMessage: resData.message,
    }),
  },
  middlewares: [],
  requestInterceptors: [],
  responseInterceptors: [
    async response => {
      const data = await response.json();
      console.log(data);
      return data;
    },
  ],
  // errorHandler,
};
// 自定义错误处理。如果使用的话，不会走默认处理
const errorHandler = (error: RequestError | ResponseError) => {
  // 是否是因为 success 为 false 抛出的错误
  if (error.name === 'BizError') {
    const err1 = error as RequestError;
    console.log(err1.message);
  } else {
    const err2 = error as ResponseError;
    if (err2.response) {
      // 请求已发送但服务端返回状态码非 2xx 的响应
      console.log(err2.response.status);
      console.log(err2.response.headers);
      console.log(err2.data);
      console.log(err2.request);
    } else {
      // 请求初始化时出错或者没有响应返回的异常
      console.log(err2.message);
    }
  }
  console.log(JSON.parse(JSON.stringify(error)));
  throw error; // 如果throw. 错误将继续抛出.
  // 如果return, 则将值作为返回. 'return;' 相当于return undefined, 在处理结果时判断response是否有值即可.
  // return { some: 'data' };
};
