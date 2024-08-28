import mongoose from 'mongoose';

const childCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'ParentCategory', required: true }
});

const ChildCategory = mongoose.model('ChildCategory', childCategorySchema);

export default ChildCategory;
