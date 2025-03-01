class CreateNoodleTextures < ActiveRecord::Migration[8.0]
  def change
    create_table :noodle_textures do |t|
      t.string :notation

      t.timestamps
    end
  end
end
