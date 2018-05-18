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
//行政区域模糊搜索
export const searchArea = params => fetch('/manage/searchArea', params, 'POST' )
//删除行政区域
export const deleteArea = params => fetch('/web', { tradeCode: 'area.deleteByPrimaryKey', id: params }, 'POST')
//获取机构列表
export const getBranchList = params => fetch('/table/branch/selectByPrimaryKey', params, 'GET')
//机构模糊搜索
export const searchBranch = params => fetch('/manage/searchBranch', params, 'POST' )
//删除机构
export const deleteBranch = params => fetch('/web', { tradeCode: 'branch.deleteByPrimaryKey', id: params }, 'POST')
//获取站点列表
export const getStationList = params => fetch('/table/station/selectByPrimaryKey', params, 'GET')
//删除站点
export const deleteStation = params => fetch('/web', { tradeCode: 'station.deleteByPrimaryKey', fPid: params }, 'POST')
//获取工艺列表
export const getCraftList = params => fetch('/web', { tradeCode: 'code.selectByPrimaryKey', fCatid: 13 }, 'POST')
//获取通讯设备类型
export const getDeviceTypeList = params => fetch('/web', { tradeCode: 'code.selectByPrimaryKey', fCatid: '04' }, 'POST')
//站点模糊搜索
export const searchStation = params => fetch('/manage/searchStation', params, 'POST' )
//获取设备列表
export const getDeviceList = params => fetch('/table/device/selectByPrimaryKey', params, 'GET')
//设备模糊搜索
export const searchDevice = params => fetch('/manage/searchDevice', params, 'POST' )
//删除设备
export const deleteDevice = params => fetch('/web', { tradeCode: 'device.deleteByPrimaryKey', fDeviceid: params }, 'POST')
//获取故障类型列表
export const getFaultTypeList = params => fetch('/table/faulttype/selectByPrimaryKey', params, 'GET')
//删除故障类型
export const deleteFaultType = params => fetch('/web', { tradeCode: 'faulttype.deleteByPrimaryKey', id: params }, 'POST')
//获取配置列表
export const getSetList = params => fetch('/table/code/selectByPrimaryKey', params, 'GET')
//删除配置
export const deleteSet = params => fetch('/web', { tradeCode: 'code.deleteByPrimaryKey', fId: params }, 'POST')
//获取阈值列表
export const getThresholdList = params => fetch('/table/faultThreshold/selectByPrimaryKey', params, 'GET')
//删除阈值
export const deleteThreshold = params => fetch('/web', { tradeCode: 'faultThreshold.deleteByPrimaryKey', fThresholdid: params }, 'POST')