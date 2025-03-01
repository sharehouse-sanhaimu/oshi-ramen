import Image from "next/image";

type ImageTileProps = {
	images: string[];
};

export const ImageTile = ({ images }: ImageTileProps) => {
	return (
		<div className="grid grid-cols-3 gap-0">
			{images.map((image) => (
				<div key={image} className="relative w-full pb-[100%] overflow-hidden">
					<Image src={image} alt="ramen" fill className="object-cover" />
				</div>
			))}
		</div>
	);
};
