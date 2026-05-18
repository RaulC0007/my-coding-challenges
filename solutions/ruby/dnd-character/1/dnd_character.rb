class DndCharacter
  # Creamos lectores para todas las habilidades y hitpoints
  attr_reader :strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma, :hitpoints

  # Método de clase para calcular el modificador
  def self.modifier(score)
    # Restamos 10, dividimos por 2.0 para forzar flotante y usamos .floor para redondear hacia abajo
    ((score - 10) / 2.0).floor
  end

  def initialize
    @strength = roll_ability
    @dexterity = roll_ability
    @constitution = roll_ability
    @intelligence = roll_ability
    @wisdom = roll_ability
    @charisma = roll_ability
    
    # HP = 10 + modificador de constitución
    @hitpoints = 10 + self.class.modifier(@constitution)
  end

  private

  def roll_ability
    # 1. Generamos 4 números aleatorios entre 1 y 6
    # 2. Los ordenamos de menor a mayor
    # 3. Quitamos el primero (el más bajo) con .last(3) o .drop(1)
    # 4. Sumamos los restantes
    Array.new(4) { rand(1..6) }.sort.last(3).sum
  end
end