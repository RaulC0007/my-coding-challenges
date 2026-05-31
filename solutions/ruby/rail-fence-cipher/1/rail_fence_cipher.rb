class RailFenceCipher
  def self.encode(message, rails)
    return '' if message.empty?
    return message if rails <= 1

    # Agregamos con_index para usar la posición original como orden secundario
    rail_pattern(message.length, rails)
      .zip(message.chars)
      .each_with_index
      .sort_by { |(rail, _char), index| [rail, index] }
      .map { |(rail, char), index| char }
      .join
  end

  def self.decode(ciphertext, rails)
    return '' if ciphertext.empty?
    return ciphertext if rails <= 1

    positions = (0...ciphertext.length).to_a
    # Hacemos lo mismo aquí: ordenar por riel, y desempatar por el índice original
    decode_order = rail_pattern(ciphertext.length, rails)
      .zip(positions)
      .each_with_index
      .sort_by { |(rail, _pos), index| [rail, index] }
      .map { |(rail, pos), index| pos }

    result = Array.new(ciphertext.length)
    decode_order.zip(ciphertext.chars).each do |original_pos, char|
      result[original_pos] = char
    end

    result.join
  end

  private

  def self.rail_pattern(length, rails)
    pattern = (0...rails).to_a + (1...rails - 1).to_a.reverse
    pattern.cycle.take(length)
  end
end