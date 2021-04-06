const trends = require('trending-github');

describe('Trends task', () => {
  it('should assert true', async () => {
    const currentTrends = await trends();
    expect(currentTrends.length).not.toBe(0);
  });
});
