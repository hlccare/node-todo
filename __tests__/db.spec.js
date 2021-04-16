const db = require('../db.js')
const fs = require('fs') //正常引用
const { clearMocks } = require('../__mocks__/fs.js')
jest.mock('fs')


describe('db', () => {
    afterEach(() => {
        fs, clearMocks()
    })
    it('can read', async () => {
        const data = [{ title: 'hi', done: true }];
        fs.setReadFileMock('/xxx', null, JSON.stringify(data));
        const list = await db.read('/xxx');
        console.log('list')
        console.log(list)
        expect(list).toStrictEqual(data)
    })
    it('can write', async () => {
        let fakeFile
        fs.setWriteFileMock('/yyy', (path, data, callback) => {
            fakeFile = data
            callback(null)
        })
        const list = [{ title: '123', done: false }, { title: '456', done: true }]
        await db.write(list, '/yyy')
        expect(fakeFile).toBe(JSON.stringify(list))
    })
})


// expect(list).toStrictEqual(data);