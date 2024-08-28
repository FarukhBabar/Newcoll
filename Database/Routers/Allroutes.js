// import multer from "multer"
// import express from "express"
// import {Suites } from '../Controller/POstmethod.js'
// import{getsuites} from'../Controller/Gettingmethod.js'
// const router = express.Router()

//     const storage=multer.diskStorage({
//       destination:"uploads/",
//       filename:function(req , file , cb){
//         cb(null , file.originalname)
//       }
//     })

//     const uploads = multer({storage:storage});

//     router.post('/api/fabrics',uploads.single('image') , Suites  )
//     router.get('/api/fabrics/:slug', getsuites)

// export default router

// routes/api.js
import express from 'express';
import ParentCategory from '../Model/Parentcatagory.js';
import ChildCategory from '../Model/Childcatagory.js';
import Product from '../Model/Suitesschema.js';
import multer from 'multer';
import path from 'path';
import slugify from 'slugify';

const __dirname = path.resolve();
const router = express.Router();

// Configure multer storage
   const storage=multer.diskStorage({
       destination:"uploads/",
       filename:function(req , file , cb){
        cb(null , file.originalname)
      }
 })
  const upload = multer({storage:storage});
// POST endpoint for Parent Categories
router.post('/categories/parent', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Invalid or missing name' });
  }

  const category = new ParentCategory({ name });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST endpoint for Child Categories
router.post('/categories/child', async (req, res) => {
  const { name, parentId } = req.body;
  if (!name || !parentId) {
    return res.status(400).json({ message: 'Invalid or missing data' });
  }

  const category = new ChildCategory({ name, parent: parentId });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error adding child category:', error);
    res.status(400).json({ message: error.message });
  }
});
// GET endpoint to fetch all parent categories
router.get('/categories/parent', async (req, res) => {
  try {
    const categories = await ParentCategory.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET endpoint to fetch all child categories
// Ensure the parent field is correctly populated
router.get('/categories/child', async (req, res) => {
  try {
    const categories = await ChildCategory.find().populate('parent', 'name'); // Adjust fields as needed
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET endpoint to fetch child categories by parent category ID
router.get('/categories/child/:parentId', async (req, res) => {
  const { parentId } = req.params;
  try {
    const categories = await ChildCategory.find({ parent: parentId }).populate('parent');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// POST endpoint for Products
router.post('/products', upload.single('image'), async (req, res) => {
  const { name, title, parentCategoryId, childCategoryId } = req.body;
  const image = req.file ? req.file.filename : null;
  const slug = slugify(name, { lower: true, strict: true });

  if (!name || !parentCategoryId || !childCategoryId) {
    return res.status(400).json({ message: 'Invalid or missing data' });
  }

  const product = new Product({
    name,
    title,
    image,
    slug,
    parentCategory: parentCategoryId,
    childCategory: childCategoryId,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET endpoint to fetch products by parent and child category names
router.get('/products', async (req, res) => {
  const { parentCategoryName, childCategoryName } = req.query;

  try {
    const parentCategory = await ParentCategory.findOne({ name: parentCategoryName });
    const childCategory = await ChildCategory.findOne({ name: childCategoryName, parent: parentCategory._id });

    if (!parentCategory || !childCategory) {
      return res.status(404).json({ message: 'Categories not found' });
    }

    const products = await Product.find({
      parentCategory: parentCategory._id,
      childCategory: childCategory._id
    }).populate('parentCategory').populate('childCategory');

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
