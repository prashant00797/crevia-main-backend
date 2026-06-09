import { ApiError } from "../utils/ApiError.js"

export const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message
        })
    }

    //to handle error for invalid path variables
    if (err.name === "CastError") {
        return res.status(400).json({
            status: "error",
            message: "Bad Request"
        })
    }

    if (!(err instanceof ApiError)) console.error(err) // to check error message
    // finally
    return res.status(500).json({
        status: "error",
        message: "Something went wrong"
    })
}
