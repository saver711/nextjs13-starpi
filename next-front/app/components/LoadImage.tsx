"use client"
import Image, { StaticImageData } from "next/image"

type LoadImageProps = {
  src: string
  alt: string
  width?: number
  height?: number
}
export default function LoadImage({
  src,
  alt,
  width,
  height,
}: LoadImageProps) {
  return (
    <Image
      alt={alt}
      {...(width && { width })}
      {...((width || height) && { height: height || width })}
      {...(!width && !height && { fill: true, style: {objectFit: "cover"} })}
      src={src}
      className={`duration-700 ease-in-out blur overflow-hidden`}
      onLoadingComplete={(img) => img.classList.remove("blur")}
    />
  )
}
