const asyncHandler = (requestHandler)=>{
    (req,res,next)=>{
        Promise
        .resolve(requestHandler(req,res,next)
        .catch((err)=>next(err)))}
}

export {asyncHandler}



// const asyncHandler = (fn)=>{}
// const asyncHandler = (fn)=>{()=>{}}    //this can be written as below without braces
// const asyncHandler = (fn)=>()=>{}      //this can be made as an async function as below
// const asyncHandler = (fn)=>async (req,res,next)=>{} //this is how it becomes a async handler function with middleware 





// ayncHandler using try catch
// const asyncHandler = (func) => async (req,res,next)=>{
//     try {
//         await func(req,res,next)
//     } catch (error) {
//         res.starus(err.code || 500).json({
//             success : false,
//             message: err.message
//         })
        
//     }
// }

// export default asyncHandler