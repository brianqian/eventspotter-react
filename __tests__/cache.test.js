import cache from '../cache';

describe('Set and Get', () => {
  it('reads and writes information correctly', () => {
    cache.set('userID', '12345');
    const result = cache.get('userID');
    expect(result).toEqual('1234');
  });
  it('should do retrieve the user object', () => {
    const result = cache.get('userID');
    console.log(result);
  });
});
