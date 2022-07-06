import React, { useEffect } from 'react'
import { useWeb3Contract, useMoralis } from 'react-moralis'
import { contractAddresses, abi } from '../constants'
import { BigNumber, ethers } from "ethers"


interface contractAddressesInterface {
	[key: string]: string[]
}
export default function LotteryEntrance() {
	const addresses: contractAddressesInterface = contractAddresses
	const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
	const chainId: string = parseInt(chainIdHex!).toString()
	const raffleAddress = chainId in addresses ? addresses[chainId][0] : null

	console.log('raffle address', raffleAddress)
	const { runContractFunction: getEntranceFee } = useWeb3Contract({
		contractAddress: raffleAddress!,
		abi: abi,
		functionName: 'getEntranceFee',
		params: {},
		// msgValue: 0,
	})

  useEffect(() => {
    if(isWeb3Enabled) {
      console.log('run get enrtance fee')
      getEntraceFee()
    }
  }, [isWeb3Enabled])

  const getEntraceFee = async() => {
    const res: any = await getEntranceFee()
    console.log('res from ', chainId, ' ' , res.toString())
  }

	return <div>LotteryEntrance</div>
}
