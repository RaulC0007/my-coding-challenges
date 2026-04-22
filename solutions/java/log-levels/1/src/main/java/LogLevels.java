public class LogLevels {
    
    public static String message(String logLine) {
        // Find the colon, then extract and trim everything after it
        int colonIndex = logLine.indexOf(':');
        return logLine.substring(colonIndex + 1).trim();
    }

    public static String logLevel(String logLine) {
        // Extract text between [ and ], then convert to lowercase
        int startIndex = logLine.indexOf('[') + 1;
        int endIndex = logLine.indexOf(']');
        return logLine.substring(startIndex, endIndex).toLowerCase();
    }

    public static String reformat(String logLine) {
        // Combine message and log level in new format
        return message(logLine) + " (" + logLevel(logLine) + ")";
    }
}