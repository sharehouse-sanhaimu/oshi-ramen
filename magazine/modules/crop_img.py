from io import BytesIO
from pathlib import Path

import requests
from PIL import Image, ImageDraw, ImageOps


def round_corner(img: Image, radius: int) -> Image:
    # 画像のサイズを取得
    width, height = img.size

    # 角を丸めるためのマスクを作成
    mask = Image.new("L", (width, height), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle((0, 0, width, height), radius, fill=255)

    # 画像にマスクを適用
    img = ImageOps.fit(img, (width, height))
    img.putalpha(mask)

    return img


def crop_center_square(img: Image):
    # 画像のサイズを取得
    width, height = img.size

    # 正方形の辺の長さを決定
    new_side = min(width, height)

    # 中心を計算
    left = (width - new_side) / 2
    top = (height - new_side) / 2
    right = (width + new_side) / 2
    bottom = (height + new_side) / 2

    # 画像を切り抜く
    img = img.crop((left, top, right, bottom))

    return img


def round_corners_all_images(img_url, out_dir, radius):
    # 出力ディレクトリが存在しない場合は作成
    out_dir.mkdir(parents=True, exist_ok=True)
    print(out_dir)

    # 画像を開く
    response = requests.get(img_url)
    image = Image.open(BytesIO(response.content))

    # 画像を正方形に切り抜く
    image = crop_center_square(image)

    # 角を丸める
    image = round_corner(image, radius=radius)

    # 出力パスを作成 as png
    out_path = out_dir / Path(img_url).name
    out_path = out_path.with_suffix(".png")
    print(out_path)

    # 画像を保存する
    image.save(out_path)


if __name__ == "__main__":
    img_url = "https://oshi-ramen-image.s3.ap-northeast-1.amazonaws.com/uploads/8fba9374-b161-45ca-920a-4e4cb09c63c5_1aa37b19-9224-4d8f-ae5f-d8278647e552_kurakukuroroku.jpg"
    out_dir = Path("/Users/iwakiaoiyou/oshi-ramen/magazine/imgs/url")
    round_corners_all_images(img_url, out_dir, radius=100)  # radiusは角の丸みの半径
