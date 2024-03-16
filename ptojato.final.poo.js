// 1. Classe Conta:
//Class principal as outras class ContaCorrente e ContaPoupaca, herdarão da class Conta.
class Conta {

    static imprimirInstrucoes(){
          // Instruções de segurança para todas as contas usando o metodo static.
          console.log("**Para manter sua conta segura:**");
          console.log("- Não compartilhe sua senha com ninguém.");
          console.log("- Crie uma senha forte e complexa.");
          console.log("- Desconfie de emails e links suspeitos.");
    }

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
            return `Cliente: ${nome}, sua Taxa de manutenção anual será de: ${valorAnual}.`;
          }

      }


      //Classe ContaPoupanca (Herança de Conta):
      class ContaPoupanca extends Conta{

        static melhoresInvestimentos = ["Tesouro Direto", "Ações"];

        #taxaJuros//Privado
        #limiteSaques//Privado

        constructor(numeroConta, nomeUsuario, saldo, profissaoUsuario, cpf, idade, taxaJuros, limiteSaques){
          super(numeroConta, nomeUsuario, saldo, profissaoUsuario, cpf, idade)
          this.#taxaJuros = taxaJuros
          this.#limiteSaques = limiteSaques
        }

        get limiteSaques(){//Exibir novo limite de saque.
          return this.#limiteSaques
        }

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

        gerenciarLimiteSaques(novoLimite){
           this.#limiteSaques = novoLimite
           return `Cliente: ${this.nomeUsuario}, seu novo limite de saque é: ${this.limiteSaques}.`
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

//<- Metodos Class Conta.----------------------------------------------------------------------------