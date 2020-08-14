const BankTitleService = require('../services/bank-title.service');
const DealershipService = require('../services/dealership.service');
const BankSlipService = require('../services/bankSlip.service');
const ValidationContract = require('../validators/fluent-validator');
const TypeCode = require('../models/path/type-code');

exports.get = (req, res) => {
    try {
        let data = req.body.code.toString().replace(/\D/g, '');

        let contract = new ValidationContract();
        contract.isRequired(data, 'The digitable line is required.');
        contract.onlyContainsNumbers(data, 'Invalid format.');
        contract.correctLen(data, 'Invalid format.');

        if (!contract.isValid()) {
            res.status(400).json(contract.errors).end();
            return;
        }

        let bankSlipService = new BankSlipService(data);
        let typeCode = bankSlipService.type;

        if (typeCode === TypeCode.Title) {
            bankTitleService = new BankTitleService(data);

            if (!bankTitleService.checkVerifyingDigits()) {
                throw new invalidCodeResponse(res);
            }

            let dueDate = bankTitleService.getDueDateTimestamp();
            let price = bankTitleService.getPrice();
            let barcode = bankTitleService.getBarCode();

            res.status(200).send({
                valid: true,
                price,
                due_date_timestamp: dueDate,
                barcode
            })

        } else if (typeCode === TypeCode.Dealership) {
            dealershipService = new DealershipService(data);

            if (!dealershipService.checkVerifyingDigits()) {
                throw new invalidCodeResponse(res);
            }

            let price = dealershipService.getPrice();
            let barcode = dealershipService.getBarCode();

            res.status(200).send({
                valid: true,
                price,
                due_date_timestamp: null,
                barcode
            })
        }
    } catch (error) {
        res.status(400).send({
            message: 'error processing request'
        })
    }
}

function invalidCodeResponse(res) {
    res.status(400).send({
        message: 'invalid code.'
    })
}
