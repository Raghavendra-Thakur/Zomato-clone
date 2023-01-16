import mongoose from "mongoose"
// mongoose.set('strictQuery', false);
export default async () => {
    return mongoose.connect(process.env.MONGO_URL)
}

