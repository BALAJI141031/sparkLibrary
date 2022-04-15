import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Russia",
    isFeatured: true,
    thumbnailImg:
      "https://i.ytimg.com/vi/HBlZlmXyR5M/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBW58Yty-aY-OBIZ6h_1-0CftlJ-w",
    description: "Indian Relations With Russia",
  },
  {
    _id: uuid(),
    categoryName: "America",
    isFeatured: true,
    description: "India's Relations with America",
    thumbnailImg:
      "https://i.ytimg.com/vi/McLgpck2i7A/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDKrrjgd6JOtOX7rYCBhIHxuXee8w",
  },
  {
    _id: uuid(),
    categoryName: "Middle-East",
    isFeatured: true,
    description: "India's Relations with Middle-east",
    thumbnailImg:
      "https://i.ytimg.com/vi/YnOdULpV810/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDlg2L_lP1bfsAan450ay3Q88wBlg",
  },
];
