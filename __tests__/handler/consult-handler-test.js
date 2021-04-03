
const { handler } = require('../../handler/consult');
const { get } = require('../../service/count-visit');
const LambdaTester = require('lambda-tester');
const goodEvent = {
  resource: '/consult-visits',
  path: '/consult-visits',
  httpMethod: 'GET',
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  pathParameters: null,
  stageVariables: null,
  body: null,
  isBase64Encoded: false
};

jest.mock('../../service/count-visit')
jest.mock('countapi-js')

describe.only('Test case for invoke lambda', () => {
  it('Invoke lambda success', async () => {
    get.mockReturnValueOnce({
      promise: () => Promise.resolve(),
    })
    await LambdaTester(handler)
    .event(goodEvent)
    .expectResult();
  })
})