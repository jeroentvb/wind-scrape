const { name, version } = require('../package.json');
const { spawn } = require('child_process');

spawn(`tar -xzf ${name}-${version}.tgz`, { stdio: 'inherit', shell: true });
