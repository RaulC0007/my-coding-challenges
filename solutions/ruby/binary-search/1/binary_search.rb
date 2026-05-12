class BinarySearch
  def initialize(list)
    @list = list
  end

  # Cambiamos 'find' por 'search_for' para coincidir con los tests
  def search_for(target)
    left = 0
    right = @list.length - 1

    while left <= right
      mid = (left + right) / 2
      middle_element = @list[mid]

      if middle_element == target
        return mid
      elsif middle_element < target
        left = mid + 1
      else
        right = mid - 1
      end
    end

    nil
  end
end