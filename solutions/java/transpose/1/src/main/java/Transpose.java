public class Transpose {
    public String transpose(String toTranspose) {
        if (toTranspose == null || toTranspose.isEmpty()) {
            return toTranspose == null ? "" : toTranspose;
        }
        
        // Split by newline, keeping trailing empty strings if they exist
        String[] rows = toTranspose.split("\n", -1);
        
        // Find the maximum length among all rows to determine the number of output rows
        int maxLength = 0;
        for (String row : rows) {
            if (row.length() > maxLength) {
                maxLength = row.length();
            }
        }
        
        // If all rows are empty, the transposed result is also empty
        if (maxLength == 0) {
            return "";
        }
        
        StringBuilder[] transposed = new StringBuilder[maxLength];
        for (int i = 0; i < maxLength; i++) {
            transposed[i] = new StringBuilder();
        }
        
        // Process each column of the input to form a row in the output
        for (int c = 0; c < maxLength; c++) {
            // Find the last row that has a character at this column index
            int maxR = -1;
            for (int r = rows.length - 1; r >= 0; r--) {
                if (rows[r].length() > c) {
                    maxR = r;
                    break;
                }
            }
            
            // Build the transposed row up to maxR
            for (int r = 0; r <= maxR; r++) {
                if (rows[r].length() > c) {
                    transposed[c].append(rows[r].charAt(c));
                } else {
                    // Pad with space if a previous row is shorter, but a later row has a character here
                    transposed[c].append(' ');
                }
            }
        }
        
        // Join the transposed rows with newline characters
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < maxLength; i++) {
            result.append(transposed[i]);
            if (i < maxLength - 1) {
                result.append("\n");
            }
        }
        
        return result.toString();
    }
}