import React, { useEffect, useState } from 'react'
import { useWeb3Contract, useMoralis } from 'react-moralis'
import { contractAddresses, abi } from '../constants'
import { BigNumber, ethers, ContractTransaction } from 'ethers'
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
	const [numPlayers, setNumPlayers] = useState('0')
	const [recentWinner, setRecentWinner] = useState('0')

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
		contractAddress: raffleAddress!,
		functionName: 'enterRaffle',
		params: {},
		msgValue: entranceFee,
	})

	const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
		abi: abi,
		contractAddress: raffleAddress!,
		functionName: 'getNumberOfPlayers',
		params: {},
	})

	const { runContractFunction: getRecentWinner } = useWeb3Contract({
		abi: abi,
		contractAddress: raffleAddress!,
		functionName: 'getRecentWinner',
		params: {},
	})

	useEffect(() => {
		if (isWeb3Enabled) {
			fetchEntranceFee()
			fetchNumPlayers()
			fetchRecentWinner()
		}
	}, [isWeb3Enabled])

	const fetchEntranceFee = async () => {
		const res = await getEntranceFee({
			onError: (error: any) =>
				console.log('getEntranceFee ERROR: ', error),
		})
		const bigNumber = res as BigNumber
		console.log('entrance fee from ', chainId, ' ', bigNumber.toString())
		setEntranceFee(bigNumber.toString())
	}

	const fetchNumPlayers = async () => {
		const res: any = await getNumberOfPlayers({
			onError: (error: any) =>
				console.log('getNumPlayers ERROR: ', error),
		})
		console.log('number of players from ', chainId, ' ', res.toString())
		setNumPlayers(res.toString())
	}

	const fetchRecentWinner = async () => {
		const res: any = await getRecentWinner({
			onError: (error: any) =>
				console.log('getRecentWinner ERROR: ', error),
		})
		console.log('recent winner from ', chainId, ' ', res.toString())
		setRecentWinner(res.toString())
	}

	const handleSuccess = async function (tx: ContractTransaction) {
		await tx.wait(1)
		handleNewNotification()
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
		fetchEntranceFee()
		fetchNumPlayers()
		fetchRecentWinner()
	}

	return (
		<div>
			<button
				onClick={async function () {
					console.log('onclick enter raffle')
					await enterRaffle({
						onSuccess: (tx) =>  handleSuccess(tx as ContractTransaction),
						onError: (error: any) => console.log(error),
					})
				}}
				disabled={isLoading || isFetching}
			>
				{isLoading || isFetching ? (
					<div>loading...</div>
				) : (
					<div>Enter Raffle</div>
				)}
			</button>
			<div>
				Entrance Fee: {ethers.utils.formatUnits(entranceFee, 'ether')}{' '}
				ETH
			</div>
			<div>Number Of Players: {numPlayers} </div>
			<div> Recent Winner: {recentWinner} </div>
		</div>
	)
}
