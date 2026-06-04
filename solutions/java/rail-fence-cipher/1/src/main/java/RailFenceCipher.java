class RailFenceCipher {
    private final int rows;

    RailFenceCipher(int rows) {
        this.rows = rows;
    }

    String getEncryptedData(String message) {
        // A fence with 1 or fewer rails doesn't change the message
        if (rows <= 1) {
            return message;
        }
        
        StringBuilder[] fences = new StringBuilder[rows];
        for (int i = 0; i < rows; i++) {
            fences[i] = new StringBuilder();
        }
        
        int currentRow = 0;
        int direction = 1; // 1 for moving down, -1 for moving up
        
        // Simulate the zig-zag pattern to distribute characters
        for (char c : message.toCharArray()) {
            fences[currentRow].append(c);
            
            // Change direction at the top and bottom rails
            if (currentRow == 0) {
                direction = 1;
            } else if (currentRow == rows - 1) {
                direction = -1;
            }
            currentRow += direction;
        }
        
        // Concatenate all rows to form the ciphertext
        StringBuilder result = new StringBuilder();
        for (StringBuilder fence : fences) {
            result.append(fence);
        }
        
        return result.toString();
    }

    String getDecryptedData(String message) {
        if (rows <= 1) {
            return message;
        }
        
        int n = message.length();
        int[] rowLengths = new int[rows];
        
        int currentRow = 0;
        int direction = 1;
        
        // Step 1: Figure out how many characters belong to each row
        for (int i = 0; i < n; i++) {
            rowLengths[currentRow]++;
            if (currentRow == 0) {
                direction = 1;
            } else if (currentRow == rows - 1) {
                direction = -1;
            }
            currentRow += direction;
        }
        
        // Step 2: Split the ciphertext into its respective rows
        String[] rowStrings = new String[rows];
        int index = 0;
        for (int i = 0; i < rows; i++) {
            rowStrings[i] = message.substring(index, index + rowLengths[i]);
            index += rowLengths[i];
        }
        
        // Step 3: Read the characters back in the original zig-zag order
        int[] rowIndices = new int[rows]; // Tracks which character to pull next from each row
        StringBuilder result = new StringBuilder();
        currentRow = 0;
        direction = 1;
        
        for (int i = 0; i < n; i++) {
            result.append(rowStrings[currentRow].charAt(rowIndices[currentRow]));
            rowIndices[currentRow]++;
            
            if (currentRow == 0) {
                direction = 1;
            } else if (currentRow == rows - 1) {
                direction = -1;
            }
            currentRow += direction;
        }
        
        return result.toString();
    }
}