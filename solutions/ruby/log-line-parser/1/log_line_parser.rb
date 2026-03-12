class LogLineParser
  def initialize(line)
    @line = line
  end

  # Task 1: Get message from a log line
  def message
    @line.split(']: ').last.strip
  end

  # Task 2: Get log level from a log line
  def log_level
    @line.split(']: ').first.gsub('[', '').downcase
  end

  # Task 3: Reformat a log line
  def reformat
    "#{message} (#{log_level})"
  end
end