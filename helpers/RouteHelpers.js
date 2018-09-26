//Object schema description language and validator for JavaScript objects.
//validate the params or body 
const Joi = require('joi');
module.exports = {
    validateParam: (schema, name) => {
        return (req, res, next) => {
            const result = Joi.validate({ param: req['params'][name] }, schema);
            if (result.error) {
                return res.status(400).json(result.error);
            } else {
                if (!req.value)
                    req.value = {};
                if (!req.value['params'])
                    req.value['params'] = {};

                req.value['params'][name] = result.value.param;
                next();
            }
        }
    },
    /*
    { param: req['params'][name] } => req.params.userId
    name = "userId"
    */
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if (result.error) {
                return res.status(400).json(result.error);
            } else {
                if (!req.value)
                    req.value = {};
                if (!req.value['body'])
                    req.value['body'] = {};

                req.value['body'] = result.value;
                next();
            }

        }
    },

    schemas: {
        nameSchema: Joi.object().keys({
            name: Joi.string().required()
        }),
        emailSchema: Joi.object().keys({
            name:Joi.string().required(),
            email:Joi.string().email().required()
        })
    
    }
}