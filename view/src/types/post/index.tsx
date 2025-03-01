import { z } from "zod";

// バイト単位のサイズをメガバイト単位に変換する
const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
	const result = sizeInBytes / (1024 * 1024);
	return +result.toFixed(decimalsNum);
};

const IMAGE_TYPES = ["image/jpeg", "image/png"];
const MAX_IMAGE_SIZE = 5; // 5MB

// unionを使ってnullも許容した上で、後で必須チェックを行う
const fileSchema = z
	.union([
		z.null(),
		z.preprocess(
			(val) => {
				if (val instanceof FileList && val.length > 0) {
					return val[0];
				}
				return val;
			},
			z
				.instanceof(File)
				.refine((file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE, {
					message: "ファイルサイズは最大5MBです",
				})
				.refine((file) => IMAGE_TYPES.includes(file.type), {
					message: ".jpgもしくは.pngのみ可能です",
				}),
		),
	])
	.refine((file) => file !== null, { message: "必須です" });

export const postSchema = z.object({
	user_id: z.string(),
	store_name: z.string(),
	ramen_name: z.string(),
	file: fileSchema,
	delicious: z.preprocess(
		(val) => (typeof val === "string" ? Number.parseInt(val, 10) : val),
		z.number(),
	),
	portion: z.preprocess(
		(val) => (typeof val === "string" ? Number.parseInt(val, 10) : val),
		z.number(),
	),
	thick: z.preprocess(
		(val) => (typeof val === "string" ? Number.parseInt(val, 10) : val),
		z.number(),
	),
	texture: z.preprocess(
		(val) => (typeof val === "string" ? Number.parseInt(val, 10) : val),
		z.number(),
	),
	soup: z.preprocess(
		(val) => (typeof val === "string" ? Number.parseInt(val, 10) : val),
		z.number(),
	),
});

export type Post = z.infer<typeof postSchema>;
