import { spawn } from 'child_process';
import { readFileSync } from 'fs';

const { name, version } = JSON.parse(readFileSync('./package.json'));

spawn(`tar -xzf ${name}-${version}.tgz`, { stdio: 'inherit', shell: true });
