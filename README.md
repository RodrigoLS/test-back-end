# Teste Back-end

> O teste consiste em escrever um programa em Node.js que expõe uma API na qual é dada como entrada uma linha digitada de um boleto e que retorna:

* Se a linha digitada é válida
* O valor do boleto, se existir
* A data de vencimento do boleto, se existir
* Os 44 dígitos correspondentes ao código de barras desse boleto

É essencial que seja feita a validação dos dígitos verificadores.

Como um dos objetivos do teste é avaliar o raciocínio lógico do candidato, é imprescindível que a validação do boleto seja realizada sem auxílio de bibliotecas de terceiros.

Existem 2 tipos de boletos que seguem regras diferentes: títulos bancários e pagamentos de concessionárias. O código deve funcionar corretamente para ambos.

Não há especificações especiais sobre a arquitetura da API. Estruture os endpoints da forma que achar melhor, justificando suas escolhas sempre que possível.



### Para executar o projeto

1 - Faça o download e instale o [node.js]

2 - na raiz do projeto execute o comando a seguir para instalar os pacotes necessários:
```sh
npm install
```

3 - Execute o projeto:
```sh
npm start
```

4 - Consuma o serviço fazendo uma request com verbo **GET** para a seguinte url:
```sh
localhost:8080/digitable/line
```

Passando o seguinte **JSON** no body da request:
```sh
{
  code: "Sua linha digitável aqui"
}
```









[node.js]: <http://nodejs.org>
