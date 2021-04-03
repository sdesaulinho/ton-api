'use strict'

const countapi = require('countapi-js');

const KEY_TON = 'ton.com.br';

  const get = async () => {
    try {
        console.info('Invocando api de contagem ...');
        const valor = (await countapi.get(KEY_TON, 'visits')).value;
        return {count: valor}
      } catch (error) {
        console.error('Error: ', error);
        throw new Error('Error ao tentar consultar a quantidade de visitas.')
      }
  }

  const increment = async function() {
    try {
        console.info(`Incrementando o valor 1 na contagem de visitas...`);
        await countapi.hit(KEY_TON, 'visits');
      } catch (error) {
        let erroMessage = `Não foi possível incrementar o contador de visitas para o site ${KEY_TON}`;
        console.error(erroMessage);
        throw new Error(erroMessage)
      }
  }

  module.exports = {
    increment: increment,
    get:get
};
