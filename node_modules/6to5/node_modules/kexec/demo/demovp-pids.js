var kexec = require('../')

console.log(process.pid+' - PID before exec')

kexec('sh', [ '-c', 'echo "$$ - PID after exec"' ] );

