test('runAllTests', async () => {
    await require('./tests/fs.test.js');
    await require('./tests/chat.test.js');
});
