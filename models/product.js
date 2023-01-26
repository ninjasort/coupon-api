const mongoose = require('mongoose')
const { v4 } = require('uuid')
const Schema = mongoose.Schema

export const ProductSchema = new Schema({
  _id: {
    type: String,
    default: v4(),
  },
  name: {
    type: String,
  },
})
