import Joi from "joi";


export const ValidateSignup = (userData) =>{
    const schema = Joi.object ({
        fullname: Joi.string().required().min(5),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp("^[a-zA-z0-9]{3,30}$")),
        address: Joi.array.items(Joi.object({details: Joi.string() , for: Joi.string()})),
        phoneNumber : Joi.array.item(Joi.number().min(10).max(10))
    });

    return schema.validateAsync(userData)
}

export const ValidateSignin = (userData) =>{
    const schema = Joi.object ({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp("^[a-zA-z0-9]{3,30}$")),
    });

    return schema.validateAsync(userData)
}



