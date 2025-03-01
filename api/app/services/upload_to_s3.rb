require 'aws-sdk-s3'
require 'mime/types'

class UploadToS3
  def self.call(file)
    s3 = Aws::S3::Client.new(
      region: ENV['AWS_REGION'],
      access_key_id: ENV['AWS_ACCESS_KEY_ID'],
      secret_access_key: ENV['AWS_SECRET_ACCESS_KEY']
    )

    key = "uploads/#{SecureRandom.uuid}_#{file.original_filename}"

    content_type = file.content_type || 'application/octet-stream'

    s3.put_object(
      bucket: ENV['AWS_BUCKET_NAME'],
      key: key,
      body: file,
      content_type: content_type
    )
    {
      key: key,
      url: "https://#{ENV['AWS_BUCKET_NAME']}.s3.#{ENV['AWS_REGION']}.amazonaws.com/#{key}"
    }
  end
end
