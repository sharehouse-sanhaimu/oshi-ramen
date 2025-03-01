# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
deliciousness_levels = ["まずい", "そこそこ", "普通", "美味しい", "絶品"]
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

# ユーザーの仮データ（ユーザーが存在しないとエラーになるため）
user = User.first || User.create!(google_id: "test1", nickname: "テストユーザー")

# 各テーブルのIDを取得
deliciousness = Deliciousness.find_by(notation: "美味しい")
noodle_texture = NoodleTexture.find_by(notation: "普通")
noodle_thickness = NoodleThickness.find_by(notation: "中細麺")
portion = Portion.find_by(notation: "普通")
soup_richness = SoupRichness.find_by(notation: "普通")

# `ramen` テーブルにデータを投入
Ramen.find_or_create_by!(
  user_id: user.id,
  name: "醤油ラーメン",
  store_name: "ラーメン一番",
  image_url: "https://example.com/ramen.jpg",
  key: "77ramen.jpg",
  deliciousness_id: deliciousness.id,
  noodle_texture_id: noodle_texture.id,
  noodle_thickness_id: noodle_thickness.id,
  portion_id: portion.id,
  soup_richness_id: soup_richness.id,
  price: 800,
  description: "昔ながらのあっさり醤油ラーメン。",
  address: "東京都新宿区1-1-1"
)

puts "Seed data inserted successfully!"
