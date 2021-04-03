const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

const saveUser = (user) => {
    return new Promise((res, rej) => {
        var params = {
            TableName: 'user',
            Item: user
          };
        dynamoDb.put(params, (err, data) => {
            if (err) {
                return rej(err);
            }
            return res(data.Item);
        });
    });
}

const findByCPF = (cpf) => {
    return new Promise((res, rej) => {
        var params = {
            TableName: 'user',
            Key: {
              'cpf': cpf
            },
          };
        dynamoDb.get(params, (err, data) => {
            if (err) {
                return rej(err);
            }
            return res(data.Item);
        });
    });
}

module.exports = {
    saveUser: saveUser,
    findByCPF: findByCPF
};