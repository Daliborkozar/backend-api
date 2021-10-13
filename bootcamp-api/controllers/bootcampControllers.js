const Bootcamp = require("../models/BootcampM");
// global async to wrap in all async
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllBootcamps = asyncHandler(async (req, res, next) => {
  // console.log(req.query)

  let query;

  const reqQuery = { ...req.query };

  const bootcamp = await Bootcamp.find({ price: { $lte: 300 } });

  res.status(200).json({
    success: true,
    data: bootcamp, 
  });
});

exports.createNewBootcamp = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

exports.updateBootcampById = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with id ${req.params.id} was not found`, 404)
    );
  }

  bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

exports.deleteBootcampById = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with id: ${req.params.id} was not found`, 404)
    );
  }
  // delete bootcamp
  await bootcamp.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
