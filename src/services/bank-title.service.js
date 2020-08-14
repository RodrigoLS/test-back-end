const BankSlipService = require('./bankSlip.service');

class BankTitleService extends BankSlipService {
    digitableLine;
    fieldOne;
    fieldTwo;
    fieldThree;
    fieldDueDate;
    fieldPrice;

    constructor(data) {
        super(data);

        this.digitableLine = data;
        this.fieldOne = { code: this.digitableLine.substr(0, 9), verifying_digit: this.digitableLine.substr(9, 1) };
        this.fieldTwo = { code: this.digitableLine.substr(10, 10), verifying_digit: this.digitableLine.substr(20, 1) };
        this.fieldThree = { code: this.digitableLine.substr(21, 10), verifying_digit: this.digitableLine.substr(31, 1) };
        this.fieldDueDate = { code: this.digitableLine.substr(33, 4) };
        this.fieldPrice = { code: this.digitableLine.substr(37, 10) };
    }

    /** Valida os digitos verificadores da linha digitável */
    checkVerifyingDigits() {
        let fieldOne = this.fieldOne;
        let fieldTwo = this.fieldTwo;
        let fieldThree = this.fieldThree;
        let allFields = [fieldOne, fieldTwo, fieldThree];

        return super.checkVerifyingDigits(allFields);
    }

    /** Retorna a data de vencimento do boleto em timestamp */
    getDueDateTimestamp() {
        if (this.fieldDueDate.code === '0000') {
            return null;
        }

        let days = Number(this.fieldDueDate.code);

        return new Date(1997, 9, 7 + days).getTime();
    }

    /** Retorna o preço extraido da linha digitável */
    getPrice() {
        return super.getPrice(this.fieldPrice.code);
    }

    /* Retorna o código de barras validado */
    getBarCode() {
        let barcode =
            this.digitableLine.substr(0, 4) +
            this.digitableLine.substr(32, 15) +
            this.digitableLine.substr(4, 5) +
            this.digitableLine.substr(10, 10) +
            this.digitableLine.substr(21, 10);

        return super.checkVerifyingDigitBarCode(barcode, 4);
    }
}

module.exports = BankTitleService;