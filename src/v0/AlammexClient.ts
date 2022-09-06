import axios from "axios";
import AlammexQuote from "./AlammexQuote";
import AlammexTransactionGroup from "./AlammexTransactionGroup";

export default class AlammexClient {

	algodUri: string
	algodToken: any
	algodPort: string
	chain: string
	apiKey: string

	constructor(algodUri, algodToken, algodPort, chain, apiKey = '') {
		this.algodUri = algodUri
		this.algodToken = algodToken
		this.algodPort = algodPort
		this.chain = chain
		this.apiKey = apiKey
	}

	static fetchMainnetClient(algodUri, algodToken, algodPort, apiKey) : AlammexClient {
		return new this(algodUri, algodToken, algodPort, 'mainnet', apiKey)
	}

	static fetchTestnetClient(algodUri, algodToken, algodPort, apiKey) : AlammexClient {
		return new this(algodUri, algodToken, algodPort, 'testnet', apiKey)
	}

	async getFixedInputSwapQuote(fromASAId, toASAId, amount, disabledProtocols = [], maxGroupSize = 16) : Promise<AlammexQuote> {
		const quote = await fetchApiData(this.chain, 'fetchQuote', {
			algodUri: this.algodUri,
			algodToken: this.algodToken,
			algodPort: this.algodPort,
			type: 'fixed-input',
			amount: amount,
			fromASAID: fromASAId,
			toASAID: toASAId,
			disabledProtocols: disabledProtocols,
			maxGroupSize: maxGroupSize
		})
		return AlammexQuote.fromAPIResponse(quote)
	}

	async getFixedOutputSwapQuote(fromASAId, toASAId, amount, disabledProtocols = [], maxGroupSize = 16) : Promise<AlammexQuote> {
		const quote = await fetchApiData(this.chain, 'fetchQuote', {
			algodUri: this.algodUri,
			algodToken: this.algodToken,
			algodPort: this.algodPort,
			type: 'fixed-output',
			amount: amount,
			fromASAID: fromASAId,
			toASAID: toASAId,
			disabledProtocols: disabledProtocols,
			maxGroupSize: maxGroupSize
		})
		return AlammexQuote.fromAPIResponse(quote)
	}

	async getSwapQuoteTransactions(address, alammexQuote: AlammexQuote, slippage, referrer) : Promise<AlammexTransactionGroup> {
		const swapQuoteTransactionsData = await fetchApiData(this.chain, 'executeSwapTxns', {
			algodUri: this.algodUri,
			algodToken: this.algodToken,
			algodPort: this.algodPort,
			address: address,
			txnPayloadJSON: alammexQuote.txnPayload,
			slippage: slippage,
			referrer: referrer,
			apiKey: this.apiKey
		})
		return AlammexTransactionGroup.fromApiResponse(swapQuoteTransactionsData)
	}
}

async function fetchApiData(chain, api, params) {
	const subdomain = chain === 'mainnet' ? 'app' : 'testnet'
	const quoteData = await axios.post(`https://${subdomain}.alammex.com/api/${api}`, params);
	return quoteData.data
}