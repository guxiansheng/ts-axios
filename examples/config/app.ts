import axios from '../../src/index';
import qs from 'qs';
import { AxiosTransformer } from '../../src/types/index';

axios.defaults.headers.common['test2'] = 123;

// axios({
//     url: '/config/post',
//     methed: 'post',
//     data: qs.stringify({
//         a: 1
//     }),
//     headers: {
//         test: 321
//     }
// }).then((res) => {
//     console.log(res.data)
// })

// axios({
//     transformRequest: [(function(data) {
//         return qs.stringify(data);
//         // return data;
//     }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
//     transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
//         if (typeof data === 'object') {
//             data.b = 2;
//         }
//         return data;
//     }],
//     url: '/config/post',
//     methed: 'post',
//     data: {
//         a: 1
//     }
// }).then((res) => {
//     console.log(res);
// });


const insatnce = axios.create(
    {
        transformRequest: [(function(data) {
            return qs.stringify(data);
            // return data;
        }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
        transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
            if (typeof data === 'object') {
                data.b = 2;
            }
            return data;
        }]
    }
)

insatnce({
    url: '/config/post',
    methed: 'post',
    data: {
        a: 1
    }
}).then((res) => {
    console.log(res.data);
});
