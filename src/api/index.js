import fetch from './request'

//公共
export const common = params => fetch('/web', params, 'POST')
//登录
export const login = params => fetch('/user/login', params, 'POST')
//获取个人菜单
export const getMenu = params => fetch('/monitor/getMenu', params, 'POST')
//根据区域获取所有站点
export const getStationByArea = params => fetch('/web', { tradeCode: 'station.selectByPrimaryKey', fAreaid: params }, 'POST')
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
export const getUserList = params => fetch('/manage/userList', params, 'POST')
//添加人员
export const addUser = params => fetch('/manage/addUser', params, 'POST')
//添加人员
export const editUser = params => fetch('/manage/updateUser', params, 'POST')
//删除人员
export const deleteUser = params => fetch('/web', { tradeCode: 'user.deleteByPrimaryKey', fPid: params }, 'POST')
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
//获取工艺列表
export const getCraftList = params => fetch('/web', { tradeCode: 'code.selectByPrimaryKey', fCatid: 13 }, 'POST')
//获取通讯设备类型
export const getDeviceTypeList = params => fetch('/web', { tradeCode: 'code.selectByPrimaryKey', fCatid: '04' }, 'POST')
//获取设备列表
export const getDeviceList = params => fetch('/table/device/selectByPrimaryKey', params, 'GET')
//删除设备
export const deleteDevice = params => fetch('/web', { tradeCode: 'device.deleteByPrimaryKey', fDeviceid: params }, 'POST')
//获取故障类型列表
export const getFaultTypeList = params => fetch('/table/faulttype/selectByPrimaryKey', params, 'GET')
//获取故障大类
export const getFaultBig = params => fetch('/web', { tradeCode: 'code.selectByPrimaryKey', fCatid: '07' }, 'POST')
//获取故障小累
export const getFaultSmall = params => fetch('/web', { tradeCode: 'code.selectByPrimaryKey', fCatid: '08' }, 'POST')
//删除故障类型
export const deleteFaultType = params => fetch('/web', { tradeCode: 'faulttype.deleteByPrimaryKey', id: params }, 'POST')
//获取配置列表
export const getSetList = params => fetch('/table/code/selectByPrimaryKey', params, 'GET')
//删除配置
export const deleteSet = params => fetch('/web', { tradeCode: 'code.deleteByPrimaryKey', fIds: params }, 'POST')
//获取阈值列表
export const getThresholdList = params => fetch('/table/faultThreshold/selectByPrimaryKey', params, 'GET')
//删除阈值
export const deleteThreshold = params => fetch('/web', { tradeCode: 'faultThreshold.deleteByPrimaryKey', fThresholdid: params }, 'POST')
//标准水质列表
export const getStandardList = params => fetch('/manage/waterQualityStandardList', params, 'POST' )
//标准水质添加
export const addStandard = params => fetch('/manage/addWaterQualityStandard', params, 'POST')
//标准水质修改
export const updateStandard = params => fetch('/manage/updateWaterQualityStandard', params, 'POST')
//标准水质删除
export const deleteStandard = params => fetch('/manage/deleteWaterQualityStandard', { fId: params }, 'POST')
//出水标准下拉
export const getStandardName = params => fetch('/manage/allWaterQualityStandard', params, 'POST' )
//水质数据录入
export const addWater = params => fetch('/web', { tradeCode: 'waterQuality.insertSelective', ...params }, 'POST')