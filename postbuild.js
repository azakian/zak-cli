import fs from 'fs';

const filePath = 'dist/index.js';
const shebang = '#!/usr/bin/env node\n';
const content = fs.readFileSync(filePath, 'utf8');

if (!content.startsWith(shebang)) {
    fs.writeFileSync(filePath, shebang + content, 'utf8');
    console.log('Shebang added successfully.');
}
