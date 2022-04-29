import AppColors from "../styles/AppColors";
import { VariantColorType } from "./types";

export const buttonVariantToColor: VariantColorType = {
  'primary': {
    bgColor: AppColors.darkPrimary,
    hoverBgColor: AppColors.darkPrimary
  },
  'secondary': {
    bgColor: AppColors.secondary,
    hoverBgColor: AppColors.darkSecondary
  },
}