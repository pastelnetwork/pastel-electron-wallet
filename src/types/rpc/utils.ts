import { TAlert } from 'common/components/Alert/Alert'

type TMouseEvent = React.MouseEvent<HTMLImageElement, MouseEvent>

type TAlertData = TAlert & {
  message: string
  subMessage: string
}

export type { TMouseEvent, TAlertData }
