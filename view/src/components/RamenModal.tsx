"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type React from "react";
import { useEffect, useRef } from "react";
import {
	PolarAngleAxis,
	PolarGrid,
	PolarRadiusAxis,
	Radar,
	RadarChart,
} from "recharts";

import type { RamenGallery } from "@/types/RamenGallery";

type RamenModalProps = RamenGallery & {
	isOpenModal: boolean;
	setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export function RamenModal({
	isOpenModal,
	setIsOpenModal,
	id,
	name,
	description,
	image,
	stats,
}: RamenModalProps) {
	const modalRef = useRef<HTMLDivElement>(null);

	// モーダル外クリックで閉じる処理
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				setIsOpenModal(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [setIsOpenModal]);

	// モーダル表示中は背面スクロールを禁止
	useEffect(() => {
		if (isOpenModal) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}
	}, [isOpenModal]);

	// stats を RadarChart 用のデータに変換
	const radarData = Object.entries(stats).map(([subject, value]) => ({
		subject,
		value,
	}));

	if (!isOpenModal) return null;

	return (
		<div className="fixed z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50">
			<div
				ref={modalRef}
				className="relative z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[95vh] md:max-h-[90vh] w-[97vw] md:w-[80vw] p-4 md:p-10 md:pb-20 bg-slate-100 border-2 border-neutral-950 shadow-lg rounded-xl overflow-auto"
			>
				<Card className="border rounded-xl shadow-lg">
					<CardContent className="flex flex-col items-center p-6">
						{image ? (
							<img
								src={image}
								alt={name}
								className="w-60 h-40 object-cover rounded-lg mb-4"
							/>
						) : (
							<div className="w-60 h-40 bg-gray-200 flex items-center justify-center rounded-lg mb-4">
								<span className="text-gray-500">No Image</span>
							</div>
						)}
						<h2 className="text-lg font-bold mb-2">{name}</h2>
						<p className="mb-4 text-center">{description}</p>
						<RadarChart
							cx={150}
							cy={150}
							outerRadius={80}
							width={300}
							height={300}
							data={radarData}
						>
							<PolarGrid />
							<PolarAngleAxis dataKey="subject" />
							<PolarRadiusAxis domain={[0, 5]} />
							<Radar
								name={name}
								dataKey="value"
								stroke="#8884d8"
								fill="#8884d8"
								fillOpacity={0.6}
							/>
						</RadarChart>
						<Button onClick={() => setIsOpenModal(false)} className="mt-4">
							Close
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
