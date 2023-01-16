import Joi from "joi";


export const ValidateId = (id) =>{
    const schema =  Joi.object({
        id: Joi.string().required(),

    });
    return schema.validateAsync(id)
}

export const ValidateCategory = (category) =>{
   const schema = Joi.object({
    category:Joi.string().required(),
   })
   return schema.validateAsync(category)
}

export const ValidateCity= (city) =>{
   const schema = Joi.object({
    city:Joi.string().required(),
   })
   return schema.validateAsync(city)
}

export const ValidateSearch= (searchString) =>{
   const schema = Joi.object({
    searchString:Joi.string().required(),
   })
   return schema.validateAsync(searchString)
}



