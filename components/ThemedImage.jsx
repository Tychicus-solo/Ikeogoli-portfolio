"use client";

import Image from "next/image";
import React from "react";
import { useTheme } from "./ThemeProvider";

const ThemedImage = ({ src, lightSrc, alt = "", ...props }) => {
  const { getThemedAsset } = useTheme();

  return <Image src={getThemedAsset(src, lightSrc)} alt={alt} decoding="async" {...props} />;
};

export default ThemedImage;
