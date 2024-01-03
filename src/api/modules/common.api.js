/*
 * @Author: 詹真琦(legendryztachi@gmail.com)
 * @Date: 2021-01-26 18:09:35
 * @LastEditors: ztachi(legendryztachi@gmail.com)
 * @LastEditTime: 2024-01-03 21:46:58
 * @FilePath: \code\fulltime\data-broadcast-front-desk\src\api\modules\common.api.js
 * @Description: 通用API
 */
import { region } from '../mock/common';

const APIS = ({
  // service,
  // request,
  // serviceForMock,
  requestForMock,
  mock,
  tools,
}) => ({
  /**
   * @description: 获取所有可用路由
   */
  COMMON_GET_REGION_LIST(params) {
    mock.onAny('/getRegionList').reply((config) => {
      // 您可以这样在拦截请求时获取携带的数据
      // const data = tools.parse(config.data)
      // 模拟正确的返回 并使用 faker 生成假数据
      console.log(config);

      return tools.responseSuccess(region);
      // 模拟失败的返回
      // return tools.responseError({}, '错误信息')
    });
    // // 如果这个接口不需要模拟了，请使用 request 代替 requestForMock
    return requestForMock({
      url: '/getRegionList',
      baseURL: '/api',
      params,
    });
  },
});
export default APIS;
