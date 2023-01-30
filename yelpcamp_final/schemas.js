const BaseJoi = require('joi')
const sanitizeHtml = require('sanitize-html')

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapedHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTages: [], // nothing is allowed - no string character at all
                    allowedAttributes: {},
                })
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
})
// this is defining an extension on joi.string called escapeHTML 
// inside it there is a function validate which automatically gets called with what ever value it receives 
// also we are using a package called 'sanitizeHtml' -- this does the job of sanitizing html input, it is going to 
// strip the Html or script tags away.
const Joi = BaseJoi.extend(extension)
// now we can use escapeHtml
module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({ // everything is nested under campground
        title: Joi.string().required().escapedHTML(),
        price: Joi.number().required().min(0),
        location: Joi.string().required().escapedHTML(),
        description: Joi.string().required().escapedHTML()
    }).required(),
    deleteImages: Joi.array()
})

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required().escapedHTML()
    }).required()
})
