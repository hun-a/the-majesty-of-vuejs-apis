const AWSXRay = require('aws-xray-sdk');

const captureFunc = (f, req, res, next) => AWSXRay.captureFunc('func', subsegment => f(req, res, next));

const captureAsyncFunc = (f, req, res, next) => new Promise(resolve => {
  AWSXRay.captureAsyncFunc('asyncFunc', subsegment => {
    f(req, res, next)
      .then(result => {
        subsegment.close();
        return result;
      })
      .then(resolve)
      .catch(next)
  })
});

const wrapAsync = fn => (req, res, next) =>
  fn instanceof Promise ?
    captureAsyncFunc(fn, req, res, next).catch(next) :
    captureFunc(fn, req, res, next);

module.exports = {
  wrapAsync
};