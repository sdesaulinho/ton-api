
const { handler } = require('../../handler/increment');
const { increment } = require('../../service/count-visit');
const LambdaTester = require('lambda-tester');

jest.mock('../../service/count-visit')
jest.mock('countapi-js')
jest.mock('../../service/user-service.js')
const goodEvent = {
  resource: '/increment-visits',
  path: '/increment-visits',
  httpMethod: 'POST',
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  pathParameters: null,
  stageVariables: null,
  body: null,
  isBase64Encoded: false
};

describe.only('Test case for invoke lambda', () => {
  it('Invoke lambda success', async () => {
    increment.mockReturnValueOnce({
      promise: () => Promise.resolve(),
    })
    await LambdaTester(handler)
    .event(goodEvent)
    .expectResult();
  })
})