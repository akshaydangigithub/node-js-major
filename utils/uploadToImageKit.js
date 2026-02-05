import ImageKit from "imagekit"
import dotenv from "dotenv"

dotenv.config()

// imagekit config
var imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});


const uploadToImageKit = async ({ fileBuffer, fileName, folder }) => {

    return imagekit.upload({
        file: fileBuffer,
        fileName,
        folder
    })

}

export default uploadToImageKit;