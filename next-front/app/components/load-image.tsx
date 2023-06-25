import Image from "next/image"
import { getPlaiceholder } from "plaiceholder"

const getImage = async (src: string) => {
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  )

  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10 })

  return {
    ...plaiceholder,
    img: { src, height, width },
  }
}

type LoadImageProps = {
  src: string
  alt?: string
}
export const LoadImage = async ({ src, alt}: LoadImageProps) => {
  const { base64, img } = await getImage(src)

  return (
    // <div className="relative overflow-hidden w-full h-full">
      <Image
        {...img}
        alt={alt || ""}
        title={alt || ""}
        blurDataURL={base64}
        placeholder="blur"
      />
    // </div>
  )
}
