require('dotenv').config({
  path: require('path').join(__dirname, '../.env.test')
})

const chai = require("chai")
const sinonChai = require("sinon-chai")
chai.use(sinonChai)

global.expect = chai.expect
global.nock = require('nock')
global.sinon = require('sinon')

global.mockRequest = (mountPath) => {
  const req = {}
  req.baseUrl = mountPath
  req.path = '/'
  req.session = {}
  req.hypermediaBase = 'https://test.host'
  return req
}
global.mockResponse = () => {
  const res = {}
  res.status = sinon.stub().returns(res)
  res.json = sinon.stub()
  res.end = sinon.stub()
  return res
}