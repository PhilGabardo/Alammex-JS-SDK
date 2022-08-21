import AlammexRoute from "./AlammexRoute";
import DEXQuote from "./DexQuote";

export default class AlammexPathElement {
    public name: String
    public inputASAID: Number
    public outputASAID: Number

    constructor(name, inputASAID, outputASAID) {
        this.name = name
        this.inputASAID = inputASAID
        this.outputASAID = outputASAID
    }

    static fromAPIResponse(apiResponse) : AlammexPathElement {
        return new AlammexPathElement(
            apiResponse.name,
            apiResponse.in.id,
            apiResponse.out.id
        )
    }
}