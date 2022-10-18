const notFound = (req, res) => res.status(404).json("page does not found");
const errorHandler = (err, req, res, next) =>
  res.status(500).json({ msg:`something went wrong... please try again`});
module.exports = { notFound, errorHandler };
