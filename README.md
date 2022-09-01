# Alammex-JS-SDK
Alammex JS SDK for fetching
- Alammex quote for a swap
- the transaction group to execute a given Alammex quote

### Installation

Run: `npm install alammex-sdk-js`

## Fetch Alammex Quote

To fetch an Alammex quote, initialize the client and use:
- `getFixedInputSwapQuote` for a fixed input swap
- `getFixedOutputSwapQuote` for a fixed output swap


Example (for fixed input):

```
import {AlammexClient} from 'alammex-js-sdk'
import algosdk from 'algosdk'

const token = '<INSERT ALGOD TOKEN>'
const uri = '<INSERT ALGOD URI>'

const sender = algosdk.mnemonicToSecretKey('bottom stone elegant just symbol bunker review curve laugh burden jewel pepper replace north tornado alert relief wrist better property spider picture insect abandon tuna')
const algod = new algosdk.Algodv2(token, uri, '')
const params = await algod.getTransactionParams().do()

const apiKey = '' // reach out to phil@alammex.com to get custom API key with higher rate limit
const inputAssetId = 0 // ALGO
const outputAssetId = 10458941 // USDC
const amount = 1000000 // amount in base units. This would equate to 1 ALGO (since ALGO has 6 decimals)
const client = AlammexClient.fetchTestnetClient(uri, token, '', apiKey)
const quote = await client.getFixedInputSwapQuote(inputAssetId, outputAssetId, amount)

const requiredAppOptIns = quote.requiredAppOptIns

// opt into required app for swap
for (let i = 0; i < requiredAppOptIns.length; i++) {
	const requiredAppId = requiredAppOptIns[i]
	const accountInfo = await algod.accountApplicationInformation(sender.addr, requiredAppId).do()
	if (!('app-local-state' in accountInfo)) {
		const appOptInTxn = algosdk.makeApplicationOptInTxn(sender.addr, params, requiredAppId)
		const signedTxn = appOptInTxn.signTxn(sender.sk)
		await algod
			.sendRawTransaction(signedTxn)
			.do();
	}
}
```

## Fetch Transaction Group for Executing Alammex Quote

To fetch the transaction group for executing an Alammex quote, 
use `getSwapQuoteTransactions`.

Example (using quote from example above):

```
...

const slippage = 0.5
const referrer = '' // referrer address, for getting 50% of commission fees (see https://docs.alammex.com/developers/alammex-referral-program)
const txnGroup = await client.getSwapQuoteTransactions(swapperAddress, quote, slippage, referrer)

const signedTxns = txnGroup.txns.map((txn) => {
	if (txn.logicSigBlob !== false) {
		return txn.logicSigBlob
	} else {
		let bytes = new Uint8Array(Buffer.from(txn.data, 'base64'))
		const decoded = algosdk.decodeUnsignedTransaction(bytes)
		return algosdk.signTransaction(decoded, sender.sk).blob
	}
})
const {txId} = await algod
	.sendRawTransaction(signedTxns)
	.do();
console.log(txId)
```





