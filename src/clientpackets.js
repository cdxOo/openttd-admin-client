'use strict';
var Buffers = require('buffers'),
    put = require('put'),
    zero = require('./zerobuf'),
    packets = module.exports = {};

var withHeader = ({ type, payload }) => (
    Buffer.concat([
        (
            put()
            .word16le(payload ? payload.length + 3 : 3)
            .word8(type)
            .buffer()
        ),
        payload,
    ])
);

packets.Join = ({ user, password, version }) => (
    withHeader({
        type: 0x00,
        payload: Buffers([
            Buffer.from(password),
            zero(),
            Buffer.from(user),
            zero(),
            Buffer.from(version ? `${version}` : "0"),
            zero(),
        ]).toBuffer()
    })
);

packets.Rcon = (command) => (
    withHeader({
        type: 0x05,
        payload: Buffers([
            Buffer.from(command),
            zero(),
        ]).toBuffer()
    })
);
