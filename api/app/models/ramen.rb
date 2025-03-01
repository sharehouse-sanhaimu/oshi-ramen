class Ramen < ApplicationRecord
  belongs_to :user
  belongs_to :deliciousness
  belongs_to :portion
  belongs_to :noodle_texture
  belongs_to :noodle_thickness
  belongs_to :soup_richness
end
