// 'use strict';
const { ValidationError } = require('./modules/errors');
const { PermissionError } = require('./modules/errors');
const { DatabaseError } = require('./modules/errors');

const criticalErrs = ['ValidationError', 'PermissionError', 'DatabaseError'];

class ExceptionManager {
    constructor() {
        this.crit = 0;
        this.ord = 0;
    }

    isCritical(err) {
        const res = (err.name === 'ValidationError' || err.name === 'PermissionError' || err.name === 'DatabaseError')
        return res;
    }

    handlingError(err) {
        this.isCritical(err) ? this.crit++ : this.ord++;
    }
     getStat () {
        const stat = 'critical:' + (this.crit || 0 ) + ', ' +  'ordinary:' + (this.ord || 0);
       console.log(stat);
     }
}

let exceptionManager = new ExceptionManager();

// exceptionManager.isCritical(new DatabaseError())

exceptionManager.handlingError(new ValidationError());
(exceptionManager.getStat())
// exceptionManager.handlingError(new PermissionError());
// exceptionManager.getStat()
// exceptionManager.handlingError(new DatabaseError());
// exceptionManager.getStat()
exceptionManager.handlingError(new RangeError());
exceptionManager.getStat()

// console.log(exceptionManager.isCritical(new Error()));

module.exports = {
    ValidationError,
    PermissionError,
    DatabaseError,
    ExceptionManager
};