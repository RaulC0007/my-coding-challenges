import java.util.List;
import java.util.ArrayList;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

class GrepTool {

    String grep(String pattern, List<String> flags, List<String> files) {
        boolean showLineNum = flags.contains("-n");
        boolean fileNamesOnly = flags.contains("-l");
        boolean caseInsensitive = flags.contains("-i");
        boolean invertMatch = flags.contains("-v");
        boolean matchEntireLine = flags.contains("-x");

        boolean multipleFiles = files.size() > 1;
        List<String> results = new ArrayList<>();

        for (String filePath : files) {
            try {
                List<String> lines = Files.readAllLines(Paths.get(filePath), StandardCharsets.UTF_8);
                boolean fileHasMatch = false;

                for (int i = 0; i < lines.size(); i++) {
                    String line = lines.get(i);
                    boolean matches = isMatch(line, pattern, caseInsensitive, matchEntireLine);

                    if (invertMatch) {
                        matches = !matches;
                    }

                    if (matches) {
                        fileHasMatch = true;
                        
                        // -l only needs the filename once, so we can stop scanning this file
                        if (fileNamesOnly) {
                            break;
                        }

                        StringBuilder sb = new StringBuilder();
                        if (multipleFiles) {
                            sb.append(filePath).append(":");
                        }
                        if (showLineNum) {
                            sb.append(i + 1).append(":");
                        }
                        sb.append(line);
                        results.add(sb.toString());
                    }
                }

                if (fileNamesOnly && fileHasMatch) {
                    results.add(filePath);
                }
            } catch (IOException e) {
                throw new RuntimeException("Failed to read file: " + filePath, e);
            }
        }

        return String.join("\n", results);
    }

    private boolean isMatch(String line, String pattern, boolean caseInsensitive, boolean matchEntireLine) {
        String lineCheck = caseInsensitive ? line.toLowerCase() : line;
        String patternCheck = caseInsensitive ? pattern.toLowerCase() : pattern;

        if (matchEntireLine) {
            return lineCheck.equals(patternCheck);
        } else {
            return lineCheck.contains(patternCheck);
        }
    }
}