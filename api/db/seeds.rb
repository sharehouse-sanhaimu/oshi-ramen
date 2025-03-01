# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
deliciousness_levels = ["まずい", "普通", "美味しい", "とても美味しい", "絶品"]

deliciousness_levels.each do |level|
  Deliciousness.find_or_create_by!(notation: level)
end
