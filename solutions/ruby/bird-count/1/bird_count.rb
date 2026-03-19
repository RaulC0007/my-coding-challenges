class BirdCount
  LAST_WEEK_COUNTS = [0, 2, 5, 3, 7, 8, 4].freeze

  def self.last_week
    LAST_WEEK_COUNTS
  end

  def initialize(birds_per_day)
    @birds_per_day = birds_per_day
  end

  def yesterday
    @birds_per_day[-2]   # second-to-last element
  end

  def total
    @birds_per_day.sum
  end

  def busy_days
    @birds_per_day.count { |count| count >= 5 }
  end

  def day_without_birds?
    @birds_per_day.include?(0)
    # or: @birds_per_day.any?(&:zero?)
  end
end