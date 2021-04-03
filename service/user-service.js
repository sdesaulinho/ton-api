'use strict'

const { saveUser, findByCPF } = require("../repository/user-repository");
const md5 = require("crypto-js/md5")
const moment = require('moment')

  const create = async (user) => {
    try {
        user.password = md5(user.password).toString();
        user.dataCadastro = moment().format();
        if(await isUserValid(user)){
            return await saveUser(user);
        }
        
        throw new Error('Já existe um usuário cadastrado com o CPF informado.');
        
      } catch (error) {
        console.error('Error: ', error);
        throw new Error(error.message)
      }
  }

  const find = async (cpf) => {
    try {
        const userData = await findByCPF(cpf);
        if(userData){
          delete userData['password'];
          return userData;
        }
        throw new Error('Não existe nenhum registro para o CPF informado.');
      } catch (error) {
        console.error('Error: ', error);
        throw new Error(error.message)
      }
  }

  const isUserValid = async (user) => {
    return await findByCPF(user.cpf) == null;
  }

  module.exports = {
    create: create,
    find: find
};
