'use strict';
var Buffers = require('buffers');

module.exports = ({ chunk, lastChunkOverflow }) => {
    if (lastChunkOverflow) {
        chunk = Buffers([
            lastChunkOverflow,
            chunk
        ]).toBuffer()
    }

    var packets = [],
        packetLength = chunk.readUInt16LE(0),
        offset = 0 ;

    while ((offset + packetLength) <= chunk.length) {
        var nextOffset = offset + packetLength;
        packets.push(chunk.slice(offset, nextOffset));

        if (nextOffset < chunk.length) {
            packetLength = chunk.slice().readUInt16LE(nextOffset);
        }
        else {
            packetLength = 1; // to make sure while condition is broken
        }
        offset = nextOffset;
        //console.log("offset", offset, packetLength, chunk.length);
    }

    var overflow;
    if (offset < chunk.length) {
        overflow = chunk.slice(offset, chunk.length);
    }

    return ({
        packets,
        overflow
    });
}
