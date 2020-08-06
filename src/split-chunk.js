'use strict';
module.exports = (chunk) => {
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
    }

    return packets;
}
