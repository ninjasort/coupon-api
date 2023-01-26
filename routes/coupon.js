const express = require('express')
const router = express.Router()
const {
  addCoupon,
  getCoupons,
  deleteCouponById,
  updateCoupon,
  getCouponsBySellerId,
  validateCouponByIds,
} = require('../controllers/coupon')

router
  .get('/', getCoupons)
  .post('/', addCoupon)
  .put('/:id', updateCoupon)
  .delete('/:id', deleteCouponById)
  .post('/validate', validateCouponByIds)

module.exports = router
