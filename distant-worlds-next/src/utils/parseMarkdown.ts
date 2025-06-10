import { Planet } from '@/types/planet';

export function parseMarkdownToJSON(markdownText: string): Planet | null {
  const lines = markdownText.split('\n');
  let inFrontMatter = false;
  let frontMatterLines: string[] = [];
  let description = '';
  let lore = '';
  let extendedLore = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    
    if (trimmedLine === '---') {
      if (!inFrontMatter) {
        inFrontMatter = true;
        continue;
      } else {
        inFrontMatter = false;
        continue;
      }
    }
    
    if (inFrontMatter) {
      frontMatterLines.push(trimmedLine);
    } else if (trimmedLine.startsWith('## Description')) {
      // Get description content
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('##')) {
        if (lines[i].trim()) {
          description += lines[i].trim() + ' ';
        }
        i++;
      }
      i--; // Step back one line
    } else if (trimmedLine.startsWith('## Lore')) {
      // Get lore content
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('##')) {
        if (lines[i].trim()) {
          lore += lines[i].trim() + ' ';
        }
        i++;
      }
      i--; // Step back one line
    } else if (trimmedLine.startsWith('## Extended Lore')) {
      // Get extended lore content
      i++;
      while (i < lines.length && i < lines.length && !lines[i].trim().startsWith('##')) {
        if (lines[i].trim()) {
          extendedLore += lines[i].trim() + ' ';
        }
        i++;
      }
      i--; // Step back one line
    }
  }
  
  // Parse front matter
  const frontMatter: any = {};
  frontMatterLines.forEach(line => {
    if (line.includes(':') && !line.startsWith('-')) {
      const [key, ...valueParts] = line.split(':');
      const value = valueParts.join(':').trim();
      
      if (key.trim() === 'primary_resources' || key.trim() === 'scientific_interest') {
        frontMatter[key.trim()] = [];
      } else {
        frontMatter[key.trim()] = value;
      }
    } else if (line.startsWith('-') && line.includes(' ')) {
      const value = line.substring(1).trim();
      const lastKey = Object.keys(frontMatter).pop();
      if (lastKey && Array.isArray(frontMatter[lastKey])) {
        frontMatter[lastKey].push(value);
      }
    }
  });

  if (!frontMatter.planet_id) {
    return null;
  }
  
  return {
    ...frontMatter,
    description: description.trim(),
    lore: lore.trim(),
    extended_lore: extendedLore.trim(),
    price: calculatePrice(frontMatter.planet_id),
    claimed: false
  } as Planet;
}

function calculatePrice(planetId: string): number {
  const planetNumber = parseInt(planetId);
  return planetNumber; // Each subsequent planet costs $1 more
} 