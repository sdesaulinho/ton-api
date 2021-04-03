module.exports = function(settings) {
    const response = Object.assign({}, settings);

    const handleResponse = (statusCode, body) => {
      response.statusCode = statusCode;
      if(body){
        response.body = JSON.stringify(body);
      }
      return response;
    };

    const ok = body => {
      return handleResponse(200, body);
    };

    const created = body => {
      return handleResponse(201, body);
    };
    
    const badRequest = body => {
      return handleResponse(400, body);
    };

    const conflict = body => {
      return handleResponse(409, body);
    };

    const notFound = body => {
      return handleResponse(404, body);
    };
  
    this.ok = ok;
    this.badRequest = badRequest;
    this.created = created;
    this.conflict = conflict;
    this.notFound = notFound;
  };