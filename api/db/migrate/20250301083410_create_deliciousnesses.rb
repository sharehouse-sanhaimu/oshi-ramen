class CreateDeliciousnesses < ActiveRecord::Migration[8.0]
  def change
    create_table :deliciousnesses do |t|
      t.string :notation

      t.timestamps
    end
  end
end
