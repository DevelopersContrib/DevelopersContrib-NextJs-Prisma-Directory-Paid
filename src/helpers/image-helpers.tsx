"use client";

import Image from "next/image";

type ImageLoaderType = {
  src: string;
  width: number;
  quality?: number;
  priority?: boolean;
  format?: string;
};

export const imageLoader = ({ src, width, quality }: ImageLoaderType) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};
