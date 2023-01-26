const mongoose = require('mongoose')
const { CouponSchema } = require('../models/coupon')
const Coupon = mongoose.model('Coupon', CouponSchema)

export const addCoupon = (req, res, next) => {
  let couponModel = req.body
  let { sellerId, name } = couponModel

  Coupon.find({ sellerId, name }, (err, coupons) => {
    if (err) return next(err)
    if (coupons.length) {
      res.send(`Coupon with same name already created.`)
    } else {
      let coupon = new Coupon(couponModel)
      coupon.save((err, entry) => {
        if (err) return next(err)
        res.json(entry)
      })
    }
  })
}

export const getCoupons = (req, res, next) => {
  if (!Object.keys(req.query).length) {
    Coupon.find({}, (err, entries) => {
      if (err) return next(err)
      res.json(entries)
    })
  } else if (req.query.name) {
    getCouponByName(req, res, next)
  } else if (req.query.sellerId) {
    getCouponsBySellerId(req, res, next)
  } else {
    next()
  }
}

export const getCouponsBySellerId = (req, res, next) => {
  const { sellerId } = req.query

  const query = Coupon.find()
  query.where({ sellerId })

  query.exec((err, sellerCoupons) => {
    if (err) return next(err)
    if (sellerCoupons.length) {
      res.send(sellerCoupons)
    } else {
      res.status(404).json({ message: `Could not find coupons from sellerId.` })
    }
  })
}

export const getCouponByName = (req, res, next) => {
  const { name } = req.query
  const query = Coupon.find()

  query.where({ name })
  query.exec((err, coupons) => {
    if (err) return next(err)
    res.send(coupons)
  })
}

export const updateCoupon = (req, res, next) => {
  const { id } = req.params
  const { active, discount, productIds } = req.body
  const updates = {}
  // active/deactive coupon /coupons/:id { active: true/false }
  // change discount value /coupons/:id { discount: 20 }

  if (active !== undefined) {
    updates['active'] = active
  }
  if (discount !== undefined) {
    updates['discount'] = discount
  }

  Coupon.findOneAndUpdate(
    { _id: id },
    updates,
    { new: true },
    (err, coupon) => {
      if (err) return next(err)
      res.send(coupon)
    }
  )
}

export const deleteCouponById = (req, res, next) => {
  const { id } = req.params
  Coupon.removeOne({ _id: id }, function (err) {
    if (err) res.send(err)
    res.send(200)
  })
}

export const validateCouponByIds = (req, res, next) => {
  // Given a list of Seller ID’s, Product ID’s and a Coupon this endpoint should
  // indicate which products are eligible for the discount and how much discount the
  // shopper should receive. The input should look something similar to:

  // ;[
  //   {
  //     sellerId: 'xxxx-1111',
  //     products: ['xyz-456', 'zws-123'],
  //   },
  //   {
  //     sellerId: 'yyyy-2222',
  //     products: ['qwe-678', 'uyt-098', 'lkj-654'],
  //   },
  // ]

  const sellers = req.body
  const validators = []
  const eligible = []

  for (let seller of sellers) {
    let query = Coupon.find({
      sellerId: seller.sellerId,
      productIds: { $in: seller.products },
    })
    validators.push(query.exec())
  }

  Promise.all(validators)
    .then((results) => {
      if (results.length) {
        for (let seller of results[0]) {
          let { discount } = seller
          for (let productId of seller.productIds) {
            eligible.push({
              productId,
              discount,
              eligible: true,
            })
          }
        }
        res.send(eligible)
      }
    })
    .catch((err) => {
      res.send(err)
    })
}
