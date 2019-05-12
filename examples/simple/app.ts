import axios from '../../src/index';

axios({
    methed: 'get',
    url: '/simple/get',
    params: {
        a: 1,
        b: 2
    }
})