import {mongoose}  from "mongoose"
const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountPercentage: { type: Number, required: true },
  maxDiscountValue: { type: Number, required: true },
  minOrderValue: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  applicableRestaurants: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  ],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const Coupon = mongoose.model("Coupon", couponSchema);
export default Coupon;