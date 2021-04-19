import { Path, Svg } from '@react-pdf/renderer'
import QRCode from 'qrcode.react'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

type QRCodeGEneratorProps = {
  address: string
}

export default function QRCodeGEnerator(
  props: QRCodeGEneratorProps,
): JSX.Element {
  try {
    const qrcodeValue = ReactDOMServer.renderToString(
      <QRCode value={props.address} renderAs='svg' />,
    )
    const paths = qrcodeValue.match(/d="([^"]*)/g)
    const fills = qrcodeValue.match(/fill="([^"]*)/g)

    return (
      <Svg
        shape-rendering='crispEdges'
        height='100%'
        width='100%'
        viewBox='0 0 33 33'
      >
        {paths?.map((path, idx) => (
          <Path
            fill={fills ? fills[idx].replace('fill="', '') : '#000'}
            d={path.replace('d="', '')}
            key={idx}
          ></Path>
        ))}
      </Svg>
    )
  } catch {
    return <></>
  }
}
