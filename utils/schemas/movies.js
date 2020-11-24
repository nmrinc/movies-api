//@concept SCHEMA : here we create the object schema of how the data must be requested and consumed

//@o Require Joi dependency
const Joi = require('joi');

//@o With the id schema we require a regex of hexadecimal data.
const movieIdSchema = Joi.string().regex(/ˆ[0-9a-fA-F]{24}$/);

//@o Title schema declaring a max of 80 characters
const movieTiteSchema = Joi.string().max(80);

//@o Year schema requesting between 1888 (first movie) and 2077(punk year)
const movieYearSchema = Joi.number().min(1888).max(2077);

const movieCoverSchema = Joi.string().uri();
const movieDescriptionSchema = Joi.string().max(300);
const movieDurationSchema = Joi.number().min(1).max(300);
const movieContentRatingSchema = Joi.string().max(5);
const movieSourceSchema = Joi.string().uri();

//@o this will receive an array, and we can declare specific schema of the items.
const movieTagsSchema = Joi.array().items(Joi.string().max(50));

const createMovieSchema = {
  //@o with required() we indicate that must be present in the request
  title: movieTiteSchema.required(),
  year: movieYearSchema.required(),
  cover: movieCoverSchema.required(),
  description: movieDescriptionSchema.required(),
  duration: movieDurationSchema.required(),
  contentRating: movieContentRatingSchema.required(),
  source: movieSourceSchema.required(),
  tags: movieTagsSchema,
};

const updateMovieSchema = {
  title: movieTiteSchema,
  year: movieYearSchema,
  cover: movieCoverSchema,
  description: movieDescriptionSchema,
  duration: movieDurationSchema,
  contentRating: movieContentRatingSchema,
  source: movieSourceSchema,
  tags: movieTagsSchema,
};

module.exports = {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema
}