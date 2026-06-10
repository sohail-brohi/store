"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { IMAGES } from "@/lib/images";

interface ProductImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function ProductImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  sizes = "(max-width: 768px) 50vw, 25vw",
  priority,
}: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src || IMAGES.product.coat);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={cn("object-cover", className)}
      sizes={fill ? sizes : undefined}
      priority={priority}
      onError={() => setImgSrc(IMAGES.product.coat)}
    />
  );
}
