import fetch from './request'

//公共
export const common = params => fetch('/web', params, 'POST');
//登录
export const login = params => fetch('/user/login', params, 'POST');
//获取个人菜单
export const getMenu = params => fetch('/monitor/getMenu', params, 'POST');
//获取所有站点
export const getStationList = params => fetch('/web', params, 'POST');
//获取所有站点设备状态
export const getStationStatu = params => fetch('/table/deviceState/selectByIds', params, 'GET');
//获取工单列表
export const getWorkOrderList = params => fetch('/table/workorder/selectByPrimaryKey', params, 'GET');
//获取区域菜单
export const getAreaList = params => fetch('/web', params, 'POST');
//获取知识库列表
export const getRepositoryList = params => fetch('/knowledge/list', params, 'POST');
//获取知识库类型列表
export const getRepositoryTypeList = params => fetch('/knowledge/type/list', params, 'POST');
//提问
export const addQuestion = params=> fetch('/chat/addQuestion', params, 'POST');
//获取提问列表
export const getQuestionList = params => fetch('/chat/getQuestionList', params, 'POST');
//获取对话详情
export const getQuestionDetail = params => fetch('/chat/getQuestionDetail', params, 'POST');

/***************************管理平台**************************/
export const getRoleList = params => fetch('/table/userrole/selectByPrimaryKey', params, 'GET')