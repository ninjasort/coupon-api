const mongoose = require('mongoose')
const { v4 } = require('uuid')

const Schema = mongoose.Schema

export const SellerSchema = new Schema({
  _id: {
    type: String,
    default: v4(),
  },
  name: {
    type: String,
    required: true,
  },
  coupons: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Coupon',
    },
  ],
})
