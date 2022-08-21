import AlammexPathElement from "./AlammexPathElement";

export default class AlammexRoute {
    public percent: Number
    public path: Array<AlammexPathElement>

    constructor(percent, path) {
        this.percent = percent
        this.path = path
    }

    static fromApiResponse(apiResponse) : AlammexRoute {
        return new AlammexRoute(
            apiResponse.percentage,
            apiResponse.path.map((_path) => AlammexPathElement.fromAPIResponse(_path))
        )
    }

}