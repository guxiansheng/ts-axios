const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const WebpackConfig = require('./webpack.config');

const app = express();
const router = express.Router();
const compiler = webpack(WebpackConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}));

app.use(webpackHotMiddleware(compiler));

app.use(express.static(__dirname));

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
  extended: true
}));

registerBaseRouter();

registerErrorRouter();

registerSimpleRouter();

registerExtendRouter();

registerInterceptorRouter();

function registerBaseRouter() {
  router.get('/base/get', function (req, res) {
    res.json(req.query);
  })
  router.post('/base/post', function (req, res) {
    res.json(req.body);
  })
  router.post('/base/buffer', function (req, res) {
    let msg = [];
    req.on('data', (chunk) => {
      if (chunk) {
        msg.push(chunk)
      }
    })
    req.on('end', () => {
      let buf = Buffer.concat(msg);
      res.json(buf.toJSON());
    })
  })
}

function registerErrorRouter() {
  router.get('/error/get', function(req, res) {
    if (Math.random() > 0.5) {
      res.json({
        msg: 'hello world'
      });
    } else {
      res.status(500);
      res.end();
    }
  })

  router.get('/error/get', function(req, res) {
    setTimeout(() => {
      res.json({
        msg: 'hello timeout'
      })
    }, 3000);
  })
}

function registerSimpleRouter() {
  router.get('/simple/get', function (req, res) {
    res.json({
      msg: `hello world`
    })
  })
}

function registerExtendRouter() {
  router.get('/extend/get', function (req, res) {
    res.json({
      msg: `hello world`
    })
  })

  router.options('/extend/options', function (req, res) {
    res.end();
  })

  router.delete('/extend/delete', function (req, res) {
    res.end();
  })

  router.head('/extend/head', function (req, res) {
    res.end();
  })

  router.post('/extend/post', function (req, res) {
    res.json(req.body);
  })

  router.put('/extend/put', function (req, res) {
    res.json(req.body);
  })

  router.patch('/extend/patch', function (req, res) {
    res.json(req.body);
  })

  router.get('/extend/user', function (req, res) {
    res.json({
      code: 0,
      message: 'ok',
      result: {
        name: 'hanlin',
        age: 28
      }
    })
  })
}

function registerInterceptorRouter() {
  router.get('/interceptor/get', function(req, res) {
    res.send('hello')
  })
}

app.use(router);

const port = process.env.PROT || 8080;

module.exports = app.listen(port, () => {
  console.log(`服务启动在 http://localhost:${port}端口`);
})
