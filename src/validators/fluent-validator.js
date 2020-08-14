class ValidationContract {
    errors;

    constructor() {
        this.errors = [];
    }

    isRequired(value, message) {
        if (!value || value.length <= 0)
            this.errors.push({ message: message });
    }
    
    onlyContainsNumbers(value, message) {
        var reg = new RegExp(/^[0-9]*$/);
        if (!reg.test(value))
            this.errors.push({ message: message });
    }
    
    correctLen (value, message) {
        if (value.length != 47 && value.length != 48)
            this.errors.push({ message: message });
    }
    
    get errors() {
        return this.errors;
    }
    
    clear() {
        this.errors = [];
    }
    
    isValid() {
        return this.errors.length == 0;
    }    
}

module.exports = ValidationContract;