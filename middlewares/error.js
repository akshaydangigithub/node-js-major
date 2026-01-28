export const genratedErrors = (err, req, res, next)=>{
    const statutCode = err.statutCode || 500;

    if(err.name === "MongoServerError" && err.message.includes("E11000")){
        err.message = "User with this email already exists"
    }

    res.status(statutCode).json({
        errName: err.name,
        message: err.message
    })
}