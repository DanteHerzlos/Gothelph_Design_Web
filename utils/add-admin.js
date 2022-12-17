const bcrypt = require("bcrypt");
const { mongoose } = require("mongoose");
require("dotenv").config();

const MONGODB_URI = process.env.DATABASE_URI;

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);

const createAdmin = async () => {
  await mongoose.connect(MONGODB_URI);
  const isAlreadyExist = await User.findOne({
    email: process.env.ADMIN_EMAIL,
  });

  if (isAlreadyExist) {
    console.log("The admin already exist");
    mongoose.connection.close();
    return;
  }

  const pass = bcrypt.hash(process.env.ADMIN_PASS, 10);
  const user = await User.create({
    email: process.env.ADMIN_EMAIL,
    password: pass,
  });
  console.log(user);
  mongoose.connection.close();
};

createAdmin();
