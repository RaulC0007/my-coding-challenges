class Robot
    attr_reader :name
  
    # Al iniciar la clase, creamos el almacén de nombres disponibles
    @available_names = []
  
    def initialize
      reset
    end
  
    def reset
      # Si tenemos un nombre previo asignado, no hacemos nada (o podríamos reciclarlo)
      @name = self.class.take_name
    end
  
    # Genera el universo completo de 676,000 combinaciones, las mezcla y extrae una
    def self.take_name
      if @available_names.empty?
        # Generamos combinaciones AA000 a ZZ999 de forma masiva y eficiente
        letters = ('A'..'Z').to_a
        numbers = ('000'..'999').to_a
        
        # El método product combina todo y join los une. Al final mezclamos con shuffle
        @available_names = letters.product(letters, numbers).map(&:join).shuffle!
      end
  
      # .pop saca el último nombre de la lista en un instante sin repetir
      @available_names.pop
    end
  
    # Limpiador oficial de Exercism para reiniciar todo el historial entre pruebas
    def self.forget
      @available_names = []
    end
  end