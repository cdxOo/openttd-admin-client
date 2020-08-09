'use strict';
module.exports = {
    ban: require('./ban'),
    banlist: require('./banlist'),
    clients: require('./clients'),
    clientName: require('./client-name'),
    companies: require('./companies'),
    debugLevel: require('./debug-level'),
    echo: require('./echo'),
    // FIXME: do we want "echoc" ??
    exec: require('./exec'),
    exit: require('./exit'),
    getseed: require('./getseed'),
    kick: require('./kick'),
    listAi: require('./list-ai'),
    listPatches: require('./list-patches'),
    ls: require('./ls'),
    move: require('./move'),
    patch: require('./patch'),
    pause: require('./pause'),
    pwd: require('./pwd'),
    resetCompany: require('./reset-company'),
    return: require('./return'),
    cd: require('./cd'),
    rm: require('./rm'),
    save: require('./save'),
    say: require('./say'),
    sayClient: require('./say-client'),
    sayPlayer: require('./say-player'),
    serverInfo: require('./server-info'),
    startAi: require('./start-ai'),
    status: require('./status'),
    stopAi: require('./stop-ai'),
    unban: require('./unban'),
    unpause: require('./unpause'),

    // FIXME: help??
    // FIXME: info_cmd??
    // FIXME: info_var??
    // FIXME: list_cmds??
    // FIXME: list_vars??
    // FIXME: resetengines???
    // FIXME: script???

};
