import  Fabric from '../Model/Suitesschema.js'
import  slugify from 'slugify' 
export const Suites =async (req, res) => {
  const { name, title } = req.body;
  const image = req.file ? req.file.filename : null; // Get the filename of the uploaded image
  const slug = slugify(name, { lower: true, strict: true });

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ message: 'Invalid or missing name' });
  }

  const fabric = new Fabric({
    name,
    title,
    image,
    slug,
  });

  try {
    const newFabric = await fabric.save();
    res.status(201).json(newFabric);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}