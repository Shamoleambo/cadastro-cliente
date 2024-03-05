# Cadastro de Cliente

## Descrição:
Essa é uma aplicação que recebe o nome, CPF e data de nascimento de um cliente e realiza seu cadastro.

## Endereço do Deploy:
https://cadastro-cliente-5ypo.onrender.com

## Principais tecnologias usadas:
<ul>
  <li>Typescript</li>
  <li>MongoDB</li>
  <li>Jest</li>
  <li>Express</li>
</ul>

## Bibliotecas auxiliares:
<ul>
  <li>ESLint</li>
  <li>Git Commit Message Linter</li>
  <li>Husky</li>
  <li>Lint Staged</li>
  <li>Sucrase</li>
  <li>Nodemon</li>
</ul>

## Endpoint criados e estrutura do corpo do JSON:
**Registrar um cliente**
```
POST / /api/register
{
  "name": "any_name",
  "cpf": "111.111.111-11",
  "birthDate": "01/01/1994"
}
```
**Obter um cliente pelo cpf**
```
GET / /api/client
{
  "cpf": "111.111.111-11"
}
```
**Obter todos os clientes (com paginação, sendo a query opcional)**
```
GET / /api/clients?p=
```
## Como rodar a aplicação localmente:
```
npm start
```
## Como rodar os testes:
```
npm test
npm run test:coverage
npm run test:unit
npm run test:integration
```







