//Validação da Data de Nascimento//

export function valida(input) {
    const tipoDeInput = input.dataset.tipo

    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }

 
}

const validadores = {
    dataNascimento:input => validaDataNascimento(input),
    cpf:input => validaCpf(input)
}

function validaDataNascimento(input) {
    const dataRecebida = new Date(input.value)
    let mensagem = ''

    if(!maiorQue18(dataRecebida)) {
        mensagem = 'Você deve ser maior que 18 anos para se cadastrar.'
    }

    input.setCustomValidity(mensagem)
}

function maiorQue18(data) {
    const dataAtual = new Date()
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate())

    return dataMais18 <= dataAtual
}

//Validação de Cpf//

function validaCpf(input){
    const cpfFormatado = input.value.replace(/\D/g, '')
    let mensagem = ''

    if(!checarCpfRepetido(cpfFormatado) || !checaEstruturaCpf(cpfFormatado) ){
        mensagem = 'O Cpf Digitado não é valido'
    }

    input.setCustomValidity(mensagem)
}

function checarCpfRepetido(cpf){
    const valoresRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]

    let cpfValido = true

    valoresRepetidos.forEach(valor =>{
        if(valor == cpf){
            cpfValido = false
        }
    })

    return cpfValido
}


function checaEstruturaCpf(cpf){
    const multiplicador = 10


    return checaDigitoVerificador(cpf, multiplicador)
}


function checaDigitoVerificador(cpf, multiplicador){
    if(multiplicador >= 12){
        return true
    }
    
    
    let multiplicadorInicial = multiplicador
    let soma = 0
    const cpfSemDigitos = cpf.substr(0, multiplicador - 1).split('')
    const digitoVerificador = cpf.charAt(multiplicador - 1)

    for(let contador = 0; multiplicadorInicial > 1; multiplicadorInicial--){
        soma = soma + cpfSemDigitos[contador] * multiplicadorInicial
        contador++
    }

    if(digitoVerificador == confirmaDigito(soma)){
        return checaDigitoVerificador(cpf, multiplicador + 1)
    }

    return false
}


function confirmaDigito(soma){
    return 11 - (soma % 11)
}