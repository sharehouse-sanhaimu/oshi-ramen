class AddKeyToRamen < ActiveRecord::Migration[8.0]
  def change
    add_column :ramen, :key, :string
  end
end
