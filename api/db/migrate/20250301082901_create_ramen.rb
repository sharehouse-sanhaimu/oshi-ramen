class CreateRamen < ActiveRecord::Migration[8.0]
  def change
    create_table :ramen do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name
      t.string :shop_name
      t.string :image_url
      t.references :deliciousness, null: false, foreign_key: true
      t.references :portions, null: false, foreign_key: true
      t.references :noodle_texture, null: false, foreign_key: true
      t.references :noodle_thickness, null: false, foreign_key: true
      t.references :soup_richness, null: false, foreign_key: true
      t.integer :price
      t.string :description
      t.string :address

      t.timestamps
    end
  end
end
