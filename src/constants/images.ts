import React from 'react';

// Google Drive thumbnail direct-serving endpoints optimized for fast loading (w1000 width)
export const DRIVE_IMAGES = [
  'https://drive.google.com/thumbnail?id=1xO9spaEkWAaoNGZ4JSS9qX9uTb7y92Up&sz=w1000',
  'https://drive.google.com/thumbnail?id=16FkMeI6giJpikiDroImDUnIm9UNfNEKC&sz=w1000',
  'https://drive.google.com/thumbnail?id=1DT4VAwQsDl4Vx6Kbpa4fk9xwg4gRugCd&sz=w1000',
  'https://drive.google.com/thumbnail?id=1jLFpMywdq-RLZ4_m3TsFXWGE489oenrP&sz=w1000',
  'https://drive.google.com/thumbnail?id=1R7o20t18BDpNBVVh-JAEuvUW47Y9lBL2&sz=w1000',
] as const;

export const IMAGES = {
  branch1: DRIVE_IMAGES[0],
  branch2: DRIVE_IMAGES[1],
  branch3: DRIVE_IMAGES[2],
  branch4: DRIVE_IMAGES[3],
  branch5: DRIVE_IMAGES[4],
  all: [...DRIVE_IMAGES],
};

// Preload helper to cache images in browser memory immediately for fast switching
export const preloadImages = (urls: string[]) => {
  urls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};

// Neutral SVG placeholder data URI for image error fallback
export const PLACEHOLDER_IMAGE = "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%22%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22800%22%20height%3D%22500%22%20viewBox%3D%220%200%20800%20500%22%3E%3Crect%20width%3D%22800%22%20height%3D%22500%22%20fill%3D%22%23FAF7F2%22%2F%3E%3Crect%20x%3D%22200%22%20y%3D%22125%22%20width%3D%22400%22%20height%3D%22250%22%20rx%3D%2216%22%20fill%3D%22%23EDE5DC%22%2F%3E%3Ctext%20x%3D%22400%22%20y%3D%22255%22%20font-family%3D%22Cairo%2C%20sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20fill%3D%22%238B6F47%22%20text-anchor%3D%22middle%22%3EMathwaa%20Property%20Photo%3C%2Ftext%3E%3C%2Fsvg%3E";

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.currentTarget;
  if (target.src !== PLACEHOLDER_IMAGE) {
    target.src = PLACEHOLDER_IMAGE;
  }
};
