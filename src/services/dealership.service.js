const BankSlipService = require('./bankSlip.service');

class DealershipService extends BankSlipService {
    digitableLine;
    fieldOne;
    fieldTwo;
    fieldThree;
    fieldFour;

    constructor(data) {
        super(data);

        this.digitableLine = data;
        this.fieldOne = { code: this.digitableLine.substr(0, 11), verifying_digit: this.digitableLine.substr(11, 1) };
        this.fieldTwo = { code: this.digitableLine.substr(12, 11), verifying_digit: this.digitableLine.substr(23, 1) };
        this.fieldThree = { code: this.digitableLine.substr(24, 11), verifying_digit: this.digitableLine.substr(35, 1) };
        this.fieldFour = { code: this.digitableLine.substr(36, 11), verifying_digit: this.digitableLine.substr(47, 1) };
    }

    /** Valida os digitos verificadores da linha digitável */
    checkVerifyingDigits() {
        let fieldOne = this.fieldOne;
        let fieldTwo = this.fieldTwo;
        let fieldThree = this.fieldThree;
        let fieldFour = this.fieldFour;
        let allFields = [fieldOne, fieldTwo, fieldThree, fieldFour];

        return super.checkVerifyingDigits(allFields);
    }

    /** Retorna o preço extraido da linha digitável */
    getPrice() {
        let fieldPrice = this.digitableLine.substr(4, 7) + this.digitableLine.substr(12, 4);
        return super.getPrice(fieldPrice);
    }

    /* Retorna o código de barras validado */
    getBarCode() {
        let barcode =
            this.digitableLine.substr(0, 11) +
            this.digitableLine.substr(12, 11) +
            this.digitableLine.substr(24, 11) +
            this.digitableLine.substr(36, 11);

        return super.checkVerifyingDigitBarCode(barcode, 3);
    }
}

module.exports = DealershipService;