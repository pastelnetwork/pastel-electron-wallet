import React, { useState, useEffect } from 'react'
import cn from 'classnames'
import dayjs from 'dayjs'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'

import { useAppSelector } from 'redux/hooks'
import { PrevButton, NextButton } from './Buttons'
import Tooltip from 'common/components/Tooltip'
import MultiToggleSwitch from 'common/components/MultiToggleSwitch'
import { BackupMethods } from './Regiser.state'
import { DownloadArrow, PDF } from 'common/components/Icons'
import { ffmpegwasm } from 'common/constants/ServeStatic'
import {
  fetchPastelIDAndPrivateKeys,
  fetchAllKeysForPdf,
  splitStringIntoChunks,
  TDataForPdf,
} from '../../profile/mySecurity/common/utils'
import { QRCodeSlider, PDFDocument } from '../../profile'

export type TStepBackupMethodProps = {
  backupMethod: BackupMethods
  setBackupMethod(val: BackupMethods): void
  goToNextStep(): void
  goBack(): void
}

const StepBackupMethod = (props: TStepBackupMethodProps): JSX.Element => {
  const {
    info: { currencyName },
  } = useAppSelector(state => state.appInfo)
  const { username, password, url } = useAppSelector(state => state.pastelConf)
  const pdfFileName = `${
    currencyName || 'LSP'
  }_Paper_Wallet__Private_Keys_${dayjs(new Date()).format(
    'MM_DD_YYYY__HH_MM_ss',
  )}.pdf`
  const videoFileName = `${currencyName}_QR_Code_Video_${dayjs().format(
    'MM_DD_YYYY__HH_mm',
  )}.mp4`

  const [loading, setLoading] = useState(false)
  const [pdfPrepareProgress, setPdfPrepareProgress] = useState<number>(0)
  const [qrcodeData, setQRcodeData] = useState<string[]>([])
  const [videoUrl, setVideoUrl] = useState<string>('')
  const [imagesData, setImagesData] = useState<string[]>([])
  const [currentStatus, setCurrentStatus] = useState<string>('')
  const [allKeys, setAllKeys] = useState<TDataForPdf>({
    addressKeys: [],
    pastelIDs: [],
    addressBook: [],
  })

  const nextActive = true
  const methods = [{ label: 'Download PDF' }, { label: 'QR-code' }]

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const chunkQuantity = 500
      const rpcConfig = {
        username,
        password,
        url,
      }
      const results = await Promise.all([
        fetchPastelIDAndPrivateKeys(rpcConfig),
        fetchAllKeysForPdf(rpcConfig),
      ])

      if (results[0]) {
        const chunks = splitStringIntoChunks(results[0], chunkQuantity)
        setQRcodeData(chunks)
      }

      if (results[1]) {
        setAllKeys(results[1])
      }
      setLoading(false)
    }
    if (!qrcodeData.length) {
      fetchData()
    }
  }, [])

  useEffect(() => {
    if (imagesData.length && !videoUrl) {
      try {
        const iframe = document.getElementById(
          'createVideoIframe',
        ) as HTMLIFrameElement
        if (iframe) {
          iframe?.contentWindow?.postMessage(
            imagesData,
            ffmpegwasm.videoHostURL,
          )
          window.addEventListener('message', handleReReceivedMessage, false)
        } else {
          setCurrentStatus('error')
        }
      } catch {
        setCurrentStatus('error')
      }
    }

    return () => {
      window.removeEventListener('message', handleReReceivedMessage, false)
    }
  }, [imagesData])

  const handleReReceivedMessage = (evt: MessageEvent) => {
    if (!evt.data.error) {
      if (evt.data.videoUrl && !videoUrl) {
        setVideoUrl(evt.data.videoUrl)
        saveFile(evt.data.videoUrl)
      } else {
        setCurrentStatus('error')
      }
    } else {
      setCurrentStatus('error')
    }
  }

  const saveFile = async (url: string) => {
    const a = document.createElement('a')
    a.href = url
    a.download = videoFileName
    a.dispatchEvent(new MouseEvent('click'))
    setCurrentStatus('downloaded')
    a.remove()
  }

  const handleDownloadVideo = () => {
    if (videoUrl) {
      saveFile(videoUrl)
    } else {
      setCurrentStatus('downloading')
      const canvas = document.querySelectorAll('.canvasQRCodeData')

      if (canvas.length) {
        const images: string[] = []
        for (let i = 0; i < canvas.length; i++) {
          const item = canvas[i] as HTMLCanvasElement
          const img = item.toDataURL('')
          if (!images.includes(img)) {
            images.push(img)
          }
        }
        if (images.length) {
          setImagesData(images)
        }
      } else {
        setCurrentStatus('error')
      }
    }
  }

  return (
    <div className='pt-16 flex flex-col h-full'>
      <div>
        <MultiToggleSwitch
          data={methods}
          activeIndex={props.backupMethod}
          onToggle={props.setBackupMethod}
          itemActiveClassName='bg-gray-4a rounded-full text-white'
          countInactiveClassName='bg-warning-hover font-extrabold'
        />
      </div>
      {loading ? (
        <div className='text-gray-71 text-sm font-normal min-h-[320px] mt-42px'>
          Loading ...
        </div>
      ) : (
        <>
          <div className='flex-grow'>
            {props.backupMethod === BackupMethods.PDF && (
              <div className='mt-42px'>
                <h1 className='text-gray-4a text-h3 leading-30px font-extrabold'>
                  Crypto Keys Backup Method
                </h1>
                <h2 className='text-gray-71 text-sm font-normal'>
                  Download a PDF “paper wallet” file with keys for your PastelID
                </h2>

                <div
                  className={cn(
                    'mt-6 px-6 py-4 border border-gray-e1 flex items-center rounded-lg',
                    currentStatus === 'downloading' && 'cursor-not-allowed',
                  )}
                >
                  <PDF size={55} className='text-red-fa' variant='secondary' />

                  <div
                    className='ml-4 mr-4'
                    onClick={() => setPdfPrepareProgress(65)}
                  >
                    <div className='text-base font-medium text-gray-4a'>
                      Crypto Keys
                    </div>
                    <div className='text-xs font-medium text-gray-a0'>
                      0.5mb
                    </div>
                  </div>

                  {pdfPrepareProgress === 0 && (
                    <div className='flex-grow flex justify-end'>
                      <Tooltip
                        type='bottom'
                        width={98}
                        content='Download PDF'
                        vPosPercent={120}
                        classnames='font-extrabold py-2'
                      >
                        <PDFDownloadLink
                          document={
                            <PDFDocument
                              allKeys={allKeys}
                              currencyName={currencyName}
                              title={pdfFileName}
                              qrcodeData={qrcodeData.join('')}
                            />
                          }
                          fileName={pdfFileName}
                          className='block w-full'
                        >
                          <button
                            type='button'
                            className='w-12 h-12 rounded-full bg-blue-e7 hover:bg-blue-fa flex justify-center items-center cursor-pointer transition duration-300'
                          >
                            <DownloadArrow size={24} className='text-blue-3f' />
                          </button>
                        </PDFDownloadLink>
                      </Tooltip>
                    </div>
                  )}

                  {pdfPrepareProgress > 0 && (
                    <div className='flex-grow flex items-center justify-end'>
                      <div className='h-5px w-[108px] rounded-full bg-green-e4 mr-3 overflow-hidden'>
                        <div
                          className='h-5px rounded-full bg-green-77'
                          style={{ width: pdfPrepareProgress + '%' }}
                        ></div>
                      </div>
                      <span className='font-extrabold text-sm'>
                        {pdfPrepareProgress}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {props.backupMethod === BackupMethods.QR && (
              <div className='mt-42px'>
                <h1 className='text-gray-4a text-h3 leading-30px font-extrabold'>
                  QR-Code Backup Method
                </h1>
                <h2 className='text-gray-77 text-sm font-normal'>
                  Save QR Code Video to a Secure Place, or Take a Video
                  <br />
                  of Changing Code with your Smartphone:
                </h2>

                <div className='relative mt-4 p-5 border bg-gray-f8 flex rounded-md justify-center shadow-textbox'>
                  <QRCodeSlider qrcodeData={qrcodeData} />

                  {qrcodeData.length ? (
                    <div className='absolute bottom-3 right-3 z-50'>
                      <button
                        className={cn(
                          'w-12 h-12 rounded-full bg-blue-e7 hover:bg-blue-fa transition duration-300 flex justify-center items-center cursor-pointer',
                          currentStatus === 'downloading' &&
                            'bg-blue-9b cursor-not-allowed',
                        )}
                        onClick={handleDownloadVideo}
                      >
                        <DownloadArrow size={24} className='text-blue-3f' />
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </>
      )}
      <div className='mt-7 flex justify-between'>
        <PrevButton onClick={() => props.goBack()} />
        <NextButton
          onClick={() => props.goToNextStep()}
          text='Next step 3'
          disabled={!nextActive}
        />
      </div>
      <div className='hidden'>
        <iframe
          id='createVideoIframe'
          src={ffmpegwasm.videoHostURL}
          className='h-1.5px w-1.5px'
        />
        <PDFViewer>
          <PDFDocument
            allKeys={allKeys}
            currencyName={currencyName}
            title={pdfFileName}
            qrcodeData={qrcodeData.join('')}
          />
        </PDFViewer>
      </div>
    </div>
  )
}

export default StepBackupMethod
