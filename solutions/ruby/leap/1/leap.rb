class Year
  def self.leap?(year)
    # Un año es bisiesto si:
    # (Es divisible por 4 Y NO por 100) O (Es divisible por 400)
    (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)
  end
end