const expect = require('expect');
const {isRealString} = require('./validation');


describe('isRealString', () => {
  it('should reject non string values', () => {
    let test = isRealString(98);
    expect(test).toBeFalsy();
  });

  it('should reject string with only spaces', () => {
    let test = isRealString('   ');
    expect(test).toBeFalsy();
  });

  it('should allow string with non space characters', () => {
    let test = isRealString('   Tony   Malloney    ');
    expect(test).toBeTruthy();
  });

});
