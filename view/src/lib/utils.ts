import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function get_url(path: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${path}`
  console.log(url)
  return `${process.env.NEXT_PUBLIC_API_URL}${path}`
}
