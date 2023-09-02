# Sistema de Autenticação e Autorização com JWT

Este é um sistema de autenticação e autorização baseado em JSON Web Tokens (JWT) que permite aos usuários se registrarem, fazerem login e acessarem recursos protegidos com base em suas permissões.

## Funcionalidades

- **Registro de Usuários:** Os usuários podem se registrar na aplicação fornecendo informações como nome, email e senha.
- **Login de Usuários:** Os usuários podem fazer login usando suas credenciais registradas.
- **Geração de Tokens JWT:** Após a autenticação bem-sucedida, a API gera um token JWT que pode ser usado para autenticar solicitações futuras.
- **Verificação de Tokens:** A API verifica a validade dos tokens JWT ao acessar recursos protegidos.
- **Controle de Acesso:** Os recursos protegidos só estão disponíveis para usuários com as permissões apropriadas.

## Instalação

1. Clone o repositório:

 ```bash
   git@github.com:EwertonHecsley/Desafio-Impulso.git
   cd Desafio-Impulso
   ```

2. Instale as dependências:
  ```bash
    npm install
  ```
3. Execute a aplicação:
  ```bash
    npm start
  ```

# Uso
## Registro de Usuários

Envie uma solicitação **POST** para `/usuario` com os seguintes campos no corpo da solicitação:
```json
{
  "nome": "Nome do Usuário",
  "email": "usuario@example.com",
  "senha": "senha_segura"
}
```
## Login de Usuários

Envie uma solicitação **POST** para `/login` com as credenciais do usuário:
```json
{
  "email": "usuario@example.com",
  "senha": "senha_segura"
}
```

A resposta conterá um token JWT que deve ser incluído no cabeçalho de autorização para acessar recursos protegidos.

## Acesso a Recursos Protegidos

Para acessar recursos protegidos, inclua o token JWT no cabeçalho de autorização da solicitação:

```makefile
  Authorization: Bearer seu_token_jwt_aqui
```
## Contribuição

Se você deseja contribuir com este projeto, siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature: git checkout -b minha-feature.
3. Faça commit das suas alterações: git commit -m 'Adicione uma nova feature'.
4. Faça push para a branch: git push origin minha-feature.
5. Abra um Pull Request.







