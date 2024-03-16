/*# Exercício Final de OOP em JavaScript

### Requisitos Gerais:

1. O projeto deve ser implementado em JavaScript, utilizando classes para representar o sistema bancário simulado.
2. As classes devem incorporar conceitos avançados de programação orientada a objetos, como herança, polimorfismo, encapsulamento, getters e setters.
3. O projeto deve ser modular e seguir boas práticas de codificação, como separação de responsabilidades e uso adequado de padrões de projeto.

### Classes e Funcionalidades:

1. **Classe Conta:**
    - Atributos privados: `numeroConta`, `saldo`.
    - Atributos públicos: `nomeUsuario`, `profissaoUsuario`.
    - Métodos públicos:
        - `constructor(numeroConta, saldoInicial, nomeUsuario, profissaoUsuario)`: inicializa uma nova conta com número de conta, saldo inicial, nome do usuário e profissão do usuário.
        - `criarConta()`: cria uma nova conta e exibe uma mensagem de sucesso.
        - `checarExtrato()`: exibe o extrato da conta, incluindo número de conta, saldo atual, nome do usuário e profissão do usuário.
        - `solicitarEmprestimo(valor)`: solicita um empréstimo na conta e exibe uma mensagem indicando o valor solicitado.
        - `static imprimirInstrucoes()`: exibe instruções gerais para o uso das contas.
2. **Classe ContaCorrente (Herança de Conta):**
    - Além dos atributos e métodos da classe `Conta`, a classe `ContaCorrente` deve conter:
        - Atributos privados adicionais: `limiteChequeEspecial`, `taxaManutencao`.
        - Atributo estático `contasCorrente`, que será um array que irá armazenar todas as contas correntes já criadas.
        - Métodos públicos adicionais:
            - `gerenciarLimiteChequeEspecial(novoLimite)`: gerencia o limite do cheque especial e exibe uma mensagem indicando a alteração.
            - `calcularTaxaManutencao()`: calcula a taxa de manutenção da conta corrente e exibe o valor calculado.
        - `static listarTodasContasCorrente()`: lista todas as contas corrente criadas.
3. **Classe ContaPoupanca (Herança de Conta):**
    - Além dos atributos e métodos da classe `Conta`, a classe `ContaPoupanca` deve conter:
        - Atributos privados adicionais: `taxaJuros`, `limiteSaques`.
        - Atributo estático `melhoresInvestimentos` = ["Tesouro Direto", "Ações"];
        - Métodos públicos adicionais:
            - `calcularJuros()`: calcula os juros da conta poupança com base na taxa de juros e exibe o valor calculado.
            - `gerenciarLimiteSaques(novoLimite)`: gerencia o limite de saques da conta poupança e exibe uma mensagem indicando a alteração.
        - `static verificarMelhorInvestimento()`: verifica o melhor investimento disponível para contas poupança.

### Outros Requisitos:

1. Os métodos getters e setters devem ser utilizados para acessar e modificar os atributos privados das classes, exceto para `nomeUsuario` e `profissaoUsuario`.
2. A implementação das classes deve seguir os princípios de encapsulamento, garantindo que os atributos privados sejam acessados apenas por meio dos métodos públicos.

### Pontos extras

Vale pontos extras, o aluno que trouxer propriedades, metódos e/ou classes adicionais ao que for pedido.

### Considerações Finais:

1. Os alunos devem demonstrar uma compreensão sólida dos conceitos de herança, polimorfismo, encapsulamento, getters e setters na implementação das classes.
2. O código deve ser bem documentado e seguir um estilo de codificação consistente.*/

//ACREDITO QUE TENHA CONSIGUIDO PREENNCHER TODOS OS REQUISITOS SOLICITADOS.

//----------------------------Inicio-Codigo----------------------------------------------------------
// 1. Classe Conta:
//Class principal as outras class ContaCorrente e ContaPoupaca, herdarão da class Conta.
class Conta {

    #numeroConta;//Privado
    #saldo//Privado
    #cpf//Privado
    cadastro_confirmado;//Será atribuida a mensagem de sucessso.
  
    constructor(numeroConta, nomeUsuario, saldo, profissaoUsuario, cpf, idade) {
        if (!numeroConta || !nomeUsuario ||  !saldo || !profissaoUsuario || !cpf || !idade) {//Se ficar apenas um sem ser preenchido vai da Undefined e exibira a mensagem de Sucesso so quando todos os caracteres for preenchido.
            this.cadastro_confirmado = undefined;
            return;
          }

      this.#numeroConta = numeroConta;
      this.#saldo = saldo;
      this.nomeUsuario = nomeUsuario;
      this.profissaoUsuario = profissaoUsuario;
      this.#cpf = cpf
      this.idade = idade
      this.cadastro_confirmado = "Conta criada com Sucesso!";//adicionando a mensagem de Sucesso!.
    }

    get numeroConta(){//Exibir número da conta.
       return this.#numeroConta
    }

    get saldo(){//Exibir saldo 
        return this.#saldo
    }
  
    contaCriada() {
      return {
        numeroConta: this.#numeroConta,
        nomeUsuario: this.nomeUsuario,
        saldo: this.saldo,
        profissaoUsuario: this.profissaoUsuario,
        cadastro_confirmado: this. cadastro_confirmado
      };
    }

    checarExtrato() {
        return {
          ExtratoBancario: {
            numeroConta: this.#numeroConta,
            nomeUsuario: this.nomeUsuario,
            saldo: this.#saldo,
          },
        };
      }

      solicitarEmprestimo(valor) {
        return {
          valorSolicitado: valor,
          status: "Em análise",
          dataSolicitacao: new Date().toLocaleString(),
        };
      }

      static imprimirInstrucoes(){
        // Instruções de segurança para todas as contas usando o metodo static.
        console.log("**Para manter sua conta segura:**");
        console.log("- Não compartilhe sua senha com ninguém.");
        console.log("- Crie uma senha forte e complexa.");
        console.log("- Desconfie de emails e links suspeitos.");
      }

    }


    //Classe ContaCorrente (Herança de Conta):
    class ContaCorrente extends Conta {

        static contasCorrente = []

        #limiteChequeEspecial//Privado
        #taxaManutencao//Privado

        constructor(numeroConta, nomeUsuario, saldo, profissaoUsuario, cpf, idade, limiteChequeEspecial, taxaManutencao) {
          super(numeroConta, nomeUsuario, saldo, profissaoUsuario, cpf, idade);
          this.#limiteChequeEspecial = limiteChequeEspecial;
          this.#taxaManutencao = taxaManutencao
        }
      
        static adicionarConta(conta) {//Caso conta faça parte da contaCorrente será adicionado ap array contasCorrente.
            if (!conta instanceof ContaCorrente) {
              throw new Error("Objeto inválido: apenas instâncias de ContaCorrente podem ser adicionadas.");
            }
            this.contasCorrente.push(conta);
          }

          calcularTaxaManutencao(nome) {//Calcular taxa de manutenção anual.
            const contaEncontrada = ContaCorrente.contasCorrente.find(
              (conta) => conta.nomeUsuario === nome
            );
          
            if (!contaEncontrada) {
              throw new Error(`Conta não encontrada para o nome: ${nome}`);
            }
          
            const valorAnual = contaEncontrada.#taxaManutencao * 12;
            ContaCorrente.saldo -= this.#taxaManutencao
            return `Cliente: ${nome}, sua Taxa de manutenção anual será de: ${valorAnual}.`;
          }

          set limiteChequeEspecial(novoLimite) {
            if (typeof novoLimite !== "number") {
              throw new Error("O limite de cheque especial deve ser um número.");
            }
          
            if (novoLimite < 0) {
              throw new Error("O limite de cheque especial não pode ser negativo.");
            }
          
           this.#limiteChequeEspecial = novoLimite;
          }

          get limiteChequeEspecial(){
            return `Cliente ${this.nomeUsuario}, o valor do seu ceque especial foi alterado confira o novo valor - R$:${this.#limiteChequeEspecial}(Reais).`
          }

      }


      //Classe ContaPoupanca (Herança de Conta):
      class ContaPoupanca extends Conta{

        #taxaJuros//Privado
        #limiteSaques//Privado

        constructor(numeroConta, nomeUsuario, saldo, profissaoUsuario, cpf, idade, taxaJuros, limiteSaques){
          super(numeroConta, nomeUsuario, saldo, profissaoUsuario, cpf, idade)
          this.#taxaJuros = taxaJuros
          this.#limiteSaques = limiteSaques
        }

        //Exibir novo limite de saque.
        get limiteSaques(){//Exibir novo limite de saque.
          return this.#limiteSaques
        }

        //Metodo pra calcular a taxa de juros da poupança
        calcularJuros(){ 
          if (this.saldo <= 0) {
            throw new Error("Saldo inválido");
          }
          
          if (this.#taxaJuros <= 0) {
            throw new Error("Taxa de juros inválida");
          }
          
          const somaJuros = this.#taxaJuros / (this.saldo * 12) * 100;

          return `A taxa de juros do cliente: ${this.nomeUsuario}, é de: ${somaJuros.toFixed(4)}.`
        }

        //Metodo para atribuir um novo limite de saque a conta poupança.
        gerenciarLimiteSaques(novoLimite){
           this.#limiteSaques = novoLimite
           return `Cliente: ${this.nomeUsuario}, seu novo limite de saque é: ${this.limiteSaques}.`
        }

         //Metodo pra mostra melhor investimento ao cliente da conta poupança.
         static verificarMelhorInvestimento() {
          // Investimentos simulados
          const investimentos = [
            { nome: "Tesouro Direto Selic", rentabilidade: 100, risco: "Baixo", prazo: 12 },
            { nome: "CDB", rentabilidade: 110, risco: "Médio", prazo: 24 },
          ];
        
          // Filtrar investimentos de renda fixa (adequados para poupança)
          const investimentosRendaFixa = investimentos.filter(investimento => investimento.risco === "Baixo");
        
          // Selecionar investimento com maior rentabilidade dentre os de baixo risco
          let melhorInvestimento = investimentosRendaFixa[0];
          for (const investimento of investimentosRendaFixa) {
            if (investimento.rentabilidade > melhorInvestimento.rentabilidade) {
              melhorInvestimento = investimento;
            }
          }
        
          // Retornar informações do melhor investimento
          return `O melhor investimento para conta poupança é: ${melhorInvestimento.nome}, com rentabilidade de ${melhorInvestimento.rentabilidade}% ao ano, risco ${melhorInvestimento.risco} e prazo de ${melhorInvestimento.prazo} meses.`;
        }

      }
  

  //Classe Conta Corrente -> ------------------------------------------------------------------------

  //Adicionando os atributos dos clientes.
  const contaCorrente_01 = new ContaCorrente(12345, "João Beca", 500, "Pedreiro", "001.002.003-01", 62, 200, 10);
  const contaCorrente_02 = new ContaCorrente(54321, "João Marcos", 15, "Desempregado", "005.004.003-02", 27, 0, 5);
  const contaCorrente_03 = new ContaCorrente(56789, "Maria Madalena", 1500, "Domestica", "006.005.004-03", 41, 500, 15);

  //Adicionar Contas Corrente No Array conta Corrente
  ContaCorrente.adicionarConta(contaCorrente_01);
  ContaCorrente.adicionarConta(contaCorrente_02);
  ContaCorrente.adicionarConta(contaCorrente_03);

  // Verificando o conteúdo do array, lembre-se os atributos privados não são exibidos.
  console.log(ContaCorrente.contasCorrente);
  console.log("")

  //Chamando o metodo taxa de manutenção.
  const taxaManutencao_01 = contaCorrente_01.calcularTaxaManutencao(contaCorrente_01.nomeUsuario)
  const taxaManutencao_02 = contaCorrente_02.calcularTaxaManutencao(contaCorrente_02.nomeUsuario)
  const taxaManutencao_03 = contaCorrente_03.calcularTaxaManutencao(contaCorrente_03.nomeUsuario)
  console.log("")

  //Mostra Taxa de manutenção pro cliente. 
  console.log(taxaManutencao_01)
  console.log(taxaManutencao_02)
  console.log(taxaManutencao_03)
  console.log("") 

  //Novo Cliente pra testa alteração de limite cheque especial.
  const contaCorrente = new ContaCorrente(123456, "Dorivan Souza", 1000, "Jardineiro", "12345678900", 30, 500, 10);

  //Atribuir um novo valor ao limiteChequeEspecial usando set.
  contaCorrente.limiteChequeEspecial = 2000; // Altera o limite para R$ 2.000,00
  
  //Receber mensagem de cheque especial.
  const mensagem = contaCorrente.limiteChequeEspecial;
  
  //Mostra cliente com cheque especial alterado o valor.
  console.log(mensagem);
  console.log("")

  //<- Medosos Conta Corrente------------------------------------------------------------------------


  //Classe Poupança ->-------------------------------------------------------------------------------

  //Adicionando os clientes da conta poupança.
  const contaPoupanca_01 = new ContaPoupanca(123, "Ricardo Soares", 50000, "Altõnomo", "000.001.002-03", 42, 15, 5000)
  const contaPoupanca_02 = new ContaPoupanca(456, "Nelma Francisca", 8000, "Aposentado(a)", "004.005.006-07", 47, 15, 1500)
  const contaPoupanca_03 = new ContaPoupanca(789, "Paulo Ricardo", 1500, "Estudante", "007.008.009-10", 18, 15, 1000)

  //Exibindo os clientes da conta poupança, lembre-se os atributos privados não são exibidos.
  console.log(contaPoupanca_01)
  console.log(contaPoupanca_02)
  console.log(contaPoupanca_03)

  //Chamar o metodo calcular juros.
  const calcularJuros_01 = contaPoupanca_01.calcularJuros()
  const calcularJuros_02 = contaPoupanca_02.calcularJuros()
  const calcularJuros_03 = contaPoupanca_03.calcularJuros()

  //Exibir taxa de juro.
  console.log(calcularJuros_01)
  console.log(calcularJuros_02)
  console.log(calcularJuros_03)
  console.log("")

  //Chamar o metodo  gerenciarLimiteSaques
  const novoLimite_01 = contaPoupanca_01.gerenciarLimiteSaques(7000)
  const novoLimite_02 = contaPoupanca_02.gerenciarLimiteSaques(3000)
  const novoLimite_03 = contaPoupanca_03.gerenciarLimiteSaques(2000)
  
  //Mostra uma mensagem pro cliente da alteração do seu limite de saque.
  console.log(novoLimite_01)
  console.log(novoLimite_02)
  console.log(novoLimite_03)
  console.log("")

  //Chamar o metodo static verificarMelhorInvestimento.
  const mensagemMelhorInvestimento = ContaPoupanca.verificarMelhorInvestimento();

  //Exibir a mensagem do metodo static verificarMelhorInvestimento.
  console.log(mensagemMelhorInvestimento);

  //<- Metodos Class Poupança.-----------------------------------------------------------------------


  //Metodos Class Conta -> --------------------------------------------------------------------------

  // Chamar o metodo confirma se a conta foi criada.
  const contaCriada_01 = contaCorrente_01.contaCriada();
  const contaCriada_02 = contaCorrente_02.contaCriada();
  const contaCriada_03 = contaCorrente_03.contaCriada();
 
    //Chamar o metodo mostra extrato.
  const extrato_01 = contaCorrente_01.checarExtrato()
  const extrao_02 = contaCorrente_02.checarExtrato()
  const extrato_03 = contaCorrente_03.checarExtrato()

  //Mostra extrato dos clientes
  console.log(extrato_01)
  console.log(extrao_02)
  console.log(extrato_03)
  console.log("")

  try {
    //Solicitar Emprestimo
    const emprestimo_01 = contaCorrente_01.solicitarEmprestimo(1500);
    const emprestimo_02 = contaCorrente_02.solicitarEmprestimo(3000);
    const emprestimo_03 = contaCorrente_03.solicitarEmprestimo(500);
  
    // Mostrar Empréstimo.
    console.log(emprestimo_01);
    console.log(emprestimo_02);
    console.log(emprestimo_03);
  } catch (error) {
    console.error(`Erro ao solicitar empréstimo: ${error.message}`);
  }
  console.log("")

//Instruções no static
Conta.imprimirInstrucoes()

//<- Metodos Class Conta.------------------------------------FIM-------------------------------------