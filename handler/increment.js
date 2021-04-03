'use strict';

const {increment} = require('../service/count-visit');
const ResponseBuilder = require('../util/responseBuilders');

module.exports.handler = async (event, context, callback) => {
  const responseBuilder = new ResponseBuilder({
    headers: { 'Content-Type': 'application/json' },
  });
  try {
    console.info('Invocando lambda para incrimentar a quantidade visitas.')
    await increment();
    callback(null, responseBuilder.ok());
  } catch (error) {
    console.error('Error: ', error);
    callback(null, responseBuilder.badRequest({message: error.message}));
  }
};
