import AlammexTransaction from "./AlammexTransaction";

export default class AlammexTransactionGroup {
    public txns: Array<AlammexTransaction>

    constructor(txns) {
        this.txns = txns
    }

    static fromApiResponse(apiResponse) {
        return new AlammexTransactionGroup(apiResponse.txns.map(txn => AlammexTransaction.fromApiResponse(txn)))
    }
}