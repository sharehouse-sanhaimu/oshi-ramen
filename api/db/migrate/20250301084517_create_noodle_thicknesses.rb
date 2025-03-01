class CreateNoodleThicknesses < ActiveRecord::Migration[8.0]
  def change
    create_table :noodle_thicknesses do |t|
      t.string :notation

      t.timestamps
    end
  end
end
