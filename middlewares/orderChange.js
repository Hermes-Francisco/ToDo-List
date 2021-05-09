
module.exports = (req, res, next)=>{
    const { id, order } = req.body
    if(order==null)return next()
    return res.json({order})
}