'use strict';
const { find } = require("../service/user-service");
const ResponseBuilder = require('../util/responseBuilders');

module.exports.handler = async (event, context, callback) => {
  const responseBuilder = new ResponseBuilder({
    headers: { 'Content-Type': 'application/json' },
  });
  try {
    console.log(`Invocando lambda para consultar informações do usuário.`)
    const userData = await find(event.pathParameters.cpf)
    callback(null, responseBuilder.ok(userData));
  } catch (error) {
    console.log('error: ', error);
    callback(null, responseBuilder.notFound({message: error.message}));
  }
};