// models/ParentCategory.js


// models/ChildCategory.js


// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: String,
  image: String, // Store the filename or path of the uploaded image
  slug: { type: String, unique: true },
  parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'ParentCategory', required: true },
  childCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'ChildCategory', required: true }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
