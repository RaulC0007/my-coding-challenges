module Chess
  RANKS = 1..8
  FILES = 'A'..'H'

  def self.valid_square?(rank, file)
    RANKS.include?(rank) && FILES.include?(file)
  end

  def self.nickname(first_name, last_name)
    first = first_name[0, 2].upcase
    last  = last_name[-2, 2].upcase
    first + last
  end

  def self.move_message(first_name, last_name, square)
    nick = nickname(first_name, last_name)

    # square is expected to be like "A1", "H8", etc.
    file = square[0]
    rank = square[1..].to_i

    if valid_square?(rank, file)
      "#{nick} moved to #{square}"
    else
      "#{nick} attempted to move to #{square}, but that is not a valid square"
    end
  end
end