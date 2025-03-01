import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function get_url(path: string) {
  return `${process.env.NEXT_PUBLIC_API_URL}${path}`
}
