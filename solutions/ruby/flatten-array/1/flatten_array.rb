class FlattenArray
  def self.flatten(array)
    # 1. El método .flatten de Ruby aplana el arreglo a cualquier profundidad por defecto.
    # 2. El método .compact elimina todos los elementos que sean 'nil'.
    array.flatten.compact
  end
end