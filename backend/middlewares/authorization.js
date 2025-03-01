const connection = require("../models/db")

const authorization=(string)=>{
return((req,res,next)=>{
    const user_id= req.token.user_id
    const query = "SELECT * FROM users WHERE id=?"
    const data =[user_id]
    connection.query(query,data,(err,result)=>{
        if(err)
        {return res.json(err)}
        const query ="SELECT *  FROM role_permission INNER JOIN permissions ON role_permission.permission_id=permissions.id WHERE role_permission.role_id=? AND permissions.permission=?"
        const data =[result[0].role_id,string]
        connection.query(query,data,(err,authorizationResult)=>{
            if(err){
                return res.json(err)
            }
            if(authorizationResult.length){
                
                return next()
            }
            res.status(403).json("unauthorized")
        })
    })

}

)
}

module.exports = {authorization}