const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    image: String //To use Cloudinary, like a user profile image.
},

  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);


module.exports = User;