import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { getStatisticInfos } from '../../api/pastel-rpc/network-stats'
import { RPCConfig } from '../../legacy/components/AppState'
import { getLastIdFromDB, insertStatisticDataToDB } from './pastelDBLib'
import { pastelDBSelector } from './pastelDBSlice'

interface PastelDBThreadProps {
  rpcConfig: RPCConfig
}

export const PastelDBThread = (
  props: PastelDBThreadProps,
): React.ReactElement => {
  const { rpcConfig } = props
  const [isStarted, setStarted] = useState(false)
  const pastelDBState = useSelector(pastelDBSelector)

  useEffect(() => {
    const fetchStatisticDataFromRPC = async () => {
      // fetch the statistic data(Hashrate...) from RPC.
      if (pastelDBState.isCreated && rpcConfig) {
        setStarted(true)
        const results = await getStatisticInfos(rpcConfig)
        if (results) {
          //Add the fetched statistic data from RPC to database.
          const newId = getLastIdFromDB(pastelDBState)
          insertStatisticDataToDB(
            pastelDBState,
            newId + 1,
            results.hashrate,
            results.difficulty,
          )
        }
        setTimeout(() => fetchStatisticDataFromRPC(), 300000)
      } else {
        return
      }
    }

    if (!isStarted) {
      fetchStatisticDataFromRPC()
    }

    return () => {
      clearTimeout()
    }
  }, [rpcConfig])

  return <></>
}
