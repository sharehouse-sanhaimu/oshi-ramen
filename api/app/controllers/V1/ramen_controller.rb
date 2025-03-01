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
            id: ramen.id,
            url: ramen.image_url
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
      file = params[:file]
      s3_data = file.present? ? UploadToS3.call(file) : {key: "", image_url: ""}
      Ramen.new(
        {
          user_id: params.require(:user_id),
          name: params[:name] || "",
          store_name: params[:store_name] || "",
          image_url: s3_data[:url],
          key: s3_data[:key],
          deliciousness_id: params[:deliciousness_id].to_i.presence || "",
          portion_id: params[:portion_id].to_i.presence || "",
          noodle_texture_id: params[:noodle_texture_id].to_i.presence || "",
          noodle_thickness_id: params[:noodle_thickness_id].to_i.presence || "",
          soup_richness_id: params[:soup_richness_id].to_i.presence || "",
          price: 0,
          description: "",
          address: ""
        })
    end
  end
end