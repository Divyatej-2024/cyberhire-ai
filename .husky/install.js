#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const path = require('path');

const hooksDir = path.join(process.cwd(), '.husky');

if (!fs.existsSync(hooksDir)) {
  fs.mkdirSync(hooksDir);
}

// pre-commit hook
const preCommitHook = `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint-staged
`;

fs.writeFileSync(path.join(hooksDir, 'pre-commit'), preCommitHook);
fs.chmodSync(path.join(hooksDir, 'pre-commit'), 0o755);

console.log('✅ Husky hooks installed');
