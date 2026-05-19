class ParallelLetterFrequency
  def self.count(texts)
    return {} if texts.empty?

    # 1. Usamos un número de hilos acorde a la carga
    # En entornos de test, 4-8 suele ser el límite para no generar lag de sistema
    num_threads = 4
    groups = texts.each_slice((texts.size / num_threads.to_f).ceil).to_a

    threads = groups.map do |batch|
      Thread.new do
        batch.each_with_object(Hash.new(0)) do |text, local_counts|
          # TRUCO DEFINITIVO:
          # gsub es más rápido que scan para "limpiar" si luego usamos each_char o tally
          # [^[:alpha:]] elimina todo lo que NO sea una letra (incluyendo kanjis, griegas, etc.)
          clean_text = text.downcase.gsub(/[^[:alpha:]]/, '')
          
          # tally es extremadamente rápido en C sobre arreglos de caracteres
          clean_text.each_char.tally.each do |char, count|
            local_counts[char] += count
          end
        end
      end
    end

    # 2. Reducción final (Merge)
    threads.each_with_object(Hash.new(0)) do |t, total|
      t.value.each { |char, count| total[char] += count }
    end
  end
end