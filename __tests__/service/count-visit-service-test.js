
const { get,increment } = require('../../service/count-visit');
const countapi = require('countapi-js');
const KEY_TON = 'ton.com.br';

jest.mock('countapi-js')

describe.only('Test case for invoke service from count visits site ton.com.br', () => {
  
  it('Invoke service consult count success', async () => {
    countapi.get.mockImplementation(()=> {
      return {value: 1}
    })

    await get()
    expect(countapi.get.mock.calls.length).toBe(1)
    expect({ statusCode: 200, body: 1 })
  })

  it('Invoke service increment count success', async () => {
    countapi.hit.mockReturnValueOnce({
      promise: () => Promise.resolve(),
    })

    await increment()
    expect(countapi.hit.mock.calls.length).toBe(1)
  })

  it('Invoke service consult count value return null', async () => {
    countapi.get.mockImplementation(() => {
      return null;
    });
    
    try {
      await get();
    } catch (e) {
      expect(e.message).toEqual('Error ao tentar consultar a quantidade de visitas.');
    }
  })

  it('Invoke service increment count value return null', async () => {
    countapi.hit.mockImplementation(() => {
       throw new Error(`Não foi possível incrementar o contador de visitas para o site ${KEY_TON}`);
    });
    
    try {
      await increment();
    } catch (e) {
      expect(e.message).toEqual(`Não foi possível incrementar o contador de visitas para o site ${KEY_TON}`);
    }
  })
})