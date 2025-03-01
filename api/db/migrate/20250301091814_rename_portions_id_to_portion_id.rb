class RenamePortionsIdToPortionId < ActiveRecord::Migration[8.0]
  def change
    rename_column :ramen, :portions_id, :portion_id
  end
end
