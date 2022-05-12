const authentication = (req, res, next)=>{
    const adminId = req.cookies?.adminId || req.cookies?.staffAdminId;
    if (adminId){
        return next();
    } 
    res.redirect("/dang-nhap");
}
export default authentication; 