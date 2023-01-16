import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    address: [
      {
        details: { type: String },
        for: { type: String },
      },
    ],
    phoneNumber: [
      {
        type: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

//atachments
UserSchema.methods.generateJwtToken = function () {
  return jwt.sign(
    {
      user: this._id.toString(),
    },
    "devtown"
  );
};

//helperfunction

UserSchema.statics.findByEmailAndPhone = async ({email, phone}) => {
  const checkUserByEmail = await UserModel.findOne({ email });
  const checkUserByPhone = await UserModel.findOne({ phone });

  if (checkUserByEmail || checkUserByPhone) {
    throw new Error("user alredy exist");
  }
  return false;
};

UserSchema.statics.findByEmailAndPassword = async (email, password) => {
  const user = await UserModel.find({ email });
  if (!user) {
    throw new Error("user doenst exist");
  }

  //password

  const doesPassMatch = await bcrypt.compare(password, user.password);
  if (!doesPassMatch) throw new Error("Invalid Credential");
  return user;
};

UserSchema.pre("save", function (next) {
  const user = this;

  // is password modified or not
  if (!user.isModified("password")) return next();

  //gen rate bcrypt

  bcrypt.genSalt(8, (error, salt) => {
    if (error) return next(error);

    // hashing pass for 8 times

    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);

      //will bes asigning hashed password
      user.password = hash;
      return next();
    });
  });
});

export const UserModel = mongoose.model("users", UserSchema);
