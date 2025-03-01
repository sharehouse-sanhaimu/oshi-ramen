class Portion < ApplicationRecord
  has_many :ramen, class_name: "Ramen"
end
