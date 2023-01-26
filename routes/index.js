const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { addCoupon, validateCouponByIds } = require('../controllers/coupon')
const { SellerSchema } = require('../models/seller')
const Seller = mongoose.model('Seller', SellerSchema)
const { v4 } = require('uuid')

// For testing purposes

// const sellerModel = {
//   name: 'Cameron',
// }

// const couponModel = {
//   sellerId: '8e0fe1f5-8164-4e0c-b94a-bb1c1f0cb04c',
//   name: 'coupon-4',
//   discount: 30,
//   productIds: [v4(), v4(), '3f87a7d4-4c68-44c9-a19b-5cc9008256ab'],
// }

// router.use(function (req, res, next) {
//   Seller.find({ name: sellerModel.name }, (err, sellers) => {
//     if (err) return next(err)
//     if (sellers.length) {
//       next()
//     } else {
//       let seller = new Seller(sellerModel)
//       seller.save((err, entry) => {
//         if (err) return next(err)
//         res.json(entry)
//       })
//     }
//   })
// })

module.exports = router
