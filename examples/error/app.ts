import axios, { AxiosError } from '../../src/index';

axios({
    methed: 'get',
    url: '/error/get1'
}).then((res) => {
    console.log(res);
}).catch((e) => {
    console.log(e)
});

axios({
    methed: 'get',
    url: '/error/get'
}).then((res) => {
    console.log(res)
}).catch((e) => {
    console.log(e)
});

setTimeout(() => {
    axios({
        methed: 'get',
        url: '/error/get'
    }).then((res) => {
        console.log(res)
    }).catch((e) => {
        console.log(e)
    })
}, 5000);


axios({
    methed: 'get',
    url: '/error/timeout',
    timeout: 2000
}).then((res) => {
    console.log(res);
}).catch((e: AxiosError) => {
    console.log(e.message);
    console.log(e.config);
    console.log(e.code);
    console.log(e.request);
    console.log(e.isAxiosError);
});