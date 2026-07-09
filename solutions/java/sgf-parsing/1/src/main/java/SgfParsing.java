import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SgfParsing {
    private String input;
    private int pos;

    public SgfNode parse(String input) throws SgfParsingException {
        this.input = input;
        this.pos = 0;
        
        if (input == null || input.isEmpty() || input.charAt(0) != '(') {
            throw new SgfParsingException("tree missing");
        }
        
        return parseTree();
    }

    private SgfNode parseTree() throws SgfParsingException {
        if (pos >= input.length() || input.charAt(pos) != '(') {
            throw new SgfParsingException("tree missing");
        }
        pos++; // skip '('
        
        SgfNode node = parseNode();
        
        if (pos >= input.length() || input.charAt(pos) != ')') {
            throw new SgfParsingException("tree missing");
        }
        pos++; // skip ')'
        
        return node;
    }

    private SgfNode parseNode() throws SgfParsingException {
        if (pos >= input.length() || input.charAt(pos) != ';') {
            throw new SgfParsingException("tree with no nodes");
        }
        pos++; // skip ';'
        
        Map<String, List<String>> properties = new HashMap<>();
        
        // Parse properties
        while (pos < input.length() && Character.isLetter(input.charAt(pos))) {
            String key = parseKey();
            
            // 🔧 FIX 2: Check if the ENTIRE key is uppercase, not just the first character
            if (!key.equals(key.toUpperCase())) {
                throw new SgfParsingException("property must be in uppercase");
            }
            
            List<String> values = new ArrayList<>();
            
            if (pos >= input.length() || input.charAt(pos) != '[') {
                throw new SgfParsingException("properties without delimiter");
            }
            
            while (pos < input.length() && input.charAt(pos) == '[') {
                values.add(parseValue());
            }
            properties.put(key, values);
        }
        
        // 🔧 FIX 1: Removed the "properties.isEmpty()" check. 
        // Nodes without properties are valid in SGF (e.g., "(;)").

        SgfNode node = new SgfNode(properties);
        
        // Parse children (can be subtrees or single nodes)
        while (pos < input.length()) {
            if (input.charAt(pos) == '(') {
                node.appendChild(parseTree());
            } else if (input.charAt(pos) == ';') {
                node.appendChild(parseNode());
            } else {
                break;
            }
        }
        
        return node;
    }

    private String parseKey() throws SgfParsingException {
        int start = pos;
        while (pos < input.length() && Character.isLetter(input.charAt(pos))) {
            pos++;
        }
        return input.substring(start, pos);
    }

    private String parseValue() throws SgfParsingException {
        if (pos >= input.length() || input.charAt(pos) != '[') {
            throw new SgfParsingException("properties without delimiter");
        }
        pos++; // skip '['
        
        StringBuilder sb = new StringBuilder();
        while (pos < input.length() && input.charAt(pos) != ']') {
            char c = input.charAt(pos);
            if (c == '\\') {
                pos++;
                if (pos >= input.length()) {
                    throw new SgfParsingException("unclosed value");
                }
                char next = input.charAt(pos);
                if (next == '\n') {
                    // Newlines are removed if they come immediately after a \
                } else if (Character.isWhitespace(next)) {
                    sb.append(' ');
                } else {
                    sb.append(next);
                }
            } else if (c == '\t') {
                sb.append(' ');
            } else {
                sb.append(c);
            }
            pos++;
        }
        
        if (pos >= input.length()) {
            throw new SgfParsingException("unclosed value");
        }
        pos++; // skip ']'
        
        return sb.toString();
    }
}