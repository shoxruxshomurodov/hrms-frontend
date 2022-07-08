import {get} from "lodash";

const info = (  onSuccess = (certInfo) => {
}, signIn = false, onClose = () => {}) => {
  var ws = new WebSocket("ws://localhost:8181");
  ws.onopen = function() {
    var obj = { function: "getCertInfo", get: "get" };
    var msg = JSON.stringify(obj);
    ws.send(msg);
  };
  ws.onmessage = (evt) => {
    var received_msg = evt.data;
    try {
      var myObj = JSON.parse(received_msg);
    }catch (e){
      console.log('JSON PARSE ERROR')
    }

    if (myObj.status == "success") {
      if (!signIn) {
        onClose();
      }
      if (get(myObj, "certinfo", null)) {
        onSuccess(myObj);
        ws.close();
      }
    }
  };
};

const sign = (data, onSuccess = (signedMsg, certInfo) => {}) => {
  info((certInfo) => {
    var ws = new WebSocket("ws://localhost:8181");
    ws.onopen = function() {
      var obj = { function: "cryptoSign", obj: data };
      var msg = JSON.stringify(obj);
      ws.send(msg);
    };
    ws.onmessage = function(evt) {
      var received_msg = evt.data;
      try {
        var myObj = JSON.parse(received_msg);
      }catch (e){
        console.log('JSON PARSE ERROR')
      }
      if (myObj.status == "success") {
        if (get(myObj, "signedMsg", null)) {
          onSuccess(certInfo.certinfo,myObj.signedMsg);
        }
      }
    };
  });
};

export { info, sign };
