import { Schema, model } from 'mongoose';

const restaurantSchema = new Schema({
    name: { type: String, required: true },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        location: {
            type: { type: String, enum: ['Point'] },
            coordinates: { type: [Number] } 
        }
    },
    cuisine: { type: String, required: true },
    rating: { type: Number, default: 0 },
    menuItems: [{ type: Schema.Types.ObjectId, ref: 'MenuItem' }],
    contact: {
        phone: String,
        email: String
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open'
    },
    owner: { type: Schema.Types.ObjectId, ref: 'User' }, 
    createdAt: { type: Date, default: Date.now }
});

restaurantSchema.index({ "address.location": "2dsphere" });

const Restaurant = model('Restaurant', restaurantSchema);
export default Restaurant