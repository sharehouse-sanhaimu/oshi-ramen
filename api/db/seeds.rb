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
portions = ["少なめ", "普通", "多め", "大盛り", "特盛"]
noodle_textures = ["やわらかい", "普通", "少し硬め", "硬め", "バリカタ"]
noodle_thicknesses = ["極細", "細麺", "中細麺", "中太麺", "極太"]
soup_richnesses = ["あっさり", "ややあっさり", "普通", "こってり", "超こってり"]

deliciousness_levels.each do |level|
  Deliciousness.find_or_create_by!(notation: level)
end

portions.each do |portion|
  Portion.find_or_create_by!(notation: portion)
end

noodle_textures.each do |texture|
  NoodleTexture.find_or_create_by!(notation: texture)
end

noodle_thicknesses.each do |thickness|
  NoodleThickness.find_or_create_by!(notation: thickness)
end

soup_richnesses.each do |richness|
  SoupRichness.find_or_create_by!(notation: richness)
end

puts "Seed data inserted successfully!"
