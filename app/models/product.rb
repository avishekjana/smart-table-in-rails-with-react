class Product < ApplicationRecord
  validates :name, presence: true

  scope :by_is_active, lambda {|state| where(["products.is_active=?", state])}

  def self.search(search)
    if search
      q = "%#{search}%"
      where('lower(name) LIKE ?',q.downcase)
    else
      scoped
    end
  end
end
