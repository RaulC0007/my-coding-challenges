class RunLengthEncoding {

    String encode(String data) {
        if (data == null || data.isEmpty()) {
            return "";
        }
        
        StringBuilder encoded = new StringBuilder();
        int count = 1;
        
        for (int i = 1; i < data.length(); i++) {
            if (data.charAt(i) == data.charAt(i - 1)) {
                count++;
            } else {
                if (count > 1) {
                    encoded.append(count);
                }
                encoded.append(data.charAt(i - 1));
                count = 1;
            }
        }
        
        // Append the final character group
        if (count > 1) {
            encoded.append(count);
        }
        encoded.append(data.charAt(data.length() - 1));
        
        return encoded.toString();
    }

    String decode(String data) {
        StringBuilder decoded = new StringBuilder();
        int count = 0;
        
        for (int i = 0; i < data.length(); i++) {
            char c = data.charAt(i);
            if (c >= '0' && c <= '9') {
                // Build multi-digit count
                count = count * 10 + (c - '0');
            } else {
                // Default to 1 if no count was specified
                int repeat = count == 0 ? 1 : count;
                for (int j = 0; j < repeat; j++) {
                    decoded.append(c);
                }
                count = 0; // Reset for next group
            }
        }
        
        return decoded.toString();
    }
}