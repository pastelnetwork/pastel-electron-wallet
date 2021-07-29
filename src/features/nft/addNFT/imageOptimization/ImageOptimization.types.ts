export enum ImageProcessor {
  pngquant = 'pngqant',
  mozjpeg = 'mozjpeg',
}

export type TOptimizedFile = {
  fileUrl: string
  size: number
  quality: number
}

export type TImageOptimizationResult =
  | {
      status: 'cancelled'
    }
  | {
      status: 'success'
      files: TOptimizedFile[]
    }
