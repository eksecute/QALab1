const {
  ExceptionManager
} = require('./lab1');
const  {
  ValidationError,
  PermissionError,
  DatabaseError,
} = require('./modules/errors');

const exceptionManager = new ExceptionManager;

const critErrors = [ new ValidationError(), new PermissionError(), new DatabaseError() ];
const ordErrors = [ new SyntaxError(), new Error(), new TypeError(), new RangeError() ];

describe('Critical errors', () => {
  critErrors.forEach(elm => {
      test(`exceptionManager CRITICAL counter for '${elm}' should increment, and should NOT increment for ORDINARY counter`, () => {
        const oldCritCounter = exceptionManager.crit;
        const oldOrdCounter = exceptionManager.ord;

        exceptionManager.handlingError(elm);
        const newCritCounter = exceptionManager.crit;
        const newOrdCounter = exceptionManager.ord;

        expect(newCritCounter).not.toBe(oldCritCounter);
        expect(newOrdCounter).toBe(oldOrdCounter);
      });
  });
});

describe('Ordinary errors', () => {
  ordErrors.forEach(elm => {
      test(`ORDINARY counter for '${elm}' should increment, and should NOT increment for CRITICAL counter`, () => {
        const oldCritCounter = exceptionManager.crit;
        const oldOrdCounter = exceptionManager.ord;
        exceptionManager.handlingError(elm);
        const newCritCounter = exceptionManager.crit;
        const newOrdCounter = exceptionManager.ord;

        expect(newCritCounter).toEqual(oldCritCounter);
        expect(newOrdCounter).toBeGreaterThan(oldOrdCounter);
      });
  });
});
