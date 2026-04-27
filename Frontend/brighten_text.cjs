const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? 
            walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const replaceMap = {
    'text-white/40': 'text-white/60',
    'text-white/50': 'text-white/70',
    'text-white/60': 'text-white/80',
    'text-white/70': 'text-white/90',
    'text-white/75': 'text-white',
    'text-white/80': 'text-white/90'
};

walkDir('./src', function(filePath) {
    if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let newContent = content;
        
        for (const [key, value] of Object.entries(replaceMap)) {
            const regex = new RegExp(key.replace('/', '\\/'), 'g');
            newContent = newContent.replace(regex, value);
        }

        // Also change some specific very dark text colors from #1b1b1b or similar if any exist and need to be lighter? 
        // No, the issue is text-white with low opacity.
        // 

        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Updated ${filePath}`);
        }
    }
});
