import React, { ReactNode } from 'react'
import cn from 'classnames'

export enum TypographyVariant {
  h1,
  h2,
  h3,
  mini_heavy,
  mini_medium,
  mini_roman,
  mini_italic,
  body1,
  body2,
  body3,
  h1_32_40_heavy,
  h2_24_32_heavy,
  h2_24_32_medium,
  h3_22_30_heavy,
  h4_18_24_heavy,
  h4_18_24_medium,
  h4_18_24_roman,
  h5_16_24_heavy,
  h5_16_24_medium,
  h5_16_24_roman,
  h6_14_24_heavy,
  h6_14_24_medium,
  h6_14_24_roman,
  h6_14_24_italic,
  h6_14_20_heavy,
  h6_14_20_medium,
  h6_14_20_roman,
  h6_14_20_black,
  text_12_16_roman,
  text_12_16_medium,
  text_12_16_bold,
  text_14_16_bold,
  text_8_6_bold,
  text_6_6_bold,
}

export type TTypographyProps = {
  children: ReactNode
  variant?: TypographyVariant
  customFontWeight?: string
  customColor?: string
  uppercase?: boolean
  className?: string
}

const Typography = ({
  children,
  variant = TypographyVariant.body1,
  uppercase = false,
  className,
  customColor = 'text-gray-23',
}: TTypographyProps): JSX.Element => (
  <div
    className={cn(
      'font-body',
      variant === TypographyVariant.h1 && 'text-32px leading-10 font-normal',
      variant === TypographyVariant.h2 && 'text-2xl font-normal',
      variant === TypographyVariant.h3 && 'text-h3 leading-30px font-normal',
      variant === TypographyVariant.h1_32_40_heavy &&
        'text-32px leading-10 font-extrabold',
      variant === TypographyVariant.h2_24_32_heavy && 'text-2xl font-extrabold',
      variant === TypographyVariant.h2_24_32_medium && 'text-2xl font-medium',
      variant === TypographyVariant.h3_22_30_heavy &&
        'text-h3 leading-30px font-extrabold',
      variant === TypographyVariant.h4_18_24_heavy &&
        'text-h4 leading-6 font-extrabold',
      variant === TypographyVariant.h4_18_24_medium &&
        'text-h4 leading-6 font-medium',
      variant === TypographyVariant.h4_18_24_roman &&
        'text-h4 leading-6 font-normal',
      variant === TypographyVariant.h5_16_24_heavy &&
        'text-h5 leading-6 font-extrabold',
      variant === TypographyVariant.h5_16_24_medium &&
        'text-h5 leading-6 font-medium',
      variant === TypographyVariant.h5_16_24_roman &&
        'text-h5 leading-6 font-normal',
      variant === TypographyVariant.h6_14_24_heavy &&
        'text-h6 leading-6 font-extrabold',
      variant === TypographyVariant.h6_14_24_medium &&
        'text-h6 leading-6 font-medium',
      variant === TypographyVariant.h6_14_24_roman &&
        'text-h6 leading-6 font-normal',
      variant === TypographyVariant.h6_14_24_italic &&
        'text-h6 leading-6 font-normal italic',
      variant === TypographyVariant.h6_14_20_roman &&
        'text-h6 leading-5 font-normal',
      variant === TypographyVariant.h6_14_20_heavy &&
        'text-h6 leading-5 font-extrabold',
      variant === TypographyVariant.h6_14_20_medium &&
        'text-h6 leading-5 font-medium',
      variant === TypographyVariant.h6_14_20_black &&
        'text-h6 leading-5 font-black',
      variant === TypographyVariant.mini_heavy &&
        'text-xs leading-[14px] font-extrabold',
      variant === TypographyVariant.mini_medium &&
        'text-xs leading-[14px] font-medium',
      variant === TypographyVariant.mini_roman &&
        'text-xs leading-[14px] font-normal',
      variant === TypographyVariant.mini_italic &&
        'text-xs leading-[14px] font-normal italic',
      variant === TypographyVariant.text_12_16_roman && 'text-xs font-normal',
      variant === TypographyVariant.text_12_16_medium && 'text-xs font-medium',
      variant === TypographyVariant.text_12_16_bold && 'text-xs font-bold',
      variant === TypographyVariant.text_14_16_bold &&
        'text-sm leading-4 font-bold',
      variant === TypographyVariant.text_8_6_bold &&
        'text-[8px] leading-[6px] font-bold',
      variant === TypographyVariant.text_6_6_bold &&
        'text-[6px] leading-[6px] font-bold',
      variant === TypographyVariant.body1 && 'text-lg leading-6 font-normal',
      variant === TypographyVariant.body2 && 'text-base font-normal',
      variant === TypographyVariant.body3 && 'text-sm leading-6 font-normal',
      uppercase && 'uppercase',
      customColor,
      className,
    )}
  >
    {children}
  </div>
)

export default Typography
