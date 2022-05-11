import { ImageProps } from "next/image"

export const minioImageLoader = ({ src }:ImageProps) => {
    return `http://localhost:9000/ij-backend-images/${src}`
  }
