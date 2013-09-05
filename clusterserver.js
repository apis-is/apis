//A plugin to manage our cluster, e.g. multiple running instances of same server
var clusterMaster = require("cluster-master");

var options = { 
    exec: "./server.js",
    size: require('os').cpus().length, //How many do we want?
    silent: false, //Stout for each process to the master
    signals: false, //Bind system signals SIGINT, SIGKILL...
    onMessage: function (msg) {
      console.error("Message from %s %j", this.uniqueID, msg)
    }
}

//Start up the cluster
clusterMaster(options);

//About to exit the master process, kill the cluster
process.on('exit', function() {
    clusterMaster.quit();
});