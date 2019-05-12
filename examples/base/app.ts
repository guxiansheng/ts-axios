import axios from '../../src/index';

// axios({
//     methed: 'get',
//     url: '/base/get',
//     params: {
//         foo: ['bar', 'baz']
//     }
// })

// axios({
//     methed: 'get',
//     url: '/base/get',
//     params: {
//         foo: {
//             bar: 'baz'
//         }
//     }
// })

// const date = new Date()
// axios({
//     methed: 'get',
//     url: '/base/get',
//     params: {
//         date
//     }
// })

// axios({
//     methed: 'get',
//     url: '/base/get',
//     params: {
//         foo: 'bar',
//         baz: null
//     }
// })

// axios({
//     methed: 'get',
//     url: '/base/get#hashabc',
//     params: {
//         foo: 'bar'
//     }
// })

// axios({
//     methed: 'get',
//     url: '/base/get?foo=abc',
//     params: {
//         bar: 'baz'
//     }
// })

// axios({
//     methed: 'post',
//     url: '/base/post',
//     data: {
//         a: 1,
//         b: 2
//     }
// })

// const arr = new Int32Array([21, 31]);
// axios({
//     methed: 'post',
//     url: '/base/buffer',
//     data: arr
// })

axios({
    methed: 'post',
    url: '/base/post',
    headers: {
        'content-type': 'application/json;charset=utf-8'
    },
    data: {
        a: 6,
        b: 9
    }
}).then((res) => {
    console.log(res)
})

const paramsString = 'q=URLUtils.searchParams&topic=api';
const searchParams = new URLSearchParams(paramsString);

axios({
    methed: 'post',
    url: '/base/post',
    data: searchParams,
    responseType: 'json'
}).then((res) => {
    console.log(res)
})
