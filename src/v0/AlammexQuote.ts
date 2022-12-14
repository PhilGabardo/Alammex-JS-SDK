import DEXQuote from "./DexQuote";
import AlammexRoute from "./AlammexRoute";



export default class AlammexQuote {
    public quote: Number|null
    public profitAmount: Number|null
    public profitASAID: Number|null
    public priceBaseline: Number|null
    public route: Array<AlammexRoute>
    public quotes: Array<DEXQuote>
    public requiredAppOptIns: Array<Number>
    public txnPayload: Object|null

    constructor(quote, profitAmount, profitASAID, priceBaseline, route, quotes, requiredAppOptIns, txnPayload) {
        this.quote = quote
        this.profitAmount = profitAmount
        this.profitASAID = profitASAID
        this.priceBaseline = priceBaseline
        this.route = route
        this.quotes = quotes
        this.requiredAppOptIns = requiredAppOptIns
        this.txnPayload = txnPayload
    }

    static fromAPIResponse(apiResponse) : AlammexQuote {
        return new AlammexQuote(
            apiResponse.quote === '' ? null : parseFloat(apiResponse.quote),
            apiResponse.quote === '' ? null : apiResponse.profit.amount,
            apiResponse.quote === '' ? null : apiResponse.profit.asa.id,
            apiResponse.quote === '' ? null : apiResponse.priceBaseline,
            apiResponse.route.map((_route) => AlammexRoute.fromApiResponse(_route)),
            apiResponse.quotes.map((quote) => DEXQuote.fromApiResponse(quote)),
            apiResponse.requiredAppOptIns,
            apiResponse.quote === '' ? null : apiResponse.txnPayload
        )
    }


}