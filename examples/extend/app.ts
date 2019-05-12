import axios from '../../src/axios'

axios({
  url: '/extend/post',
  methed: 'post',
  data: {
    msg: 'han'
  }
})

axios.request({
  url: '/extend/post',
  methed: 'post',
  data: {
    msg: 'lin'
  }
})

axios.get('/extend/get')

axios.options('/extend/options')

axios.delete('/extend/delete')

axios.head('/extend/head')

axios.post('/extend/post', { msg: 'post' })

axios.put('/extend/put', { msg: 'put' })

axios.patch('/extend/patch', { msg: 'patch' })

axios({
  url: '/extend/post',
  methed: 'post',
  data: {
    msg: 'hi'
  }
})

axios('/extend/post', {
  methed: 'post',
  data: {
    msg: 'hi hanlin'
  }
})

interface ResponseData<T = any> {
  code: number,
  result: T,
  message: string
}

interface User {
  name: string,
  age: number
}

function getUser<T>() {
  return axios<ResponseData<T>>('/extend/user')
    .then(res => res.data)
    .catch(err => console.log(err))
}

async function test() {
  const user = await getUser<User>()
  if (user) {
    console.log(user.result.name)
  }
}

test()