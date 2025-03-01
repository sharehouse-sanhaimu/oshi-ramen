import { ImageTile } from "@/components/imageTile";

const urlList = [
	"/ramen/IMG_9358.jpeg",
	"/ramen/IMG_9644.jpeg",
	"/ramen/IMG_9437.jpeg",
	"/ramen/IMG_9495.jpeg",
	"/ramen/IMG_9565.jpeg",
	"/ramen/IMG_9599.jpeg",
	"/ramen/IMG_9632.jpeg",
];

export default function Home() {
	return <ImageTile images={urlList} />;
}
