"use client";

import { postSchema } from "@/types/post";
import type { Post } from "@/types/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

//  todo: File,user_idを渡すように修正する
export default function App() {
	const onSubmit = (data: Post) => {
		console.log(data);
	};

	const form = useForm<Post>({
		resolver: zodResolver(postSchema),
		defaultValues: {
			store_name: "",
			ramen_name: "",
			delicious: 3,
			portion: 3,
			thick: 3,
			texture: 3,
			soup: 3, // 例えば range の場合は 0 など適切な値
		},
	});

	console.log(form.watch());

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="store_name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
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
					name="delicious"
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
					name="portion"
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
					name="thick"
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
					name="texture"
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
					name="soup"
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

				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
