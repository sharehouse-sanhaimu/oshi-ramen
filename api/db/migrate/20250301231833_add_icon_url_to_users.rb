class AddIconUrlToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :icon_url, :string, default: "", null: false
  end
end
