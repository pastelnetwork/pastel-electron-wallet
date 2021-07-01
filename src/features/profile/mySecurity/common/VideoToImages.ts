export enum VideoToFramesMethod {
  fps,
  totalFrames,
}

export default class VideoToFrames {
  /**
   * Extracts frames from the video and returns them as an array of imageData
   * @param videoUrl url to the video file (html5 compatible format) eg: mp4
   * @param amount number of frames per second or total number of frames that you want to extract
   * @param type [fps, totalFrames] The method of extracting frames: Number of frames per second of video or the total number of frames acros the whole video duration. defaults to fps
   */
  public static getFrames(
    videoUrl: string,
    amount: number,
    type: VideoToFramesMethod = VideoToFramesMethod.fps,
  ): Promise<ImageData[]> {
    return new Promise(
      (
        resolve: (frames: ImageData[]) => void,
        reject: (error: string) => void,
      ) => {
        const frames: ImageData[] = []
        const canvas: HTMLCanvasElement = document.createElement('canvas')
        const context: CanvasRenderingContext2D | null = canvas.getContext('2d')
        let duration: number

        if (context) {
          const video = document.createElement('video')
          video.preload = 'auto'
          video.addEventListener('loadeddata', async function () {
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            duration = video.duration

            let totalFrames: number = amount
            if (type === VideoToFramesMethod.fps) {
              totalFrames = duration * amount
            }
            for (
              let time = 0;
              time < duration;
              time += duration / totalFrames
            ) {
              frames.push(
                await VideoToFrames.getVideoFrame(video, context, time),
              )
            }
            resolve(frames)
          })
          video.src = videoUrl
          video.load()
        } else {
          reject("Can't create the canvas")
        }
      },
    )
  }

  private static getVideoFrame(
    video: HTMLVideoElement,
    context: CanvasRenderingContext2D,
    time: number,
  ): Promise<ImageData> {
    return new Promise((resolve: (frame: ImageData) => void) => {
      const eventCallback = () => {
        video.removeEventListener('seeked', eventCallback)
        this.storeFrame(video, context, resolve)
      }
      video.addEventListener('seeked', eventCallback)
      video.currentTime = time
    })
  }

  private static storeFrame(
    video: HTMLVideoElement,
    context: CanvasRenderingContext2D,
    resolve: (frame: ImageData) => void,
  ) {
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
    resolve(context.getImageData(0, 0, video.videoWidth, video.videoHeight))
  }
}
