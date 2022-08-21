# Alammex-JS-SDK
Alammex JS SDK for fetching
- Alammex quote for a swap
- the transaction group to execute a given Alammex quote

## Fetch Alammex Quote

To fetch an Alammex quote, initialize the client and use:
- `getFixedInputSwapQuote` for a fixed input swap
- `getFixedOutputSwapQuote` for a fixed output swap


Example (for fixed input):

```
import {AlammexClient} from 'alammex-js-sdk'

const token = <INSERT TOKEN>
const uri = "https://mainnet-algorand.api.purestake.io/ps2"
const apiKey = '' // reach out to phil@alammex.com to get custom API key with higher rate limit
const client = AlammexClient.fetchMainnetClient(uri, token, '', apiKey)
const inputAsset = 0 // ALGO
const outputAsset = 31566704 // USDC
const amount = 1000000 // amount in base units. This would equate to 1 ALGO (since ALGO has 6 decimals)
const quote = await client.getFixedInputSwapQuote(inputAsset, outputAsset, amount)
```

## Fetch Transaction Group for Executing Alammex Quote

To fetch the transaction group for executing an Alammex quote, 
use `getSwapQuoteTransactions`.

Example (using quote from example above):

```
...

const swapperAddress = 'DWQXOZMGDA6QZRSPER6O4AMTO3BQ6CEJMFO25EWRRBK72RJO54GLDCGK4E'
const swapperSecretKey = 'bottom stone elegant just symbol bunker review curve laugh burden jewel pepper replace north tornado alert relief wrist better property spider picture insect abandon tuna'
const swapperAccount = algosdk.mnemonicToSecretKey(swapperSecretKey)
const slippage = 0.5
const referrer = '' // referrer address, for getting 50% of commission fees (implementation is still in progress)
const txnGroup = await client.getSwapQuoteTransactions(swapperAddress, quote, slippage, referrer)


// sign and submit the transaction group
const signedTxns = txnGroup.txns.map((txn) => {
    if (txn.logicSigBlob !== false) {
        return txn.logicSigBlob
    } else {
        let bytes = new Uint8Array(Buffer.from(txn.data, 'base64'))
        const decoded = algosdk.decodeUnsignedTransaction(bytes)
        return algosdk.signTransaction(decoded, account.sk).blob
    }
})
const algod = new algosdk.Algodv2(token, uri, '')
const {txId} = await algod
		.sendRawTransaction(signedTxns)
		.do();
console.log(txId)
```





