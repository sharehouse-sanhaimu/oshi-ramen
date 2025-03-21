module V1
  class UsersController < ApplicationController
    def create
      user = User.find_by(google_id: params.require(:google_id))

      if user
        render json: ResponseDto.new(
          message: 'User already exists',
          data: { id: user.id }
        ), status: :ok
        return
      end

      user = post_create_params

      uploaded_file = GetImageFromUrl.call(user.icon_url)
      s3_result = UploadToS3.call(uploaded_file)
      user.icon_url = s3_result[:url]
      if user.save
        render json: ResponseDto.new(
          message: 'User created successfully',
          data: {
            id: user.id,
            url: user.icon_url
          }
        ), status: :created
      else
        render json: ResponseDto.new(
          message: 'User creation failed',
          data: { errors: user.errors.full_messages }
        ), status: :unprocessable_entity
      end
    end

    def show
      user = User.find_by(id: params[:id])

      if user
        render json: ResponseDto.new(
          message: 'User found successfully',
          data: user
        ), status: :ok
      else
        render json: ResponseDto.new(
          message: 'User not found',
          data: { errors: user.errors.full_messages } # 手動でエラーメッセージを設定
        ), status: :not_found
      end
    end

    # APIのリクエストパラメータを取得する関数
    #
    # @return [User] ボディパラメータ
    def post_create_params
      User.new(
      {
        google_id: params.require(:google_id),
        nickname: params[:nickname] || "",
        icon_url: params[:icon_url] || ""
      })
    end
  end
end
