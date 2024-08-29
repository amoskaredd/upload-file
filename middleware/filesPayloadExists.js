const filesPayloadExists = (req, res, next) => {
  console.log(req.files)
  if (!req.files) return res.status(400).json({ status: "error", message: "Missing Files"})
  
  next();
}
module.exports = filesPayloadExists;