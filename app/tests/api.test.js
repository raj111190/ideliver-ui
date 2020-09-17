import { getData, postData, deleteData } from '../js/api';

function mockFetch(url, data, fail = false) {
  return new Promise((resolve, reject) => {
    if (fail) {
      return reject(new Error('request failed'));
    }
    return resolve({
      ok: !fail,
      statusCode: fail ? 500 : 200,
      json() {
        return Promise.resolve(data);
      },
    });
  });
}

describe('api', () => {
  it('getData', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(url => mockFetch(url, { Id: '123' }));
    const response = await getData('foo');
    expect(response.Id).toBe('123');
  });
  it('postData', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(url => mockFetch(url, { Id: '123' }));
    const response = await postData('foo');
    expect(response.Id).toBe('123');
  });
  it('deleteData', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(url => mockFetch(url, { Id: '123' }));
    const response = await deleteData('foo');
    expect(response.Id).toBe('123');
  });
  it('fail with an error', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(url => mockFetch(url, { Id: '123' }, true));
    try {
      await getData('foo');
    } catch (e) {
      expect(e.message).toEqual('request failed');
    }
  });
});
