class CreatePortions < ActiveRecord::Migration[8.0]
  def change
    create_table :portions do |t|
      t.string :notation

      t.timestamps
    end
  end
end
