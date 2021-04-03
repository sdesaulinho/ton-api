'use strict';
const { create } = require("../service/user-service");
const ResponseBuilder = require('../util/responseBuilders');

module.exports.handler = async (event, context, callback) => {
  const responseBuilder = new ResponseBuilder({
    headers: { 'Content-Type': 'application/json' },
  });
  try {
    const user =  JSON.parse(event.body);
    console.info(`Invocando lambda para criar usuário. Dados do evento: ${user}`)
    await create(user);
    callback(null, responseBuilder.created());
  } catch (error) {
    console.error('Error: ', error);
    callback(null, responseBuilder.conflict({message: error.message}));
  }
};