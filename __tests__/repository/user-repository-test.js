const AWS = require('aws-sdk');
const repository = require('../../repository/user-repository');
const User = require('../../domain/user');

jest.mock("aws-sdk");

describe.only('Test case for invoke repository from users', () => {
  
  it('Invoke find user dynamo success', async () => {
    AWS.DynamoDB.DocumentClient.prototype.get.mockImplementation((_, cb) => {
      cb(null, {cpf: "12004385740", nome: "Saulo ribeiro machado", email: "saulo.ribeiro.machado@gmail.com",idade: 31});
    });

   await repository.findByCPF('12004585789')
   expect({cpf: "12004385740", nome: "Saulo ribeiro machado", email: "saulo.ribeiro.machado@gmail.com",idade: 31});
  })

  it('Invoke save user dynamo success', async () => {
    AWS.DynamoDB.DocumentClient.prototype.put.mockImplementation((_, cb) => {
      cb(null, {cpf: "12004385740", nome: "Saulo ribeiro machado", email: "saulo.ribeiro.machado@gmail.com",idade: 31});
    });

   await repository.saveUser(new User('Saulo ribeiro machado',31,'saulo.ribeiro.machado@gmail.com', '12004528796'))
   expect({cpf: "12004385740", nome: "Saulo ribeiro machado", email: "saulo.ribeiro.machado@gmail.com",idade: 31});
  })

})