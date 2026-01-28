export const requireValidate = (data, fields = []) => {

    for (const key of fields) {
        if (data[key] === undefined || data[key] === "") {
            return {
                success: false,
                message: `${key} is required`
            }
        }
        
    }
    return { success: true }
}