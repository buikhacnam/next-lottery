import React, { useEffect, useState } from 'react'
import { useWeb3Contract, useMoralis } from 'react-moralis'
import { contractAddresses, abi } from '../constants'
import { BigNumber, ethers } from 'ethers'
import { useNotification } from 'web3uikit'

interface contractAddressesInterface {
	[key: string]: string[]
}
export default function LotteryEntrance() {
	const notification = useNotification()
	const addresses: contractAddressesInterface = contractAddresses
	const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
	const chainId: string = parseInt(chainIdHex!).toString()
	const raffleAddress = chainId in addresses ? addresses[chainId][0] : null

	const [entranceFee, setEntranceFee] = useState('0')

	console.log('raffle address', raffleAddress)
	const { runContractFunction: getEntranceFee } = useWeb3Contract({
		contractAddress: raffleAddress!,
		abi: abi,
		functionName: 'getEntranceFee',
		params: {},
		// msgValue: 0,
	})

	const {
		runContractFunction: enterRaffle,
		isLoading,
		isFetching,
	} = useWeb3Contract({
		abi: abi,
		contractAddress: raffleAddress!, // specify the networkId
		functionName: 'enterRaffle',
		params: {},
		msgValue: entranceFee,
	})

	useEffect(() => {
		if (isWeb3Enabled) {
			console.log('run get enrtance fee')
			  getEntracenFeeFn()
		}
	}, [isWeb3Enabled])

	const getEntracenFeeFn = async () => {
		const res: any = await getEntranceFee({
			onError: (error: any) => console.log(error),
		})
		console.log('res from ', chainId, ' ', res.toString())
		setEntranceFee(res.toString())
	}

	const handleSuccess = async function () {
		handleNewNotification()
		// updateUI()
	}

	const handleNewNotification = function () {
		console.log('run handle new notification')
		notification({
			type: 'info',
			message: 'Transaction Complete!',
			title: 'Transaction Notification',
			position: 'topR',
			icon: 'bell',
		})
	}

	return (
		<div>
			<button
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto'
				onClick={async function () {
					console.log('onclick enter raffle')
					await enterRaffle({
						onSuccess: handleSuccess,
						onError: (error: any) => console.log(error),
					})
				}}
				disabled={isLoading || isFetching}
			>
				{isLoading || isFetching ? (
					<div className='animate-spin spinner-border h-8 w-8 border-b-2 rounded-full'></div>
				) : (
					<div>Enter Raffle</div>
				)}
			</button>
			<div>Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH</div>

		</div>
	)
}
