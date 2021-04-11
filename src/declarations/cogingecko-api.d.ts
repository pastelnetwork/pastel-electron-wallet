declare module 'coingecko-api' {
  type ReturnObject = {
    success: boolean
    message: string
    code: number
    data: Record<string, Record<string, number>>
  }

  type PriceRequest = { ids: string[]; vs_currencies: string[] }

  class coingecko {
    simple: {
      price(options: PriceRequest): Promise<ReturnObject>
    }
  }

  export = coingecko
}
