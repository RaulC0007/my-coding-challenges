class LocomotiveEngineer
  def self.generate_list_of_wagons(*wagons)
    wagons
  end

  def self.fix_list_of_wagons(each_wagons_id, missing_wagons)
    # Find position of locomotive (always 1)
    loco_index = each_wagons_id.index(1)

    # The two wagons immediately before the locomotive are the ones to move to end
    to_move = each_wagons_id[loco_index - 2, 2]   # [index-2, index-1]

    # Everything after locomotive stays in place (after inserted missing wagons)
    after_loco = each_wagons_id[loco_index + 1..-1]

    # Rebuild:
    # 1 + missing wagons + wagons after 1 + the two moved wagons
    [1, *missing_wagons, *after_loco, *to_move]
  end

  def self.add_missing_stops(route, **stops_keywords)
    stop_cities = stops_keywords
      .sort_by { |k, _| k.to_s[/\d+/].to_i }
      .map { |_, city| city }

    { **route, stops: stop_cities }
  end

  def self.extend_route_information(route, more_route_information)
    { **route, **more_route_information }
  end
end