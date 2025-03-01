import { z } from "zod";

// バイト単位のサイズをメガバイト単位に変換する
const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
	const result = sizeInBytes / (1024 * 1024);
	return +result.toFixed(decimalsNum);
};

const IMAGE_TYPES = ["image/jpg", "image/png"];
const MAX_IMAGE_SIZE = 5; // 5MB

const fileSchema = z.object({
	file: z
		// z.inferでSchemaを定義したときに型がつくようにするため
		.custom<FileList>()
		// 必須にしたい場合
		.refine((file) => file.length !== 0, { message: "必須です" })
		// このあとのrefine()で扱いやすくするために整形
		.transform((file) => file[0])
		// ファイルサイズを制限したい場合
		.refine((file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE, {
			message: "ファイルサイズは最大5MBです",
		})
		// 画像形式を制限したい場合
		.refine((file) => IMAGE_TYPES.includes(file.type), {
			message: ".jpgもしくは.pngのみ可能です",
		}),
});

export const postSchema = z.object({
	user_id: z.string(),
	store_name: z.string(),
	ramen_name: z.string(),
	file: fileSchema,
	parameter: z.object({
		delicious: z.number(), // delicious: おいしさ
		portion: z.number(), // portion: 量
		thick: z.number(), // thick: 太さ
		texture: z.number(), // texture: コシ
		soup: z.number(), // soup: コッテリ
	}),
});

export type Post = z.infer<typeof postSchema>;
