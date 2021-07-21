export type TImageOptimizationResult =
  | {
      status: 'cancelled'
    }
  | {
      status: 'success'
      fileUrl: string
    }
