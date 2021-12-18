const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hotelSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    uid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    description: {
      type: String,
      required: true,
    },
    review: {
      type: String,
       required: true,
    },
    logo: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
    hours: {
        type: Object,
        required: true
    }
});

module.exports = mongoose.model("hotel", hotelSchema);