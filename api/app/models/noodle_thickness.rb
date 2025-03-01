class NoodleThickness < ApplicationRecord
  has_many :ramen, class_name: "Ramen"
end
