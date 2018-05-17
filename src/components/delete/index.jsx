import { message, Modal } from 'antd'

export default (keys, http, callback) => {
  if(keys.length === 0) {
    message.warning('请先选中需要删除的行！');
    return 
  }
  let id = keys.reduce((total, num) => total+','+num)
  Modal.confirm({
    title: '提示?',
    content: `您确定要删除选中的${keys.length}条数据吗？`,
    onOk: async() => {
      await http(id)
      message.success('删除成功！')
      callback()
    }
  });
}
