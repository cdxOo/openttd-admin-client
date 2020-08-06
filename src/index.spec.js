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
    var response = await client.auth({
        user: 'AdminUser',
        password: 'supersecret'
    });
    console.log(response);

    var lines;

    lines = await client.rcon.content.update();
    console.log(lines);

    lines = await client.rcon.content.state({ filter: 'universal' });
    console.log(lines);
    
    lines = await client.rcon.content.select({ id: 10548386 });
    console.log(lines);
    
    lines = await client.rcon.content.download();
    console.log(lines);
    //console.log(await client.read());
    //console.log(client.queue());







    /*await client.rcon('say "hello world"');
    console.log(await client.read(2));

    //await client.rcon('newgame');
    //console.log(await client.read(3));
    
    await client.rcon('server_info');
    var packet = await client.read();
    console.log(packet);
    while (packet.type !== 125) {
        packet = await client.read();
        console.log(packet);
    }*/


    /*await client.rcon('content update');
    var packet = await client.read();
    console.log(packet);
    while (packet.type !== 125) {
        packet = await client.read();
        console.log(packet);
    }*/

    //await client.ping();
    //await client.say();

    await client.disconnect();

})().catch(err => console.log(err));


