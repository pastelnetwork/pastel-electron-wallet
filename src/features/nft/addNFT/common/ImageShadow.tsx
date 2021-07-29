import React from 'react'

export default function ImageShadow({
  url,
  small,
}: {
  url: string
  small?: boolean
}): JSX.Element {
  return (
    <div
      className={`${
        small ? 'bottom-[-5px]' : '-bottom-5'
      } absolute bg-contain mix-blend-darken filter blur-[50px] left-[5%] right-[5%] top-[18%]`}
      style={{
        backgroundImage: `url(${encodeURI(url)})`,
      }}
    />
  )
}
