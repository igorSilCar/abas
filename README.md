# abas
Gerenciador de abastecimento distribuido

Necessario node.js e seguintes dependencias:

express
body-parser
multichain-node

Para instalar, rode:
npm install nomedependencia

Multichain necessario:
http://www.multichain.com/download-install/

Comandos para inicializacao da blockchain
multichain-util create chain1

Altere o arquivo params.dat localizado em:
~/.multichain/chain1/params.dat

anyone-can-connect = true
anyone-can-send = true
anyone-can-receive = true
anyone-can-issue = true

Anote a porta rpc listada no fim do arquivo, para utlizar na variavel port em multichain no arquivo app.js

var multichain = require("multichain-node")({
    port: rpcporthere,
    host: '127.0.0.1',
    user: 'userhere',
    pass: 'passwordhere'
})

Inicie a blockchain com user e pass:

multichaind cadeiat1 -daemon -rpcuser='userhere' -rpcpassword='passwordhere'

E inicie o app:

node app.js

.........................................

Problemas conhecidos:

Absolutamente incompleto;
Emite mas nao gasta via app, somente cli do multichain;
Nao conecta a rede externa;
Resposta do rpc nao chega a page.

Igor da Silva de Carvalho
