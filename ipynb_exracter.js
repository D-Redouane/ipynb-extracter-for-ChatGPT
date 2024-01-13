const fs = require('fs');

function extractMarkdownAndCode(ipynbFile) {
     const notebookContent = JSON.parse(fs.readFileSync(ipynbFile, 'utf8'));
 
     let pythonScript = '';
 
     notebookContent.cells.forEach((cell, index) => {
         if (cell.cell_type === 'markdown') {
             pythonScript += '\n\n\n\n\n\n\n';
             pythonScript += `# Markdown Cell ${index + 1}\n`;
             cell.source.forEach(line => {
                 pythonScript += `# ${line}\n`;
             });
         } else if (cell.cell_type === 'code') {
             if (pythonScript.trim() !== '') {
                 pythonScript += '\n\n';
             }
             pythonScript += `# Code Cell ${index + 1}\n`;
             pythonScript += cell.source.join('') + '\n';
         }
     });
 
     const pythonFileName = ipynbFile.replace('.ipynb', '_forchatGPT.py');
     fs.writeFileSync(pythonFileName, pythonScript, 'utf8');
 
     console.log(`Conversion complete. Python script saved as ${pythonFileName}`);
}

const ipynbFile = './test/TP1_Pr3_BAKTACHE_BELAKEHAL_DADDIOUAMER.ipynb';
extractMarkdownAndCode(ipynbFile);