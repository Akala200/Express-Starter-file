/* eslint-disable no-useless-escape */
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
    facebook_id: {
      type: String,
    },
    church_group: {
      type: Array,
    },
    code: {
      type: Array,
    },
    avartar: {
      type: String,
    },
    branch: {
      type: String,
    },
    country: {
      type: String,
    },
    account_verification: {
      type: Boolean,
      default: false
    },
    reset_password: {
      type: Boolean,
      default: false
    },
    status: {
      type: Boolean,
      default: true
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
