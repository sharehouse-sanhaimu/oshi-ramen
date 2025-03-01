"use client";

import { postSchema } from "@/types/post";
import type { Post } from "@/types/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { compressImage } from "@/lib/compressImage";
import { getUrl } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Home() {
	const [userId, setUserId] = useState<number | null>(null);
	const [isFile, setIsFile] = useState<boolean>(false);

	const form = useForm<Post>({
		resolver: zodResolver(postSchema),
		defaultValues: {
			user_id: 0,
			store_name: "",
			ramen_name: "",
			file: undefined,
			deliciousness_id: 3,
			portion_id: 3,
			thick_id: 3,
			texture_id: 3,
			soup_id: 3,
		},
	});

	useEffect(() => {
		const userID = localStorage.getItem("userID");
		const userIDNum = Number(userID);
		if (userID) {
			setUserId(userIDNum);
		} else {
			setUserId(null);
		}
	}, []);

	useEffect(() => {
		if (userId) {
			form.setValue("user_id", userId);
		}
	}, [userId, form]);

	const fileDelete = () => {
		setIsFile(false);
	};

	const onSubmit = async (data: Post) => {
		console.log(data);
		const compressedFile = await compressImage(data.file);
		const formData = new FormData();

		// 必要なフィールドを FormData に追加
		formData.append("user_id", data.user_id.toString());
		formData.append("store_name", data.store_name);
		formData.append("ramen_name", data.ramen_name);
		formData.append("deliciousness_id", data.deliciousness_id.toString());
		formData.append("portion_id", data.portion_id.toString());
		formData.append("thick_id", data.thick_id.toString());
		formData.append("texture_id", data.texture_id.toString());
		formData.append("soup_id", data.soup_id.toString());

		// ファイルの追加
		if (compressedFile) {
			formData.append("file", compressedFile);
		}

		console.log("formData prepared");
		try {
			const response = await fetch(getUrl("/v1/ramen"), {
				method: "POST",
				body: formData, // Content-Type は自動的に設定されるので指定不要
			});
			// response の処理...
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="flex flex-col min-h-screen px-10 py-10 bg-gradient-to-t from-gray-300 via-gray-200 to-gray-50">
			<div className="flex flex-col items-center justify-center space-y-6">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<div className={`${isFile ? "hidden" : ""}`}>
							<FormField
								control={form.control}
								name="file"
								render={({ field }) => (
									<FormItem>
										<FormLabel>file</FormLabel>
										<FormControl>
											<Input
												type="file"
												accept="image/*"
												onChange={(e) => {
													const files = e.target.files;
													field.onChange(files);
													setIsFile(true);
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{isFile ? (
							<>
								<FormField
									control={form.control}
									name="store_name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Store Name</FormLabel>
											<FormControl>
												<Input placeholder="お店の名前" {...field} />
											</FormControl>
											{/* <FormDescription>
								This is your public display name.
							</FormDescription> */}
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="ramen_name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Ramen Name</FormLabel>
											<FormControl>
												<Input placeholder="ラーメンの名前" {...field} />
											</FormControl>
											{/* <FormDescription>
								This is your public display name.
							</FormDescription> */}
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="deliciousness_id"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Delicious</FormLabel>
											<FormControl>
												<Input
													type="range"
													min={1}
													max={5}
													placeholder="おいしさ"
													{...field}
												/>
											</FormControl>
											{/* <FormDescription>
								This is your public display name.
							</FormDescription> */}
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="portion_id"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Portion</FormLabel>
											<FormControl>
												<Input
													type="range"
													min={1}
													max={5}
													placeholder="量"
													{...field}
												/>
											</FormControl>
											{/* <FormDescription>
								This is your public display name.
							</FormDescription> */}
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="thick_id"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Thick</FormLabel>
											<FormControl>
												<Input
													type="range"
													min={1}
													max={5}
													placeholder="太さ"
													{...field}
												/>
											</FormControl>
											{/* <FormDescription>
								This is your public display name.
							</FormDescription> */}
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="texture_id"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Texture</FormLabel>
											<FormControl>
												<Input
													type="range"
													min={1}
													max={5}
													placeholder="コシ"
													{...field}
												/>
											</FormControl>
											{/* <FormDescription>
								This is your public display name.
							</FormDescription> */}
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="soup_id"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Soup</FormLabel>
											<FormControl>
												<Input
													type="range"
													min={1}
													max={5}
													placeholder="コッテリ"
													{...field}
												/>
											</FormControl>
											{/* <FormDescription>
								This is your public display name.
							</FormDescription> */}
											<FormMessage />
										</FormItem>
									)}
								/>
							</>
						) : (
							<></>
						)}

						<Button type="submit">Submit</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}
