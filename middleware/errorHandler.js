const errorHandler = (err, req, res) => { 
    let statusCode = err.status || 500;
    let message = "Something went wrong. Please try again later.";
  
    if (err.name === "ValidationError") {
      statusCode = 400;
      message = "Invalid input. Please check your fields.";
    } else if (err.name === "MongoServerError" && err.code === 11000) {
      statusCode = 400;
      message = "Duplicate entry detected.";
    } else if (err.name === "UnauthorizedError") {
      statusCode = 401;
      message = "You are not authorized to perform this action.";
    }
  
    if (req.headers["content-type"] === "application/json") {
      return res.status(statusCode).json({ error: message });
    }
  
    res.status(statusCode).render("error", { error: message });
  };
  
  module.exports = errorHandler;
  