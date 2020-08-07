'use strict';
var binary = require('binary'),
    types = require('./types'),
    zero = require('./zerobuf');

module.exports = (packet) => {
    var decoder = binary.parse(packet),
        fields = undefined;
    
    (
        decoder
        .word16le('length')
        .word8('type')
        .tap(({ type, length }) => {
            var decodePayload = payloadDecoders[type];
            if (decodePayload) {
                decodePayload({ decoder })
            }
            else {
                // TODO
            }
        })
        .tap((_fields) => {
            fields = _fields;
        })
    );

    return fields;
}

var payloadDecoders = {
    // server tells client whet protocol version to use
    [types.PROTOCOL]: ({ decoder }) => {
        (
            decoder
            .word8('protocol')
        )
    },

    // welcome message containing when admin joined server
    [types.WELCOME]: ({ decoder }) => {
        (
            decoder
            .scan('name', zero())
            .scan('version', zero())
            .word8('dedicated')
            .into('map', () => {
                (
                    decoder
                    .scan('name', zero())
                    .word32le('seed')
                    .word8('landscape')
                    .word32le('startdate')
                    .word16le('mapheight')
                    .word16le('mapwidth')
                )
            })
            .tap((fields) => {
                fields.name = fields.name.toString();
                fields.version = fields.version.toString();
                fields.map.name = fields.map.name.toString();
            })
        )
    },

    // new game
    // FIXME: anything to decode here?
    /*[105]: ({ decoder }) => (
        decoder
        
    ),*/

    // rcon response
    [types.RCON_RESPONSE]: ({ decoder }) => (
        decoder
        .word16le('color')
        .scan('output', zero())
        .tap((fields) => {
            fields.output = fields.output.toString();
        })
    ),

    // rcon response end
    [types.RCON_END]: ({ decoder }) => (
        decoder
        .scan('command', zero())
        .tap((fields) => {
            fields.command = fields.command.toString();
        })
    ),

}
