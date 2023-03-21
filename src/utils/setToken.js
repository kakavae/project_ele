// 导出一个函数，调用这个函数会将传入的token设置为localStorage中的参数
const setToken = (token) => {
  localStorage.setItem('Authorization', token)
}

// 导出一个函数，调用以后就读取localStorage中的token
const getToken = () => {
  return localStorage.getItem('Authorization')
}

const clearToken = () => {
  localStorage.removeItem('Authorization')
}

// 这个表示输出了一组变量
export { setToken, getToken, clearToken }
