# Lottery Smart Contract Web App

The project using the [Lottery Smart Contract](https://github.com/buikhacnam/hardhat-lottery)

## react-moralis

Document: https://www.npmjs.com/package/react-moralis

```
yarn add moralis react-moralis
```

In order to use react-moralis, we need to wrap the application around
its provider `MoralisProvider`:

```
    <MoralisProvider initializeOnMount={false}> 
    // initializeOnMount = false cause we dont want to hook this to its server which can have some more functionalities
		<Component {...pageProps} />
	</MoralisProvider>
```

### useWeb3Contract()

github: https://github.com/MoralisWeb3/react-moralis#useweb3contract

In this project we also want to test the function call on local network.
So cd to the hardhat Lottery contract and run the following command:

```
yarn hardhat node
```
Or deploy the contract on a test network:

```
yarn hardhat deploy --network rinkeby
```

It will generate 2 files: `abi.json` and `contractAddress.json` inside the constant folder.

Then we can copy the constants folder from there to this current project.

## web3uikit

Github: https://github.com/web3ui/web3uikit

```
yarn add web3uikit
```

## Deploy the front-end on IPFS

- Download the desktop app here: https://github.com/ipfs/ipfs-desktop/releases

- Download the companion extenstion here: https://docs.ipfs.io/install/ipfs-companion/

- Build the front-end with `yarn build`

- Export the app to `out` folder: `yarn export`

- Import the `out` folder to IPFS files: I use the desktop app to do this.

- Set pinning to local node

- Copy the CID and open it in the browser: `ipfs://{CID}`

## [fleek.co](https://fleek.co)

You may want to edit the command from npm to yarn:

```
yarn install && yarn run build && yarn next export
```


## Next.js Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
