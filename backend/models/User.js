import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define schema
const UserSchema = new mongoose.Schema({
  name:{type: String, required: true},
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
});

// Pre-save hook to hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if password is modified

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model('User', UserSchema);
