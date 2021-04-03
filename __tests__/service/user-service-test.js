
const User = require('../../domain/user');
const repository = require('../../repository/user-repository');
const {find,create} = require('../../service/user-service');

jest.mock('../../repository/user-repository')

describe.only('Test case for invoke service from users', () => {
  
  it('Invoke save user success', async () => {
    const userMock = new User('Saulo ribeiro machado', 31, 'saulo.ribeiro.machado@gmail.com', '12004385761','123456', 'saulo');
    repository.saveUser.mockReturnValueOnce({
      promise: () => Promise.resolve(),
    })

    repository.findByCPF.mockImplementation(() => {
      return null;
    });

    await create(userMock)
    expect(repository.saveUser.mock.calls.length).toBe(1)
  })

  it('Invoke the save with exist user', async () => {
    const userMock = new User('Saulo ribeiro machado', 31, 'saulo.ribeiro.machado@gmail.com', '12004385761','123456', 'saulo');
    repository.saveUser.mockReturnValueOnce({
      promise: () => Promise.resolve(),
    })

    repository.findByCPF.mockImplementation(() => {
      return userMock;
    });


     try {
      await create(new User('teste', 30, '','12005487895'));
    } catch (e) {
      expect(e.message).toEqual(`Já existe um usuário cadastrado com o CPF informado.`);
    }
  })

  it('Invoke find user success', async () => {
    const userMock = new User('Saulo ribeiro machado', 31, 'saulo.ribeiro.machado@gmail.com', '12004385761','123456', 'saulo');
    repository.findByCPF.mockReturnValueOnce({
      promise: () => Promise.resolve(userMock),
    })

    await find('123014589574');
    expect(userMock);
  })
})