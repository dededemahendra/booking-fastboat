import axios from 'axios'

axios.interceptors.response.use(res=> {
  return res.data
}, error=> {
  const err= {
    ...error.data
  }

  return Promise.reject(err)
})

export default axios