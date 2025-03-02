class S3Controller < ApplicationController
  def create
    file = params[:file]
    s3_data = file.present? ? UploadToS3.call(file) : nil
    if s!s3_data.nil?
      render json: ResponseDto.new(
        message: 'Image saved successfully',
        data: {
          url: s3_data.url
        }
      ), status: :created
    else
      render json: ResponseDto.new(
        message: 'Failed to save image',
        data: {
          errors: 'File upload failed or no file provided'
        }
      ), status: :unprocessable_entity
    end
  end
end
