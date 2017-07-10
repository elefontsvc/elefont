var ws = (function () {
  let lws
  function _connect(openCallback, closeCallback, messageCallback) {
    lws = new WebSocket("ws://192.168.1.121:42135/ws")
    lws.onopen = openCallback
    lws.onmessage = messageCallback
    lws.onclose = closeCallback
  }

  return {
    connect: _connect
  }
})();
module.exports = ws
