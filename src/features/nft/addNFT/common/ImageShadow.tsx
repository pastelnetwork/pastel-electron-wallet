import React from 'react'

export default function ImageShadow({ url }: { url: string }): JSX.Element {
  return (
    <div
      className='absolute -bottom-5 bg-contain mix-blend-darken filter blur-[50px] left-[5%] right-[5%] top-[18%]'
      style={{
        backgroundImage: `url(${encodeURI(url)})`,
      }}
    />
  )
}
