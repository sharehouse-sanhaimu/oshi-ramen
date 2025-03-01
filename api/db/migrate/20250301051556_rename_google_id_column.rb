class RenameGoogleIdColumn < ActiveRecord::Migration[8.0]
  def change
    rename_column :users, :googleId, :google_id
  end
end
