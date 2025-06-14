const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Function to extract content from files
async function extractContent() {
  // Define directories to scan for content
  const contentDirs = [
    'app/**/page.tsx',
    'app/**/*.tsx',
    'components/**/*.tsx',
  ];

  const knowledgeBase = [];
  let id = 1;

  // Process each glob pattern
  for (const pattern of contentDirs) {
    const files = glob.sync(pattern);
    
    for (const file of files) {
      try {
        // Read file content
        const content = fs.readFileSync(file, 'utf8');
        
        // Extract text content (this is a simple extraction, can be improved)
        let textContent = content
          // Extract content from JSX
          .replace(/<[^>]*>/g, ' ')
          // Extract string literals
          .match(/"([^"]*)"|'([^']*)'|`([^`]*)`/g) || [];
        
        textContent = textContent
          .map(str => str.replace(/^["'`]|["'`]$/g, ''))
          .filter(str => 
            str.length > 20 && 
            !str.startsWith('import') && 
            !str.includes('className') &&
            !str.includes('px-') &&
            !str.includes('bg-')
          )
          .join(' ');
        
        // Remove extra whitespace
        textContent = textContent.replace(/\s+/g, ' ').trim();
        
        if (textContent.length > 50) {
          // Get the route from the file path
          let route = file.replace(/^app/, '').replace(/\/(page|layout|loading)\.tsx$/, '');
          if (!route.startsWith('/')) route = '/' + route;
          
          knowledgeBase.push({
            id: id++,
            path: file,
            route: route,
            content: textContent
          });
        }
      } catch (error) {
        console.error(`Error processing ${file}:`, error);
      }
    }
  }

  // Save the knowledge base
  fs.writeFileSync(
    path.join(__dirname, '../public/knowledge-base.json'),
    JSON.stringify(knowledgeBase, null, 2)
  );

  console.log(`Extracted ${knowledgeBase.length} content chunks to knowledge-base.json`);
}

extractContent().catch(console.error); 