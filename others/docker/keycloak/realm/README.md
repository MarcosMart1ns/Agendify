# Utilizando e configurando Keycloak em ambiente de desenvolvimento

Abaixo segue algumas orientações para a utilização do keycloak em ambinete de desenvolvimento.

Requisitos:
 - Docker
 - Imagem docker Keycloak

## Configurando Keycloak

Para iniciar iremos subir uma instância com o profile dev no docker.
Podemos utilizar o arquivo docker-compose já existente neste repositório ou podemos
executar o seguinte comando.
```Bash
docker run --name keycloak -p 8080:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin quay.io/keycloak/keycloak:latest
```

O serviço vai subir na porta 8080 e pode ser acessado pela url http://localhost:8080
Em seguida precisamos criar um Realm

### Criando Realm

A primeira coisa que precisamos fazer dentro do console é a criação de um realm.
Podemos entender aqui que o realm é a representação da sua aplicação, podemos ter varias aplicações rodando na mesma instância do Keycloak.

Já na página inicial existirá o Realm master, ao clicar nele haverá um botão "Create Realm", clique nele.
Insira o nome do realm e Enabled deixe ativado.

Aqui caso possua um arquivo importado do realm, poderá utilizá-lo aqui. 
É possível importar o arquivo já existente neste repositório e pular as próximas estapas.
Caso não possua, siga os próximos passos

Em seguida ao clicar em create, insira o nome do clientId, clique em next.

Na próxima seção Capability config, tenha certeza que as seguintes opções estão ativas:
- Cliente Authentication
- Authorization
- Standard flow
- Direct access grants

Em seguida salve.
Estas alterações são necessárias para que, utilizando este client-id, conseguirmos adquirir um token para acesso as APIs.

Com o client criado, acesse o na lista de clients. Vá na aba Credentials e copie o Client Secret para usá-lo no arquivo properties a seguir.

### Configurando o application.propeties

No arquivo, configure as seguintes properties:

```properties
spring.security.oauth2.resourceserver.jwt.issuer-uri={host}/realms/agendify
spring.security.oauth2.resourceserver.jwt.jwk-set-uri={host}/realms/agendify/protocol/openid-connect/certs
spring.security.oauth2.client.registration.keycloak.client-id=agendify
spring.security.oauth2.client.registration.keycloak.clientSecret=F04orafsrG9B4fIWtpI1MBEVrIN0kkdQ
spring.security.oauth2.client.registration.keycloak.authorization-grant-type=client_credentials
spring.security.oauth2.client.provider.keycloak.token-uri={http://localhost:8080}/realms/agendify/protocol/openid-connect/token
```
**{host}** -> Deve ser preenchido o url host do keyloack

**client-id** -> O nome do client id configurado anteriormente

**clientSecret** -> O Client Secret indicado na aba credentials no keycloak

**grant-type** -> preencher com o valor _**client_credentials**_
