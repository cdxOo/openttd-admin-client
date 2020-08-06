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
    
    await client.rcon('content state "a"');
    var packet = await client.read();
    console.log(packet.output);
    // FIXME: when not applying eny filter
    // the list gets really long and somehow, sometimes we
    // recieve mangled buffers so the rcon end never gets parsed
    // (see ServerNetworkAdminSocketHandler::SendConsole
    // in network_admin.cpp)
    // for this reason we check if packet.output exists in addition
    // to the if the type is not rcon end
    while (packet.type !== 125) {
        packet = await client.read();
        console.log(packet.output);
    }
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


