import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number },
    profilePic: {
        type: String,
        default:
          "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
      },
    role: { type: String, enum: ['user', 'admin', 'restaurant manager'], default: 'user' },
    address: [{
        street: String,
        city: String,
        state: String,
        zipCode: String,
        coordinates: { type: [Number], index: '2dsphere' } 
    }],
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Restaurant' }],
    createdAt: { type: Date, default: Date.now }
});

const User = model('User', userSchema);
export default User;