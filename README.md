
# KImóveis

Projeto de um serviço de back end responsável por gerenciar uma imobiliária. 




## Stack utilizada

Para o estudo foram escolhidas as tecnologias:

**Back-end:** JavaScript, Express, Node, TypeORM.

**Testes:** Jest.

**Ambiente:** Docker.
## Rodando localmente

Clone o projeto

```bash
  git clone git@github.com:agnes-lica/KImoveis-Typescript.git
```

Entre no diretório do projeto

```bash
  cd KImoveis
```

Instale as dependências

```bash
  yarn install
```

Inicie o servidor

```bash
  docker-compose up --build
```
ou

```bash
  docker compose up --build
```

## Rodando os testes

#### Rodar todos os testes
```bash
 yarn test
```

#### Rodar todos os testes e ter um log ainda mais completo
```bash
 yarn test --all
```

#### Rodar os testes de uma pasta específica
```bash 
 yarn test ./scr/__tests__/integration/<subpasta>
```

#### Rodar os testes de um arquivo específico
```bash 
 yarn test ./scr/__tests__/integration/<subpasta>/<arquivo>
```

#### Rodar um teste específico
```bash
 yarn test -t "/nomeDoTeste"
```

## Documentação da API

#### Endpoints

| Método   | Endpoint       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `POST`      | `/users` | Criação de usuário|
| `GET`      | `/users` | Lista todos os usuários |
| `PATCH`      | `/users/:id` | Atualiza um usuário |
| `DELETE`      | `/users/:id` | Realiza um soft delete no usuário |
| `POST`      | `/login` | Gera o token de autenticação |
| `POST`      | `/categoria` | Criação de categoria |
| `GET`      | `/categoria` | Lista todas as categorias |
| `GET`      | `/categoria/:id/realEstate` | Lista todos imóveis que pertencem a uma categoria |
| `POST`      | `/realEstate` | Criação de um imóvel |
| `GET`      | `/realEstate` | 	Lista todos os imóveis |
| `POST`      | `/schedules` | Agenda uma visita a um imóvel |
| `GET`      | `/schedules/realEstate/:id` | lista todos os agendamentos de um imóvel |

#### Requisito dos Serviços

*POST* - **/users**

* Rota para criação de usuário com os seguintes dados:

    * **id**: Valor SERIAL. Gerado de forma automática pelo typeORM.
    * **name**: string e obrigatório
    * **email**: string, obrigatório e único.
    * **password**:Recebe uma string e armazena uma hash gerada com o bcryptjs
    * **admin**: boolean e false por padrão
    * **createdAt**: Gerado pelo typeORM.
    * **updatedAt**: Gerado pelo typeORM.
    * **deletedAt**: Gerado pelo typeORM.
* A rota de criação deve retorna todos os dados, com exceção da hash de senha.
* Não podem ser cadastrados dois usuário com o mesmo e-mail.

*GET* - **/users**
* A rota retorna todos os dados dos usuários, com exceção da hash de senha.
* A rota pode ser acessada apenas por usuários administradores (admin = true).

*PATCH* - **/users/:id**
* A rota atualizar os dados do usuário.
* Não é possível atualizar os campos id e admin.
* Apenas administradores podem atualizar qualquer usuário, usuários não-administradores podem apenas atualizar seu próprio usuário.

*DELETE* - **/users/:id**
* A rota realizar um soft delete do usuário.
* A rota pode ser acessada apenas por administradores.
* Não é possível realizar um soft delete em um usuário já deletado.

*POST* - **/login**
* Rota de login recebe email e password
* O login valida se o usuário existe e se a senha está correta.
* Não é possível realizar o login de um usuário deletado.

*POST* - **/categories**
* Rota para criação de categorias com os seguintes dados:
    * id: Valor SERIAL. Gerado de forma automática pelo typeORM.
    * name: string e obrigatório
* Não podem ser cadastradas duas categorias com o mesmo nome.
* A rota pode ser acessada apenas por usuários administradores (admin = true).

*GET* - **/categories**
* Rota lista todas as categorias.
* A rota não precisa de autenticação para ser acessada.

*GET* - **/categories/:id/realEstate**
* Rota lista todos os imóveis que pertencem a uma categoria.
* A rota não precisa de autenticação para ser acessada.

*POST* - **/realEstate**
* Rota para criação de um imóvel com os seguintes dados:
    * id: Valor SERIAL. Gerado de forma automática pelo typeORM.
    * value: decimal e obrigatório
    * size: inteiro e obrigatório
    * address: um objeto com os seguintes dados:
        * street: string e obrigatório
        * zipCode: string e obrigatório
        * number: string e opcional
        * city: string e obrigatório
        * state: string e obrigatório
        * categoryId: number
    * sold: Gerado no momento da validação dos dados no formato boolean com default = false.
    * createdAt: Gerado pelo typeORM.
    * updatedAt: Gerado pelo typeORM.
    * Não podem ser cadastrados dois imóveis com o mesmo endereço.
* A rota pode ser acessada apenas por administradores.
* Não podem ser cadastrados imóveis com o campo state maior que 2 dígitos.
* Não podem ser cadastrados imóveis com o campo zipCode maior que 8 dígitos.

*GET* - **/realEstate**
* Rota lista todos os imóveis.
* A rota não precisa de autenticação para ser acessada.

*POST* - **/schedules**
* Rota responsável pelo agendamento de uma visita a um imóvel com os seguintes dados:
    * id: Valor SERIAL. Gerado de forma automática pelo typeORM.
    * date: string da data de agendamento da visita ao imóvel, no formato AAAA-DD-MM
    * hour: string do horário de agendamento da visita ao imóvel, no formato HH:MM
    * realEstateId: inteiro
    * userId: Pego através do token do usuário.
* Não é possível agendar uma visita a um imóvel com a mesma data e hora.
* Não é possível um usuário agendar uma visita a 2 imóveis diferentes com a mesma data e hora.
* Só é possível agendar uma visita durante horário comercial (08:00 as 18:00).
* Só é possível agendar uma visita durante em dias úteis (segunda à sexta).

*GET* - **/schedules/realEstate/:id**
* Rota lista todos os agendamentos de um imóvel.
* A rota pode ser acessada apenas por administradores.

## Contato

Para entrar em contato comigo me mande um e-mail ou uma mensagem nas redes sociais:

- [github](https://www.github.com/agnes-lica)
- [LinkedIn](https://www.linkedin.com/in/agnesmr/)
- E-mail: agnes.lica@gmail.com
