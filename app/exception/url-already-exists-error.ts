export default class URLAlreadyExistsError extends Error {
    constructor(message) {
        super(message)
        this.name = 'URLAlreadyExistsError'
    }
}