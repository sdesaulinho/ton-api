module.exports = class User {
    constructor(nome, idade, email, cpf, password, login) {
        this.nome = nome;
        this.idade = idade;
        this.email = email;
        this.cpf = cpf;
        this.password = password;
        this.login = login;
        this.dataCadastro = new Date();
    }
}