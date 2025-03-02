from pdf2image import convert_from_path


def pdf2jpeg(pdf_path, out_path, quality = 20) -> None:
    # PDFを画像に変換
    images = convert_from_path(pdf_path)

    images[0].save(
        out_path,
        "JPEG",
        quality=quality,
    )


if __name__ == "__main__":
    # PDFファイルのパス
    pdf_path = "out/ramen_presentation.pdf"

    # PDFを画像に変換
    images = convert_from_path(pdf_path)

    # 各ページを圧縮されたJPEGとして保存
    for i, image in enumerate(images):
        image.save(
            f"out/output_page_{i + 1}.jpg",
            "JPEG",
            quality=20,
        )
