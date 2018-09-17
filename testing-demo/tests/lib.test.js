const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

describe('absolute', () => {
  it('input positive -> return positive', () => {
    let result = lib.absolute(1);
    expect(result).toBe(1);
  });
  
  it('input negative -> return negative', () => {
    let result = lib.absolute(-1);
    expect(result).toBe(1);
  });
  
  it('input zero -> return zero', () => {
    let result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe('greet', () => {
  it('return greeting msg', () => {
    let result = lib.greet('Secdet');
  });
});

describe('getCurrencies', () => {
  it('return supported currencies', () => {
    let result = lib.getCurrencies();

    //  Too general
    expect(result).toBeDefined();
    expect(result).not.toBeNull();

    //  Too specific
    expect(result[0]).toBe('USD');
    expect(result[1]).toBe('AUD');
    expect(result[2]).toBe('EUR');
    expect(result.length).toBe(3);

    //  Proper way
    expect(result).toContain('USD');
    expect(result).toContain('AUD');
    expect(result).toContain('EUR');

    //  Ideal way
    expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']));
  });
});

describe('getProduct', () => {
  it('return the product with the given id', () => {
    const result = lib.getProduct(1);
    // expect(result).toEqual({ id: 1, price: 10 });
    expect(result).toMatchObject({ id: 1, price: 10 });
    expect(result).toHaveProperty('id', 1);
  });
});

describe('registerUser', () => {
  it('throw if username is falsy', () => {
    const args = [null, undefined, NaN, '', 0, false];
    args.forEach( a => {
      expect( () => {lib.registerUser(a)} ).toThrow();
    });
  });

  it('return a user object if valid username is passed', () => {
    const result = lib.registerUser('mosh');
    expect(result).toMatchObject({ username: 'mosh' });
    expect(result.id).toBeGreaterThan(0);
  });
});

describe('applyDiscount', () => {
  it('Should apply 10% discount if customer has more than 10 points', () => {
    db.getCustomerSync = function(customerId) {
      console.log('Fake reading customer...');
      return { id: customerId, points: 20 };
    }

    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

describe('notifyCustomer', () => {
  it('should send a email to the customer', () => {
    db.getCustomerSync = jest.fn().mockReturnValue({email: 'a'});
    mail.send = jest.fn()

    lib.notifyCustomer({ customerId: 1 });

    expect(mail.send).toHaveBeenCalled();
    expect(mail.send.mock.calls[0][0]).toBe('a');
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);

  });
});
