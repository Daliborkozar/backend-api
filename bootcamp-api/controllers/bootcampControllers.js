const Bootcamp = require("../models/BootcampM");
// global async to wrap in all async
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllBootcamps = asyncHandler(async (req, res, next) => {
  

  let query;

  const reqQuery = { ...req.query };

  const removableFields = ["sort"];

  removableFields.forEach((val) => delete reqQuery[val]);

  let queryStr = JSON.stringify(reqQuery);

  //dodajemo $ ispred operatora jer req.query dobijmo kao objekat bez $
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  query = Bootcamp.find(JSON.parse(queryStr)).sort()

  if(req.query.sort) {
      const sortByArr = req.query.sort.split(', ')
      const sortByStr = sortByArr.join(' ')

      query = query.sort(sortByStr)
  }else {
      // ako nema sorta sortirati po ceni od najmanje
      query = query.sort('price')
  }
  

  const bootcamps = await query

  res.status(200).json({
    success: true,
    data: bootcamps,
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
