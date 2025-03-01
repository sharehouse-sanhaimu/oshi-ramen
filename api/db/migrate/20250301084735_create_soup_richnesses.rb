class CreateSoupRichnesses < ActiveRecord::Migration[8.0]
  def change
    create_table :soup_richnesses do |t|
      t.string :notation

      t.timestamps
    end
  end
end
