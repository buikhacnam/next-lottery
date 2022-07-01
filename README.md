### react-moralis

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
