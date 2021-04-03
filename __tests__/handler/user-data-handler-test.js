
const { handler } = require('../../handler/user-data');
const LambdaTester = require('lambda-tester');
const { find } = require('../../service/user-service');

jest.mock('../../service/user-service.js')
const goodEvent = {
  resource: '/user-data/{cpf}',
  path: '/user-data/12004385740',
  httpMethod: 'GET',
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  pathParameters: { cpf: '12004385740' },
  stageVariables: null,
  body: null,
  isBase64Encoded: false
};

describe.only('Test case for invoke lambda for find user data', () => {
  it('Invoke lambda success', async () => {
    find.mockReturnValueOnce({
      promise: () => Promise.resolve({
        cpf: "12004385740",
        nome: "Saulo ribeiro machado",
        email: "saulo.ribeiro.machado@gmail.com",
        idade: 31,
        login: "saulo"
    }),
    })
    await LambdaTester(handler)
    .event( goodEvent)
    .expectResult();
  })

})