def calculate_fuel(mass)
  fuel_required = (mass / 3) - 2
  return 0 if fuel_required <= 0

  fuel_required += calculate_fuel(fuel_required)
end

modules = File.readlines("modules.txt")

fuel_required = modules.reduce(0) do |fuel, module_mass|
  fuel += calculate_fuel(module_mass.to_i)

  fuel
end

puts fuel_required
