import  Fabric from '../Model/Suitesschema.js'


export const getsuites =async (req, res) => {
  try {
    const fabrics = await Fabric.find({ slug: req.params.slug });
    res.json(fabrics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}