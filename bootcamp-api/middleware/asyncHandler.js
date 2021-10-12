const asyncHandler = (controllerfunction) => (res, req, next) =>
  Promise.resolve(controllerfunction(req, res, next)).catch(next);

  module.exports = asyncHandler