'use strict';
var OpenTTDAdmin = require('./index');

console.log('hello')

var result = (async () => {

    var client = OpenTTDAdmin({
        host: '127.0.0.1',
        port: 3977,
        debug: 1
    });

    await client.connect();
    await client.auth({
        user: 'AdminUser',
        password: 'supersecret'
    });
    console.log(await client.read(2));

    await client.rcon('say "hello world"');
    console.log(await client.read(1));

    //await client.ping();
    //await client.say();

    await client.disconnect();

})().catch(err => console.log(err));


