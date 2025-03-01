from pathlib import Path

from models.ramen_info import RamenInfo
from PIL import Image
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

FONT_SIZE = 24
LINE_HEIGHT = 28
IMAGE_SIZE = 2.75

pdfmetrics.registerFont(
    TTFont("IPAexGothic", "fonts/ipaexg.ttf")
)


def make_magazine(
    output_path: str,
    images: list[str],
    bg_path: str,
    redar_charts: list[Path],  # type: ignore
    ramen_info: list[RamenInfo],
):
    FONT_SIZE = 24
    LINE_HEIGHT = 28
    IMAGE_SIZE = 2.75

    c = canvas.Canvas(output_path, pagesize=landscape(A4))
    width, height = landscape(A4)
    print(width, height)

    # background_imageを追加
    c.drawImage(bg_path, 0, 0, width=width, height=height)

    # images1をアスペクト比を保って縮小して、角を丸くして配置
    image_path = images[0]
    image = Image.open(image_path)
    image_width, image_height = image.size
    aspect_ratio = image_width / image_height
    new_height = IMAGE_SIZE * inch
    new_width = new_height * aspect_ratio
    # ここで座標を変更
    x_position = 0.5 * inch
    y_position = height - new_height - 1 * inch
    c.drawImage(
        image_path,
        x_position,
        y_position,
        width=new_width,
        height=new_height,
        mask="auto",
    )

    # redar_charts1を左下に配置
    image_path = redar_charts[0]
    image = Image.open(image_path)
    image_width, image_height = image.size
    aspect_ratio = image_width / image_height
    new_height = 2 * inch
    new_width = new_height * aspect_ratio
    x_position = 0.5 * inch
    y_position = 0.25 * inch
    c.drawImage(
        image_path,
        x_position,
        y_position,
        width=new_width,
        height=new_height,
        mask="auto",
    )

    # Info1をImage1とChart1の間に配置
    c.setFont("IPAexGothic", FONT_SIZE)  # 日本語フォントと文字サイズを設定
    info1 = ramen_info[0]
    text_object = c.beginText(0.5 * inch, height - 4.5 * inch)
    text_object.setFont("IPAexGothic", LINE_HEIGHT)
    text_object.setTextOrigin(0.5 * inch, height - 4.5 * inch)
    text_object.setLeading(28)  # 行間を設定（フォントサイズの1.5倍）

    text_object.textLine(info1.store)
    text_object.textLine(info1.name)

    c.drawText(text_object)

    # images2を中央下側に配置、その他はimages1と同じ
    image_path = images[1]
    image = Image.open(image_path)
    image_width, image_height = image.size
    aspect_ratio = image_width / image_height
    new_height = IMAGE_SIZE * inch
    new_width = new_height * aspect_ratio
    x_position = (width - new_width) / 2
    y_position = 1 * inch
    c.drawImage(
        image_path,
        x_position,
        y_position,
        width=new_width,
        height=new_height,
        mask="auto",
    )

    # Chart2を上中央に配置
    image_path = redar_charts[1]
    image = Image.open(image_path)
    image_width, image_height = image.size
    aspect_ratio = image_width / image_height
    new_height = 2 * inch
    new_width = new_height * aspect_ratio
    x_position = (width - new_width) / 2 + 0.5 * inch
    y_position = height - new_height - 0.25 * inch
    c.drawImage(
        image_path,
        x_position,
        y_position,
        width=new_width,
        height=new_height,
        mask="auto",
    )

    # Info2をImage2とChart2の間に配置
    c.setFont("IPAexGothic", FONT_SIZE)  # 日本語フォントと文字サイズを設定
    info2 = ramen_info[1]
    text_object = c.beginText(4.5 * inch, 5 * inch)
    text_object.setFont("IPAexGothic", LINE_HEIGHT)
    text_object.setTextOrigin(4.5 * inch, 5 * inch)
    text_object.setLeading(36)  # 行間を設定（フォントサイズの1.5倍）

    text_object.textLine(info2.store)
    text_object.textLine(info2.name)

    c.drawText(text_object)

    # images3を右側中央に配置、その他はimages1と同じ
    image_path = images[2]
    image = Image.open(image_path)
    image_width, image_height = image.size
    aspect_ratio = image_width / image_height
    new_height = IMAGE_SIZE * inch
    new_width = new_height * aspect_ratio
    x_position = width - new_width - 0.5 * inch  # ここでX座標を変更
    y_position = height - 2 * new_height - 0.5 * inch  # ここでY座標を変更
    c.drawImage(
        image_path,
        x_position,
        y_position,
        width=new_width,
        height=new_height,
        mask="auto",
    )

    # Chart3を右下に配置
    image_path = redar_charts[2]
    image = Image.open(image_path)
    image_width, image_height = image.size
    aspect_ratio = image_width / image_height
    new_height = 2 * inch
    new_width = new_height * aspect_ratio
    x_position = width - new_width - 0.5 * inch
    y_position = 0.25 * inch
    c.drawImage(
        image_path,
        x_position,
        y_position,
        width=new_width,
        height=new_height,
        mask="auto",
    )

    # Info3をImage3の上に配置
    c.setFont("IPAexGothic", FONT_SIZE)  # 日本語フォントと文字サイズを設定
    info3 = ramen_info[2]
    text_object = c.beginText(width - new_width - 1 * inch, height - 2.25 * inch)
    text_object.setFont("IPAexGothic", LINE_HEIGHT)
    text_object.setTextOrigin(width - new_width - 1 * inch, height - 2.25 * inch)
    text_object.setLeading(36)  # 行間を設定（フォントサイズの1.5倍）

    text_object.textLine(info3.store)
    text_object.textLine(info3.name)

    c.drawText(text_object)

    c.save()


if __name__ == "__main__":
    # 画像のパスを指定
    img_dir = Path("/Users/iwakiaoiyou/oshi-ramen/magazine/imgs/round-square")

    images = [
        str(img_dir / "IMG_9358.png"),
        str(img_dir / "IMG_9437.png"),
        str(img_dir / "IMG_9495.png"),
    ]

    # レダーチャートのパスを指定
    radar_chart_dir = Path("/Users/iwakiaoiyou/oshi-ramen/magazine/imgs/radar-chart")

    radar_charts = [
        radar_chart_dir / "example05.png",
        radar_chart_dir / "example05.png",
        radar_chart_dir / "example05.png",
    ]

    ramen_info = [
        RamenInfo(store="おこじょ", name="ノドグロラーメン"),
        RamenInfo(store="廣はし", name="煮干しラーメン"),
        RamenInfo(store="祥気", name="塩ラーメン"),
    ]

    # 背景画像のパスを指定
    bgimg_path = (
        "/Users/iwakiaoiyou/oshi-ramen/magazine/assets/ramen-magazine-template.png"
    )
    out_path = "/Users/iwakiaoiyou/oshi-ramen/magazine/out/ramen_presentation.pdf"

    create_ramen_presentation(
        out_path,
        images,
        bgimg_path,
        radar_charts,
        ramen_info,
    )
