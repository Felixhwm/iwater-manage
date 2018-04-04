import fetch from './request'

//登录
export const login = params => fetch('/user/login', params, 'POST');
//获取个人菜单
export const getMenu = params => fetch('/web', params, 'POST');
//获取所有站点
export const getStationList = params => fetch('/web', params, 'POST');
//获取所有站点设备状态
export const getStationStatu = params => fetch('/table/deviceState/selectByIds', params, 'GET');
//获取工单列表
export const getWorkOrderList = params => fetch('/table/workorder/selectByPrimaryKey', params, 'GET')
