var kexec = null;

/*try {
  kexec = require("./build/default/kexec.node");
} catch(e) {*/
  kexec = require("./build/Release/kexec.node");
//}

module.exports = kexec.kexec; //function of kexec module is named kexec