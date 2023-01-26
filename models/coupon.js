const mongoose = require('mongoose')
const Float = require('mongoose-float').loadType(mongoose, 2)
const softDelete = require('mongoosejs-soft-delete')
const { v4 } = require('uuid')

const Schema = mongoose.Schema

const CouponSchema = new Schema(
  {
    sellerId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    discount: {
      type: Float,
      min: 0,
      max: 100,
    },
    productIds: [
      {
        type: String,
        default: v4(),
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

CouponSchema.plugin(softDelete)

export { CouponSchema }
