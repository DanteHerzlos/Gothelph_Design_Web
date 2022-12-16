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
  const isAlreadyExist = await User.findOne({ email: "admin@email.com" });

  if (isAlreadyExist) {
    console.log("The admin already exist");
    mongoose.connection.close();
    return;
  }

  const pass = await bcrypt.hash("admin", 10);
  const user = await User.create({
    email: "admin@email.com",
    password: pass,
  });
  console.log(user);
  mongoose.connection.close();
};

createAdmin();
