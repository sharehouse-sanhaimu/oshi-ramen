"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
} from "recharts";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

const initialRamenList = [
	{
		id: 1,
		name: "イリヤマ醤油の煮干しそば",
		description: "地鶏の旨味と煮干しの風味が絶妙なバランス",
		image: null,
		stats: { 味: 4, こってり: 3, 麺の硬さ: 5, 具材: 4, スープの深み: 5 },
	},
	{
		id: 2,
		name: "黄金中華そば",
		description: "透き通るスープに深い旨味が広がる",
		image: null,
		stats: { 味: 5, こってり: 2, 麺の硬さ: 4, 具材: 3, スープの深み: 5 },
	},
	{
		id: 3,
		name: "家系ラーメン",
		description: "高密度な豚骨スープと太麺が特徴",
		image: null,
		stats: { 味: 5, こってり: 5, 麺の硬さ: 4, 具材: 5, スープの深み: 5 },
	},
	{
		id: 4,
		name: "黒醤油魚介ラーメン",
		description: "濃厚な魚介系スープがクセになる",
		image: null,
		stats: { 味: 4, こってり: 3, 麺の硬さ: 4, 具材: 4, スープの深み: 4 },
	},
	{
		id: 5,
		name: "カオス中華そば",
		description: "あっさりながら深みのある味わい",
		image: null,
		stats: { 味: 3, こってり: 2, 麺の硬さ: 3, 具材: 3, スープの深み: 3 },
	},
	{
		id: 6,
		name: "チャーシュー満載ラーメン",
		description: "豪快に盛られたチャーシューが魅力",
		image: null,
		stats: { 味: 5, こってり: 4, 麺の硬さ: 3, 具材: 5, スープの深み: 5 },
	},
];

export default function RamenGallery() {
	const [ramenList, setRamenList] = useState(initialRamenList);
	const [selectedRamen, setSelectedRamen] = useState(null);

	const handleImageUpload = (event, id) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setRamenList((prevList) =>
					prevList.map((ramen) =>
						ramen.id === id ? { ...ramen, image: reader.result } : ramen,
					),
				);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className="p-4">
			<h1 className="text-3xl font-bold text-center mb-6">
				2025ラーメンガイド
			</h1>
			<p className="text-center text-gray-600 mb-4">
				最新の人気ラーメンをチェックしよう！
			</p>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{ramenList.map((ramen) => (
					<Card key={ramen.id} className="p-4 border rounded-xl shadow-lg">
						<CardContent className="flex flex-col items-center">
							{ramen.image ? (
								<img
									src={ramen.image}
									alt={ramen.name}
									className="w-60 h-40 object-cover rounded-lg mb-4 cursor-pointer"
									onClick={() => setSelectedRamen(ramen)}
								/>
							) : (
								<div className="w-60 h-40 bg-gray-200 flex items-center justify-center rounded-lg mb-4">
									<span className="text-gray-500">No Image</span>
								</div>
							)}
							<h2 className="text-lg font-bold mb-2">{ramen.name}</h2>
							<p className="text-sm text-gray-600 mb-4">{ramen.description}</p>
							<input
								type="file"
								accept="image/*"
								onChange={(e) => handleImageUpload(e, ramen.id)}
								className="mb-2"
							/>
						</CardContent>
					</Card>
				))}
			</div>

			{selectedRamen && (
				<Dialog
					open={!!selectedRamen}
					onOpenChange={() => setSelectedRamen(null)}
				>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>{selectedRamen.name}</DialogTitle>
						</DialogHeader>
						<p className="text-gray-600 mb-4">{selectedRamen.description}</p>
						<RadarChart
							cx={150}
							cy={150}
							outerRadius={80}
							width={300}
							height={300}
							data={Object.keys(selectedRamen.stats).map((key) => ({
								subject: key,
								value: selectedRamen.stats[key],
							}))}
						>
							<PolarGrid />
							<PolarAngleAxis dataKey="subject" />
							<PolarRadiusAxis domain={[0, 5]} />
							<Radar
								name={selectedRamen.name}
								dataKey="value"
								stroke="#8884d8"
								fill="#8884d8"
								fillOpacity={0.6}
							/>
						</RadarChart>
					</DialogContent>
				</Dialog>
			)}
		</div>
	);
}
