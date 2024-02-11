const mongoose = require("mongoose");

// Schema

const categorySchema = new mongoose.Schema(
  {
    title:{
        type:String,
        required:[true, 'Category Title is required'],
    },
    imageUrl:{
        type:String,
        default:'https://thumbs.dreamstime.com/b/cartoon-cook-kitchen-22282981.jpg'
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
