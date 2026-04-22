public class LogLine {
    private final String logLine;
    
    public LogLine(String logLine) {
        this.logLine = logLine;
    }
    
    public LogLevel getLogLevel() {
        int start = logLine.indexOf('[') + 1;
        int end = logLine.indexOf(']');
        if (start == 0 || end == -1) {
            return LogLevel.UNKNOWN;
        }
        String abbreviation = logLine.substring(start, end);
        return LogLevel.fromAbbreviation(abbreviation);
    }
    
    public String getOutputForShortLog() {
        LogLevel level = getLogLevel();
        int colonIndex = logLine.indexOf(':');
        String message = logLine.substring(colonIndex + 1).trim();
        return level.getEncodedLevel() + ":" + message;
    }
}