'use strict';

const {get} = require('../service/count-visit');
const ResponseBuilder = require('../util/responseBuilders');

module.exports.handler = async (event, context, callback) => {
  const responseBuilder = new ResponseBuilder({
    headers: { 'Content-Type': 'application/json' },
  });
  try {
    console.log( 'Invocando lambda para consultar a quantidade de visitas')
    const count = await get();
    callback(null, responseBuilder.ok(count));
  } catch (error) {
    console.error('Error: ', error);
    callback(null, responseBuilder.badRequest({message: error.message}));
  }
};

