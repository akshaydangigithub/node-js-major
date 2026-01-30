import { getToken } from "./getToken.js"

export const sendToken = (payload, user, satusCode, res) => {
    const token = getToken(payload);

    const option = {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day
        httpOnly: true
    }

    res.status(satusCode).cookie("token", token, option).json({
        success: true,
        token,
        user
    })
}