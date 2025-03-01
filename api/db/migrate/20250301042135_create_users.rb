class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :googleId
      t.string :nickname

      t.timestamps
    end
  end
end
