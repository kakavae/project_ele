// 添加默认的请求头，用于区分游客的身份UUIDTOKEN
// 先去本地存储里面找是否有UUIDTOKEN，如果没有，就生成一个存在本地存储，然后用这个作为请求头字段

// 给游客身份生成唯一的UUID，然后保存在localStorage当中，在请求拦截器当中只需要读取保存在localStorage当中的这个UUIDTOKEN即可
// 导入UUID生成唯一的ID
import { v4 as uuidv4 } from 'uuid'

const getUUID = () => {
  if (!localStorage.getItem('UUIDTOKEN')) {
    localStorage.setItem('UUIDTOKEN', uuidv4())
  }
  return localStorage.getItem('UUIDTOKEN')
}

export default getUUID
