export default class AlammexTransaction {
    public data : String
    public group: String
    public logicSigBlob: Uint8Array|boolean

    constructor(data, group, logicSigBlob) {
        this.data = data
        this.group = group
        this.logicSigBlob = logicSigBlob
    }

    static fromApiResponse(apiResponse) {
        return new AlammexTransaction(apiResponse.data, apiResponse.group, apiResponse.logicSigBlob !== false ? Uint8Array.from(Object.values(apiResponse.logicSigBlob)) : false)
    }
}