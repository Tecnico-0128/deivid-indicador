const nome = document.getElementById("nome")
const cpf = document.getElementById("cpf")
const data = document.getElementById("data")
const salario = document.getElementById("salario")
const funcao = document.getElementById("funcao")
const dados = document.getElementById("lc")

const funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || []


const cpf2 = document.getElementById("cpff")
const salario2 = document.getElementById("salariof")
const dadosf = document.getElementById("lf")
let fncencontrados = null

const listaAtivos = document.getElementById("ativos")
const listaDemitidos = document.getElementById("demitidos")


function cadastro() {
    if(nome.value.trim() && cpf.value.trim() && data.value.trim() && salario.value.trim() && funcao.value.trim()){
        if(/^[A-Za-zÀ-ÿ\s]+$/.test(nome.value)){
            if(/^\d{11}$/.test(cpf.value)){
                let achou = false
                for(let c of funcionarios){
                    if(c.CPF == cpf.value){
                        achou = true
                    }
                }if(!achou){
                    if(isNaN(Number(salario.value)) || Number(salario.value) <= 0){
                        alert("Salário Deve Ser Maior que 0 !!!")
                        return
                    }if(!/^[A-Za-zÀ-ÿ\s]+$/.test(funcao.value)){
                        alert("Apenas Letras e Espaços")
                        return
                    }
                    const fnc = {
                        Nome: nome.value,
                        CPF: cpf.value,
                        Data: data.value,
                        Salario: Number(salario.value),
                        Funcao: funcao.value,
                        EstadoAtual: "Ativo"
                    }
                    funcionarios.push(fnc);
                    localStorage.setItem("funcionarios", JSON.stringify(funcionarios));
                    alert(fnc.Nome + " Cadastro Efetuado com sucesso!")
                    listar()
                }else{
                    alert("Esse CPF já está Cadastrado na Loja !!!")
                }
            }else{
                alert("CPF deve conter 11 dígitos!")
            }
        }else{
            alert("Nome invalido, use apenas letras e espaços!")
        }
    }else{
        alert("Preencha todos os campos!!!")
    }
}

function buscarf(){
    if(cpf2.value.trim()){
        fncencontrados = null

        for(let f of funcionarios){
            if(f.CPF == cpf2.value){
                fncencontrados = f
            }
        }if(fncencontrados){
            alert("Cliente encontrado com sucesso!")

            dados.innerHTML = `
                <p>Nome: ${fncencontrados.Nome}</p>
                <p>Salário atual: R$ ${fncencontrados.Salario}</p>
            `
        }else{
            alert("Funcionário não encontrado")
            dados.innerHTML = ""
        }
    }else{
        alert("Digite o CPF")
    }
}

function editar(){
    if(fncencontrados){
        if(salario2.value.trim()){
            if(Number(salario2.value) > 0){
                if(Number(salario2.value) >= fncencontrados.Salario){
                    fncencontrados.Salario = Number(salario2.value)
                    localStorage.setItem("funcionarios", JSON.stringify(funcionarios))
                    alert("Salário alterado com sucesso")
                    dados.innerHTML = `
                        <p>Nome: ${fncencontrados.Nome}</p>
                        <p>Salário atual: R$ ${fncencontrados.Salario}</p>
                    `
                    salario2.value = ""
                    list()
                }else{
                    alert("O novo salário não pode ser menor que o atual")
                }
            }else{
                alert("Digite um salário válido")
            }
        }else{
            alert("Digite o novo salário")
        }
    }else{
        alert("Busque um funcionário primeiro")
    }
}

function demitir() {
    const cpf = document.getElementById("cpfd").value.trim()
    const con_cpf = document.getElementById("con_cpf").value.trim()

    if (cpf == "" || con_cpf == "") {
        alert("Preencha os dois CPFs!")
        return
    }if (cpf !== con_cpf) {
        alert("CPFs divergentes!")
        return
    }
    const buscaCpf = funcionarios.find(fun => fun.CPF === cpf)

    if (!buscaCpf) {
        alert("Funcionário não cadastrado!")
        return
    }if (buscaCpf.EstadoAtual !== "Ativo") {
        alert("Funcionário já demitido!")
        return
    }
    buscaCpf.EstadoAtual = "Demitido"

    localStorage.setItem("funcionarios", JSON.stringify(funcionarios))
    alert("Funcionário demitido     com sucesso!")
    console.log(buscaCpf)

    listarFuncionarios()
    listar()
}

function listarFuncionarios() {
    listaAtivos.innerHTML = ""
    listaDemitidos.innerHTML = ""
    for (let funcionario of funcionarios) {

        if (funcionario.EstadoAtual == "Ativo") {
            listaAtivos.innerHTML += `
                Ativos
                <p>
                    Nome: ${funcionario.Nome}<br>
                    CPF: ${funcionario.CPF}<br>
                    Função: ${funcionario.Funcao}<br>
                    Salário: R$ ${funcionario.Salario}
                </p>
                <hr>
            `
        }
        else if (funcionario.EstadoAtual == "Demitido") {
            listaDemitidos.innerHTML += `
                Demitidos
                <p>
                    Nome: ${funcionario.Nome}<br>
                    CPF: ${funcionario.CPF}<br>
                    Função: ${funcionario.Funcao}<br>
                    Salário: R$ ${funcionario.Salario}
                </p>
                <hr>
            `
        }
    }
}

function listar(){
    dados.innerHTML=' Lista de Funcionarios'
    for(let fnc of funcionarios){
        dados.innerHTML+=`<p>Nome: ${fnc.Nome}<br> CPF: ${fnc.CPF}<br> Data de Nascimento ${fnc.Data}<br>Salario: ${fnc.Salario}<br>Função: ${fnc.Funcao}<br>EstadoAtual: ${fnc.EstadoAtual}</p>`
    }
}

listarFuncionarios()
listar()