class ZebraPuzzle
  private_class_method :new

  def self.water_drinker
    RESULT[0]
  end

  def self.zebra_owner
    RESULT[1]
  end

  private

  def solve_puzzle
    # Las variables serán índices 0-4 (posición de la casa)
    [0, 1, 2, 3, 4].permutation do |eng, spa, ukr, nor, jap|
      next unless nor == 0                    # 10. Norwegian en casa 0

      [0, 1, 2, 3, 4].permutation do |red, green, ivory, yellow, blue|
        next unless eng == red                # 2. Englishman en casa roja
        next unless green == ivory + 1        # 6. Green a la derecha de Ivory
        next unless (nor - blue).abs == 1   # 15. Norwegian junto a Blue

        [0, 1, 2, 3, 4].permutation do |coffee, tea, milk, oj, water|
          next unless milk == 2               # 9. Leche en el centro (casa 2)
          next unless green == coffee         # 4. Green casa bebe Coffee
          next unless ukr == tea              # 5. Ukrainian bebe Tea

          [0, 1, 2, 3, 4].permutation do |dancing, painting, reading, football, chess|
            next unless yellow == painting    # 8. Yellow casa es Painter
            next unless oj == football        # 13. OJ bebe Football
            next unless jap == chess          # 14. Japanese juega Chess

            [0, 1, 2, 3, 4].permutation do |dog, snail, fox, horse, zebra|
              next unless spa == dog          # 3. Spaniard tiene Dog
              next unless snail == dancing    # 7. Snail owner baila
              next unless (reading - fox).abs == 1   # 11. Reading junto a Fox
              next unless (painting - horse).abs == 1 # 12. Painting junto a Horse

              # Mapear posición -> nacionalidad
              pos_to_nation = {
                eng => 'Englishman',
                spa => 'Spaniard',
                ukr => 'Ukrainian',
                nor => 'Norwegian',
                jap => 'Japanese'
              }

              return [pos_to_nation[water], pos_to_nation[zebra]]
            end
          end
        end
      end
    end
  end

  RESULT = new.send(:solve_puzzle).freeze
end