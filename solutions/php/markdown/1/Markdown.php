<?php
declare(strict_types=1);

function parseMarkdown(string $markdown): string
{
    $lines = explode("\n", $markdown);
    $result = [];
    $inList = false;
    
    foreach ($lines as $line) {
        // Headers
        if (preg_match('/^#{1,6}\s*(.*)/', $line, $matches)) {
            $level = min(6, strlen(strtok($line, ' ')));
            $content = trim($matches[1]);
            $line = "<h$level>$content</h$level>";
        }
        
        // List items
        elseif (preg_match('/^\*\s*(.*)/', $line, $matches)) {
            $content = processInlineMarkdown(trim($matches[1]));
            if (!$inList) {
                $result[] = '<ul>';
                $inList = true;
            }
            // Wrap in <p> if no bold/italic
            if (strpos($content, '<em>') === false && strpos($content, '<i>') === false) {
                $content = "<p>$content</p>";
            }
            $line = "<li>$content</li>";
        }
        
        // Not a list item
        else {
            if ($inList) {
                $result[] = '</ul>';
                $inList = false;
            }
            $line = processInlineMarkdown($line);
            // Wrap in paragraph if not a header
            if (!preg_match('/^<h[1-6]>/', $line)) {
                $line = "<p>$line</p>";
            }
        }
        
        $result[] = $line;
    }
    
    if ($inList) {
        $result[] = '</ul>';
    }
    
    return implode($result);
}

function processInlineMarkdown(string $text): string
{
    // Bold: __text__ -> <em>
    $text = preg_replace('/__(.*?)__/s', '<em>$1</em>', $text);
    // Italic: _text_ -> <i>
    $text = preg_replace('/_(.*?)_/s', '<i>$1</i>', $text);
    return $text;
}
?>