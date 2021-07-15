import * as React from 'react'
import cn from 'classnames'

export enum TypographyVariant {
  h1,
  h2,
  h3,
  body1,
  body2,
  body3,
}

type TTypographyProps = {
  children: string
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
  customFontWeight,
  customColor,
}: TTypographyProps): JSX.Element => (
  <div
    className={cn(
      'font-body',
      className,
      variant === TypographyVariant.h1 && 'text-32px leading-10',
      variant === TypographyVariant.h2 && 'text-2xl',
      variant === TypographyVariant.h3 && 'text-h3 leading-30px',
      variant === TypographyVariant.body1 && 'text-lg leading-6',
      variant === TypographyVariant.body2 && 'text-base',
      variant === TypographyVariant.body3 && 'text-sm leading-6',
      customFontWeight ? customFontWeight : 'font-normal',
      uppercase && 'uppercase',
      customColor ? customColor : 'text-gray-23',
    )}
  >
    {children}
  </div>
)

export default Typography
