// 1. Classe Conta:
class Conta {

    static imprimirInstrucoes(){
          // Segurança
          console.log("**Para manter sua conta segura:**");
          console.log("- Não compartilhe sua senha com ninguém.");
          console.log("- Crie uma senha forte e complexa.");
          console.log("- Desconfie de emails e links suspeitos.");
    }

    #numeroConta;
    #saldo
    cadastro_confirmado;//Será atribuida a mensagem de sucessso.
  
    constructor(numeroConta, nomeUsuario, saldo, profissaoUsuario) {
        if (!numeroConta || !nomeUsuario ||  !saldo || !profissaoUsuario) {//Se ficar apenas um sem ser preenchido vai da Undefined e exibira a mensagem de Sucesso so quando todos os caracteres for preenchido.
            this.cadastro_confirmado = undefined;
            return;
          }

      this.#numeroConta = numeroConta;
      this.#saldo = saldo;
      this.nomeUsuario = nomeUsuario;
      this.profissaoUsuario = profissaoUsuario;
      this.cadastro_confirmado = "Conta criada com Sucesso!";//adicionando a mensagem de Sucesso!.
    }

    get numeroConta(){
       return this.#numeroConta
    }

    get saldo(){
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

    class ContaCorrente extends Conta {

        static contasCorrente = []

        constructor(numeroConta, nomeUsuario, saldo, profissaoUsuario, limiteChequeEspecial, taxaManutencao) {
          super(numeroConta, nomeUsuario, saldo, profissaoUsuario);
          this.limiteChequeEspecial = limiteChequeEspecial;
          this.taxaManutencao = taxaManutencao
        }
      
        static adicionarConta(conta) {
            if (!conta instanceof ContaCorrente) {
              throw new Error("Objeto inválido: apenas instâncias de ContaCorrente podem ser adicionadas.");
            }
            this.contasCorrente.push(conta);
          }

          calcularTaxaManutencao(){
            const valorAnual = this.taxaManutencao * 12
            return console.log(`Taxa de Manutenção anual será de: ${valorAnual}`)
          }

      }
  
  //Adicionando os atributos dos clientes.
  const contaCorrente_01 = new ContaCorrente(12345, "João Beca", 500, "Pedreiro", 200, 5);
  const contaCorrente_02 = new ContaCorrente(54321, "João Marcos", 15, "Desempregado", 0, 5);
  const contaCorrente_03 = new ContaCorrente(56789, "Maria Madalena", 1500, "Domestica", 500, 10);

  //Adicionar Contas Corrente No Array conta Corrente
  ContaCorrente.adicionarConta(contaCorrente_01);
  ContaCorrente.adicionarConta(contaCorrente_02);
  ContaCorrente.adicionarConta(contaCorrente_03);

// Verificando o conteúdo do array
  console.log(ContaCorrente.contasCorrente);
  
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

//Instruções no static
Conta.imprimirInstrucoes()