class ResponseDto
  attr_reader :message, :data

  def initialize(message:, data: nil)
    @message = message
    @data = data
  end

  def to_json(*_args)
    { message: @message, data: @data }.to_json
  end
end
