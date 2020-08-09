'use strict';
module.exports = (client) => ({ patchname, newvalue }) => (
    client.rcon({ command: `patch "${patchname}" "${newvalue}"` })
);
    
