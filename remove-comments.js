// remove-comments.js
const fs = require('fs');

const files = [
    'src/App.js',
    'src/components/Bio.js', 
    'src/components/Contact.js',
    'src/components/Footer.js',
    'src/components/Header.js',
    'src/components/Home.js',
    'src/components/LoadingSpinner.js',
    'src/components/Media.js'
];

console.log('Removing problematic JSX comments...\n');

files.forEach(filePath => {
    if (fs.existsSync(filePath)) {
        console.log(`Cleaning: ${filePath}`);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Remove all {/* */} comments that were added
        const lines = content.split('\n');
        const cleanedLines = lines.filter(line => {
            const trimmed = line.trim();
            // Keep only non-JSX comments (// comments for imports, etc.)
            // Remove the problematic {/* */} comments
            return !trimmed.startsWith('{/*');
        });
        
        fs.writeFileSync(filePath, cleanedLines.join('\n'));
        console.log(`  ✓ Removed JSX comments from ${filePath}\n`);
    }
});

console.log('All files cleaned! Now the build should work.');
console.log('Run: npm run build');