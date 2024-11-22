import {v2} from "cloudinary"
import fs from "fs"

 // Configuration
 cloudinary.config({ 
    cloud_name: process.env.CLOUNDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUNDINARY_API_KEY, 
    api_secret: process.env. CLOUNDINARY_API_SECRET
});


const uploadOnCloudinary = async(localFilePath)=>{
    try {
        if(!localFilePath) return null
        // upload the file on cloudinary
        const response = await cloudinary.v2.uploader.upload(localFilePath,{
            resourceType:auto
        })
        console.log("File has been uploaded succesfully on cloudinary")
        console.log("File upload response: ",response.url)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)   // will remove the locally saved temparary file since the file upload failed
        
    }
}

export {uploadOnCloudinary}