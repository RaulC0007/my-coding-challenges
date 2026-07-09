// Helper function to wrap text in HTML tags
function wrap(text, tag) {
  return `<${tag}>${text}</${tag}>`;
}

// Helper function to check if text starts with a specific HTML tag
function isTag(text, tag) {
  return text.startsWith(`<${tag}>`);
}

// Parser for inline formatting (bold, italic)
function parseInlineFormatting(markdown, delimiter, tag) {
  const pattern = new RegExp(`${delimiter}(.+)${delimiter}`);
  const replacement = `<${tag}>$1</${tag}>`;
  return markdown.replace(pattern, replacement);
}

// Parse bold text (__text__)
function parseBold(markdown) {
  return parseInlineFormatting(markdown, '__', 'strong');
}

// Parse italic text (_text_)
function parseItalic(markdown) {
  return parseInlineFormatting(markdown, '_', 'em');
}

// Parse inline formatting (both bold and italic)
function parseInline(markdown) {
  return parseItalic(parseBold(markdown));
}

// Parse a header line
function parseHeader(line) {
  let count = 0;
  for (let i = 0; i < line.length; i++) {
    if (line[i] === '#') {
      count++;
    } else {
      break;
    }
  }
  
  // Header must have 1-6 # and a space after
  if (count === 0 || count > 6 || line[count] !== ' ') {
    return null;
  }
  
  const headerTag = `h${count}`;
  const headerContent = line.substring(count + 1);
  const formattedContent = parseInline(headerContent);
  return wrap(formattedContent, headerTag);
}

// Parse a list item (starts with *)
function parseListItem(line) {
  if (!line.startsWith('*')) {
    return null;
  }
  
  const content = line.substring(2); // Remove '* '
  const formattedContent = parseInline(content);
  return wrap(formattedContent, 'li');
}

// Parse a paragraph line
function parseParagraph(line) {
  const formattedContent = parseInline(line);
  return wrap(formattedContent, 'p');
}

// Process a single line with state tracking
function processLine(line, inList) {
  // Try to parse as header
  const headerHtml = parseHeader(line);
  if (headerHtml !== null) {
    // Close list if we were in one
    if (inList) {
      return { html: `</ul>${headerHtml}`, inList: false };
    }
    return { html: headerHtml, inList: false };
  }
  
  // Try to parse as list item
  const listItemHtml = parseListItem(line);
  if (listItemHtml !== null) {
    if (inList) {
      return { html: listItemHtml, inList: true };
    }
    return { html: `<ul>${listItemHtml}`, inList: true };
  }
  
  // Parse as paragraph
  const paragraphHtml = parseParagraph(line);
  if (inList) {
    return { html: `</ul>${paragraphHtml}`, inList: false };
  }
  return { html: paragraphHtml, inList: false };
}

// Main parser function
export function parse(markdown) {
  const lines = markdown.split('\n');
  let result = '';
  let inList = false;
  
  for (const line of lines) {
    // Skip empty lines
    if (line.trim() === '') {
      continue;
    }
    
    const { html, inList: newInList } = processLine(line, inList);
    result += html;
    inList = newInList;
  }
  
  // Close list if we ended in one
  if (inList) {
    result += '</ul>';
  }
  
  return result;
}