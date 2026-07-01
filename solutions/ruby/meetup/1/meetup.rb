require 'date'

class Meetup
  def initialize(month, year)
    @month = month
    @year = year
  end

  def day(weekday, week)
    # 1. Determinamos los límites del rango de días a evaluar
    start_day, end_day = case week
                         when :first  then [1, 7]
                         when :second then [8, 14]
                         when :third  then [15, 21]
                         when :fourth then [22, 28]
                         when :teenth then [13, 19]
                         when :last
                           # Para :last, buscamos el último día del mes (día -1 en Date)
                           last_day_of_month = Date.new(@year, @month, -1).day
                           [last_day_of_month - 6, last_day_of_month]
                         end

    # 2. Generamos las fechas reales dentro de ese rango
    possible_dates = (start_day..end_day).map { |d| Date.new(@year, @month, d) }

    # 3. Filtramos la fecha que coincida con el método dinámico (ej. :monday? o :sunday?)
    # El método de consulta termina en '?', ej: :monday -> :monday?
    query_method = "#{weekday}?".to_sym

    possible_dates.find { |date| date.send(query_method) }
  end
end