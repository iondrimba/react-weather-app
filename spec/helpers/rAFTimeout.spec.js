import rAFTimeout from '../../src/helpers/rAFTimeout';

describe('rAFTimeout', () => {
  it('call method after delay', (done) => {

    const mock = {
      method: jest.fn()
    };

    rAFTimeout(mock.method, 10);

    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      expect(mock.method).toBeCalled();
      done();
    }, 20);
  });

  it('does not call method before delay', (done) => {

    const mock = {
      method: jest.fn()
    };

    rAFTimeout(mock.method, 1000);

    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      expect(mock.method).not.toBeCalled();
      done();
    }, 500);
  });
});
