export const tokenHeaders = async(req, res, next)=>{
    const headerBearer = req.headers["authorization"]
    if(typeof headerBearer !== "undefined"){
        const bearer = headerBearer.split(" ")
        const tokenBearer = bearer[1]
         req.token = tokenBearer 
       return next()
    }
   return res.status(403).json({err:"not authenticated"})
}