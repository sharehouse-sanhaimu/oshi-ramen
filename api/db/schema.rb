# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_03_01_091814) do
  create_table "deliciousnesses", force: :cascade do |t|
    t.string "notation"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "noodle_textures", force: :cascade do |t|
    t.string "notation"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "noodle_thicknesses", force: :cascade do |t|
    t.string "notation"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "portions", force: :cascade do |t|
    t.string "notation"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ramen", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "name"
    t.string "shop_name"
    t.string "image_url"
    t.integer "deliciousness_id", null: false
    t.integer "portion_id", null: false
    t.integer "noodle_texture_id", null: false
    t.integer "noodle_thickness_id", null: false
    t.integer "soup_richness_id", null: false
    t.integer "price"
    t.string "description"
    t.string "address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["deliciousness_id"], name: "index_ramen_on_deliciousness_id"
    t.index ["noodle_texture_id"], name: "index_ramen_on_noodle_texture_id"
    t.index ["noodle_thickness_id"], name: "index_ramen_on_noodle_thickness_id"
    t.index ["portion_id"], name: "index_ramen_on_portion_id"
    t.index ["soup_richness_id"], name: "index_ramen_on_soup_richness_id"
    t.index ["user_id"], name: "index_ramen_on_user_id"
  end

  create_table "soup_richnesses", force: :cascade do |t|
    t.string "notation"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "google_id"
    t.string "nickname"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "ramen", "deliciousnesses"
  add_foreign_key "ramen", "noodle_textures"
  add_foreign_key "ramen", "noodle_thicknesses"
  add_foreign_key "ramen", "portions"
  add_foreign_key "ramen", "soup_richnesses"
  add_foreign_key "ramen", "users"
end
