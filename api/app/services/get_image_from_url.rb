require 'uri'
require 'open-uri'
require 'stringio'

class GetImageFromUrl
  def self.call(image_url)
    # 画像をダウンロード
    file = URI.open(image_url)

    # 元のファイル名を取得（URLの最後の部分）
    filename = File.basename(URI.parse(image_url).path)

    # MIME タイプを取得
    content_type = file.content_type || MIME::Types.type_for(filename).first&.content_type || 'application/octet-stream'

    # 一時ファイルを作成
    tempfile = Tempfile.new([File.basename(filename, '.*'), File.extname(filename)])
    tempfile.binmode
    tempfile.write(file.read)
    tempfile.rewind # 読み込み位置を先頭に戻す

    uploaded_file = Struct.new(:original_filename, :content_type, :path).new(
      File.basename(image_url),  # オリジナルのファイル名
      file.content_type || 'application/octet-stream', # MIME タイプ
      tempfile.path # ファイルパス
    )
    uploaded_file
  end
end
