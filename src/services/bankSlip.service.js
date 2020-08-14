let TypeCode = require('../models/path/type-code');

class BankSlipService {

    type;

    constructor(data) {
        this.type = getType(data);
    }

    get type() {
        return this.type;
    }

    /* Valida os digitos verificadores da linha digitável */
    checkVerifyingDigits(data) {
        let isValid = true;

        data.forEach(field => {
            let codeArray = field.code.split(''); //separa o codigo em um array de numeros
            let result;
            let total = 0; //total da soma a ser incrementado a cada iteração do loop
            let multiplier = 2;
            let cont = field.code.length - 1;

            while (cont >= 0) {
                let aux = codeArray[cont] * multiplier;

                if (aux.toString().length === 1) {
                    total += aux;
                } else {
                    total += sumTensAndUnityNumber(aux);
                }

                multiplier === 2 ? multiplier = 1 : multiplier = 2;
                cont--;
            }

            total % 10 === 0 ? result = 0 : result = 10 - (total % 10);

            if (result !== Number(field.verifying_digit)) {
                isValid = false;
            }
        });

        return isValid;
    }

    /* Retorna o valor do boleto extraido da linha digitável */
    getPrice(data) {
        let number = data.replace(/^0+/, '');

        if (number === '') {
            return null
        }

        return Number(number) / 100;
    }

    /*Faz a validação do digito verificador do código de barras */
    checkVerifyingDigitBarCode(barcode, positionVD) {
        let positionVerifyingDigit = positionVD; // indice do digito verificador
        let verifyingDigit = barcode.substr(positionVerifyingDigit, 1);
        let result;
        let isValid = true;
        let barcodeArray = barcode.split(''); //separa o código em um array de números
        let total = 0; // total da soma a ser incrementado a cada iteração do loop
        let multiplier = 2;
        let cont = barcode.length - 1;

        while (cont >= 0) {
            if (cont !== positionVerifyingDigit) {
                let aux = barcodeArray[cont] * multiplier;
                total += aux;

                multiplier == 9 ? multiplier = 2 : multiplier++;
            }

            cont--;
        }

        if (positionVD === 4) { // no caso do boleto do tipo título bancário, o digito verificador está no indice 4
            result = 11 - (total % 11);

            if (result === 0 || result === 10 || result === 11) {
                result = 1;
            }

        } else if (positionVD === 3) { // no caso do boleto do tipo concessionária, o digito verificador está no indice 3
            result = total % 11;
        }

        if (result !== Number(verifyingDigit)) {
            isValid = false;
        }

        if (isValid) {
            return barcode;
        } else {
            return null;
        }
    }
}

/* Retorna o tipo do boleto com base na linha digitável */
getType = (code) => {
    if (code.length === 47) {
        return TypeCode.Title;
    } else if (code.length === 48) {
        return TypeCode.Dealership;
    }
}

/* Soma os dois algarismos de um número. Ex: 12 => 1 + 2  */
sumTensAndUnityNumber = (value) => {
    let numbers = value.toString().split('');
    let result = Number(numbers[0]) + Number(numbers[1]);
    return result;
}

module.exports = BankSlipService;