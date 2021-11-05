import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const saltRounds = 10; // or another integer in that ballpark

const { Schema } = mongoose;


const UserSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      unique: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    date_of_birth: {
      type: String,
    },
    church_group: {
      type: String,
    },
    branch: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  { timestamps: true }
);

// eslint-disable-next-line func-names
UserSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});


const User = mongoose.model('User', UserSchema);

export default User;