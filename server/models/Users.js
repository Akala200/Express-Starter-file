import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const saltRounds = 10; // or another integer in that ballpark

const { Schema } = mongoose;


const UserSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
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
