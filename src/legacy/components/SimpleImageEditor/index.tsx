import 'tui-image-editor/dist/tui-image-editor.css'

import React from 'react'

import sampleImg from '../../assets/img/SampleImage.png'
import ScrollPane from '../ScrollPane'
import ImageEditor from './ImageEditor'
import styles from './styles.module.css'

const SimpleImageEditor = () => {
  return (
    <div className={styles.container}>
      <ScrollPane offsetHeight={0}>
        <ImageEditor
          includeUI={{
            loadImage: {
              path: sampleImg,
              name: 'SampleImage',
            },
            // theme: myTheme,
            menu: ['shape', 'filter'],
            initMenu: 'filter',
            uiSize: {
              width: '1000px',
              height: '700px',
            },
            menuBarPosition: 'bottom',
          }}
          cssMaxHeight={500}
          cssMaxWidth={700}
          selectionStyle={{
            cornerSize: 20,
            rotatingPointOffset: 70,
          }}
          usageStatistics={true}
        />
      </ScrollPane>
    </div>
  )
}

export default SimpleImageEditor
