import { spawn } from 'child_process';

const child = spawn('npx', [
  'create-next-app@latest',
  'my-next-app',
  '--typescript',
  '--eslint',
  '--tailwind',
  '--src-dir',
  '--app',
  '--import-alias',
  '@/*'
], {
  stdio: ['pipe', 'inherit', 'inherit']
});

// Automatically respond to prompts
child.stdin.write('Yes\n'); // For Turbopack
child.stdin.end();

child.on('close', (code) => {
  console.log(`create-next-app process exited with code ${code}`);
});