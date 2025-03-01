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

      if user.save
        render json: ResponseDto.new(
          message: 'User created successfully',
          data: {
            id: user.id
          }
        ), status: :created
      else
        render json: ResponseDto.new(
          message: 'User creation failed',
          data: { errors: user.errors.full_messages }
        ), status: :unprocessable_entity
      end
    end

    # APIのリクエストパラメータを取得する関数
    #
    # @return [User] ボディパラメータ
    def post_create_params
      User.new(
      {
        google_id: params.require(:google_id),
        nickname: params[:nickname] || ""
      })
    end
  end
end
