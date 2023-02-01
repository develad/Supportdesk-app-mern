const errorHandler = (err, req, res, next) => {
  // statusCode should be 400 form the userController.js
  // res.status(400);
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};

// As you most likely know in JS errors have a 'throw' and 'catch' relationship.
// You throw an error somewhere in your app and then somewhere else you catch it and do something meaningful with it.

// Express has built in error handling where by any error that is thrown in any of your routes will be 'caught' by Express.

// The default error handling is the last piece of middle ware in your app, so runs after all the route handlers.

// So if you write a bit of middleware that is used as the last bit of middleware in your app then that get's called with error as the first argument. If you don't add this middleware or just call next(err) in this middleware then it gets caught/passed to Express built in.

// It may be useful to you to have a read of error handling section of the Express docs:

// https://expressjs.com/en/guide/error-handling.html
