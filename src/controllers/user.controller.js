import {asyncHandler} from "../utils/asyncHandler"
import ApiError from "../utils/apiError"
import {User} from "../models/user.model"
import {uploadOnCloudinary} from "../utils/cloudinary"
import {ApiRespose} from "../utils/apiResponse"


const registerUser = asyncHandler(async(req,res)=>{
//    get user details form frontend
// validation - not empty
// check if the user exists already: username and email
// check for images and avatar
// upload them from cloudinary, avatar
// create user object, create entry in db
// remove password and refresh token field from response
// check for user creation
// return res

const {fullName, email, username, password} = req.body
console.log("email",email)

// check for empty
if([fullName, email, username, password].some((field)=>field.trim() === "")){
    throw new ApiError(400, "All fields are required")
}

// check if user already exists
    const existingUser = await User.findOne({
        $or : [{ username },{ email }]
    })

    if(existingUser){
        throw new ApiError(409, "User with username or email already exists")
    }

// check images
// req.files comes from multer, we will check the first object of avatar
    console.log("req.files",req.files)
    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0 ){
        coverImageLocalPath = req.files?.coverImage[0]?.path;
    }

    if(!avatarLocalPath){ throw new ApiError(400, "Avatar is required")}

// upload them from cloudinary, avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){throw new ApiError(400, "Avatar is required")}

// create user object, create entry in db
    const user = await User.create({
        fullName,
        avatar :avatar.url,
        coverImage : coverImage?.url || "",
        email:email,
        username:username.toLowerCase(),
        password:password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){throw new ApiError(400, "Something went wrong while registering the user")}

    return res.status(201).json(
        new ApiRespose(200,createdUser,"User registered successfully")
    )

})

export default registerUser