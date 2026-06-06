export const validateRequest = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
        const unknownKey = result.error.issues.find((key) => key.code == "unrecognized_keys")
        const error = unknownKey ? unknownKey.message : result.error.issues.find((key) => key.expected).message
        return res.status(400).json({
            status: "fail",
            errors: `Bad Request - ${error}`
        })
    }
    console.log()
    req.body = result.data
    next()
}