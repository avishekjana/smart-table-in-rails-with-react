class Api::V1::ProductsController < ApplicationController
  def index
    _sortable = params[:sort].present? ? "#{params[:sort]} #{sort_direction}" : 'created_at desc'
    @page = params[:page] || 1
    @per = params[:per] || 10
    @products = Product.order(_sortable)
    @total_items = @products.count
    @products  = @products.page(@page).per(@per)
  end
end