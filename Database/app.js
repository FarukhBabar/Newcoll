// import express from 'express';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import multer from 'multer';
// import path from 'path';
// import slugify from 'slugify';
// import router from './Routers/Allroutes.js';

// const __dirname = path.resolve(); // For ES6, use path.resolve to get the current directory
// const app = express();
// const port = 5000;
// app.use(router)
// app.use(cors());
// app.use(bodyParser.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from the uploads directory

// // Configure multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, 'uploads')); // Full path to uploads directory
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname); // Use the original filename
//   }
// });

// const upload = multer({ storage });

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/Personalwebsite')
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Error connecting to MongoDB:', err));

// // Define a schema for fabric products
// const fabricSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   title: String,
//   image: String, // Store the filename or path of the uploaded image
//   slug: { type: String, unique: true }
// });

// const Fabric = mongoose.model('Fabric', fabricSchema);

// // GET endpoint to fetch fabrics
// app.get('/api/fabrics/:slug', async (req, res) => {
//   try {
//     const fabrics = await Fabric.find({ slug: req.params.slug });
//     res.json(fabrics);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // POST endpoint to create a new fabric with file upload and auto-generated slug
// app.post('/api/fabrics', upload.single('image'), async (req, res) => {
//   const { name, title } = req.body;
//   const image = req.file ? req.file.filename : null; // Get the filename of the uploaded image
//   const slug = slugify(name, { lower: true, strict: true });

//   if (!name || typeof name !== 'string') {
//     return res.status(400).json({ message: 'Invalid or missing name' });
//   }

//   const fabric = new Fabric({
//     name,
//     title,
//     image,
//     slug,
//   });

//   try {
//     const newFabric = await fabric.save();
//     res.status(201).json(newFabric);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url'; // Import fileURLToPath for ES6 modules
import router from './Routers/Allroutes.js'; // Adjust the path if necessary

const __filename = fileURLToPath(import.meta.url); // Get the current file path
const __dirname = path.dirname(__filename); // Get the directory name

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', router); // Use the routes defined in Allroutes.js

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Personalwebsite')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
