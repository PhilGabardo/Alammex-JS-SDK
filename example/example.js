const alammex = require("../.");
const algosdk = require("algosdk")

async function run() {
	const token = '<INSERT ALGOD TOKEN>'
	const uri = "<INSERT ALGOD URI>"
	const apiKey = ''
	const client = alammex.AlammexClient.fetchTestnetClient(uri, token, '', apiKey)
	const quote = await client.getFixedInputSwapQuote(0, 10458941, 1000000)
	const txnGroup = await client.getSwapQuoteTransactions('DWQXOZMGDA6QZRSPER6O4AMTO3BQ6CEJMFO25EWRRBK72RJO54GLDCGK4E', quote, 5, '')

	const account = algosdk.mnemonicToSecretKey('bottom stone elegant just symbol bunker review curve laugh burden jewel pepper replace north tornado alert relief wrist better property spider picture insect abandon tuna')

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
}

run()