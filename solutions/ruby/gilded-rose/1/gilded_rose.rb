Item = Struct.new(:name, :sell_in, :quality)

class GildedRose
  def initialize(items)
    @items = items
  end

  def update!
    @items.each do |item|
      updater_for(item).update(item)
    end
  end

  private

  # Fábrica dinámica corregida con Regex insensibles a mayúsculas/minúsculas (/i)
  def updater_for(item)
    return SulfurasUpdater.new if item.name.match?(/sulfuras/i)
    
    if item.name.match?(/aged brie/i)
      AgedBrieUpdater.new(conjured: conjured?(item))
    elsif item.name.match?(/backstage passes/i)
      BackstagePassesUpdater.new(conjured: conjured?(item))
    else
      NormalItemUpdater.new(conjured: conjured?(item))
    end
  end

  def conjured?(item)
    item.name.downcase.include?("conjured")
  end
end

# --- Estrategias de Actualización (Updaters) ---

class BaseUpdater
  def initialize(conjured: false)
    @conjured = conjured
  end

  def update(item)
    update_quality(item)
    update_expiry(item)
    clamp_quality(item)
  end

  protected

  def update_expiry(item)
    item.sell_in -= 1
  end

  def clamp_quality(item)
    item.quality = 0 if item.quality < 0
    unless item.name.match?(/sulfuras/i)
      item.quality = 50 if item.quality > 50
    end
  end
end

# 1. Ítems Normales
class NormalItemUpdater < BaseUpdater
  def update_quality(item)
    if item.sell_in <= 0
      item.quality = @conjured ? 0 : item.quality - 2
    else
      item.quality -= @conjured ? 2 : 1
    end
  end
end

# 2. Aged Brie
class AgedBrieUpdater < BaseUpdater
  def update_quality(item)
    if item.sell_in <= 0
      item.quality = @conjured ? 0 : item.quality + 2
    else
      # El Aged Brie conjurado que no ha vencido aumenta normalmente (+1)
      item.quality += 1
    end
  end
end

# 3. Backstage Passes
class BackstagePassesUpdater < BaseUpdater
  def update_quality(item)
    if item.sell_in <= 0
      item.quality = 0
    else
      base_increase = 1
      base_increase = 2 if item.sell_in <= 10
      base_increase = 3 if item.sell_in <= 5
      
      # Los pases conjurados aumentan 1 menos que los pases normales
      base_increase -= 1 if @conjured
      
      item.quality += base_increase
    end
  end
end

# 4. Sulfuras
class SulfurasUpdater < BaseUpdater
  def update(item)
    if item.name.downcase.include?("conjured")
      if item.sell_in <= 0
        item.quality = 0
      end
      item.sell_in -= 1
    end
    # El Sulfuras normal no altera sus valores
  end
end