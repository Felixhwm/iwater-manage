import fetch from './request'

//公共
export const common = params => fetch('/web', params, 'POST')
//登录
export const login = params => fetch('/user/login', params, 'POST')
//获取个人菜单
export const getMenu = params => fetch('/monitor/getMenu', params, 'POST')
//获取所有站点
//export const getStationList = params => fetch('/web', params, 'POST')
//获取所有站点设备状态
export const getStationStatu = params => fetch('/table/deviceState/selectByIds', params, 'GET')
//获取工单列表
export const getWorkOrderList = params => fetch('/table/workorder/selectByPrimaryKey', params, 'GET')
//获取区域菜单
//export const getAreaList = params => fetch('/web', params, 'POST');
//获取知识库列表
export const getRepositoryList = params => fetch('/knowledge/list', params, 'POST')
//获取知识库类型列表
export const getRepositoryTypeList = params => fetch('/knowledge/type/list', params, 'POST')
//提问
export const addQuestion = params=> fetch('/chat/addQuestion', params, 'POST')
//获取提问列表
export const getQuestionList = params => fetch('/chat/getQuestionList', params, 'POST')
//获取对话详情
export const getQuestionDetail = params => fetch('/chat/getQuestionDetail', params, 'POST')

/***************************管理平台**************************/
//获取职位列表
export const getRoleList = params => fetch('/table/userrole/selectByPrimaryKey', params, 'GET')
//删除职位
export const deleteRole = params => fetch('/web', { tradeCode: 'userrole.deleteByPrimaryKey', fRoleid: params }, 'POST')      
//获取人员列表
export const getUserList = params => fetch('/table/user/selectByPrimaryKey', params, 'GET')
//删除人员
export const deleteUser = params => fetch('/web', { tradeCode: 'user.deleteByPrimaryKey', fPid: params }, 'POST')
//人员模糊搜索
export const searchUser = params => fetch('/manage/searchUser', params, 'POST' )
//获取行政区域列表
export const getAreaList = params => fetch('/table/area/selectByPrimaryKey', params, 'GET')
//删除行政区域
export const deleteArea = params => fetch('/web', { tradeCode: 'area.deleteByPrimaryKey', id: params }, 'POST')
//获取机构列表
export const getBranchList = params => fetch('/table/branch/selectByPrimaryKey', params, 'GET')
//删除机构
export const deleteBranch = params => fetch('/web', { tradeCode: 'branch.deleteByPrimaryKey', id: params }, 'POST')
//获取站点列表
export const getStationList = params => fetch('/table/station/selectByPrimaryKey', params, 'GET')
//删除站点
export const deleteStation = params => fetch('/web', { tradeCode: 'station.deleteByPrimaryKey', fPid: params }, 'POST')