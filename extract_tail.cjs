const fs = require('fs');
const js = fs.readFileSync('bundle.js', 'utf8');

// Let's inspect the entire JS file around Zi (from 400,000 to end)
const tail = js.substring(400000);
fs.writeFileSync('bundle_tail.js', tail);
console.log('Saved bundle_tail.js, length:', tail.length);
