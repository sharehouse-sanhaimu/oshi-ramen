class RenameShopNameToStoreNameInRamens < ActiveRecord::Migration[8.0]
  def change
    rename_column :ramen, :shop_name, :store_name
    #Ex:- rename_column("admin_users", "pasword","hashed_pasword")
  end
end
