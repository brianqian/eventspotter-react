import cache from '../cache';

describe('cache', () => {
  it('reads and writes information correctly', () => {
    cache.set('userID', 'test');
    const result = cache.get('userID');
    expect(result).toEqual('test');
  });
});
