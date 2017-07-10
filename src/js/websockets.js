var ws = (function () {
  const ADDFONT = 0
  const DELFONT = 1
  const GETFONT = 2
  const HEARTBEAT = 3
  const UNKNOWN = 4

  const STATUSOK = 0
  const STATUSWAIT = 1
  const STATUSFAILED = 2

  const typeVals = [[ADDFONT,"ADDFONT"],[DELFONT,"DELFONT"],[GETFONT,"GETFONT"],[HEARTBEAT,"HEARTBEAT"],[UNKNOWN,"UNKNOWN"]]
  const typeMap = new Map(typeVals)

  const statusVals = [[STATUSOK,"STATUS_OK"],[STATUSWAIT,"STATUS_WAIT"],[STATUSFAILED,"STATUS_FAILED"]]
  const statusMap = new Map(statusVals)

  let lws
  function _connect(openCallback, closeCallback, messageCallback) {
    lws = new WebSocket("ws://192.168.1.121:42135/ws")
    lws.onopen = function(ev) {
      openCallback(ev)
    }

    lws.onmessage = function(ev) { messageCallback(ev) }
    lws.onclose = function(ev) { closeCallback(ev) }
  }

  function _send(data) {
    lws.send(data)
  }

  function _status(nbr) {
    return statusMap.get(nbr)
  }

  function _type(nbr) {
    return typeMap.get(nbr)
  }

  return {
    connect: _connect,
    send: _send,
    status: _status,
    type: _type,
    ADDFONT: ADDFONT,
    DELFONT: DELFONT,
    GETFONT: GETFONT,
    HEARBEAT: HEARTBEAT,
    UNKNOWN: UNKNOWN,
    STATUSOK: STATUSOK,
    STATUSWAIT: STATUSWAIT,
    STATUSFAILED: STATUSFAILED
  }
})();
module.exports = ws
