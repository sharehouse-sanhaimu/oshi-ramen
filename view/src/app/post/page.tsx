"use client";

import { postSchema } from "@/types/post";
import type { Post } from "@/types/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
	example: string;
	exampleRequired: string;
};

export default function App() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Post>({
		resolver: zodResolver(postSchema),
	});
	const onSubmit = (data: Post) => {
		console.log(data);
	};

	return (
		/* "handleSubmit" will validate your inputs before invoking "onSubmit" */
		<form onSubmit={handleSubmit(onSubmit)}>
			<input {...register("store_name")} />

			<input {...register("ramen_name")} />

			<input {...register("parameter.delicious")} />

			<input {...register("parameter.portion")} />

			<input {...register("parameter.thick")} />

			<input {...register("parameter.texture")} />

			<input {...register("parameter.soup")} />

			<input {...register("file.file")} />

			{errors.file && <span>This field is required</span>}

			<input type="submit" />
		</form>
	);
}
