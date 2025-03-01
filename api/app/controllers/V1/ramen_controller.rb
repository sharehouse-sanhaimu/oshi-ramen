module V1
  class RamenController < ApplicationController
    def create
      ramen = post_create_params
      user = User.find_by(id: ramen.user_id)
      unless user
        render json: ResponseDto.new(
          message: 'The user does not exist',
          data: { id: ramen.user_id }
        ), status: :unprocessable_entity
        return
      end

      if ramen.save
        render json: ResponseDto.new(
          message: 'Post created successfully',
          data: {
            id: ramen.id
          }
        ), status: :created
      else
        render json: ResponseDto.new(
          message: 'post creation failed',
          data: { errors: user.errors.full_messages }
        ), status: :unprocessable_entity
      end
    end

    # APIのリクエストパラメータを取得する関数
    #
    # @return [User] ボディパラメータ
    def post_create_params
      Ramen.new(
        {
          user_id: params.require(:user_id),
          name: params[:ramen_name] || "",
          shop_name: params[:store_name] || "",
          image_url: params[:file] || "",
          deliciousness_id: params[:delicious].to_i.presence || "",
          portion_id: params[:portion].to_i.presence || "",
          noodle_texture_id: params[:texture].to_i.presence || "",
          noodle_thickness_id: params[:thick].to_i.presence || "",
          soup_richness_id: params[:soup].to_i.presence || "",
          price: 0,
          description: "",
          address: ""
        })
    end
  end
end