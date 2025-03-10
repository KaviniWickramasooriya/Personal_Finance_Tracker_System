const Category =  require('../models/Category');

const addCategory = async (req,res) => {
    try {
        const {categoryType} = req.body;

        if(!categoryType){
            return res.status(400).json({ message: 'Category type is required' });
        }

        const existingCategory = await Category.findOne({categoryType});

        if(existingCategory){
            return res.status(400).json({message: 'Category Already Exists'});
        };

        const category = await Category.create({
            categoryType
        });

        res.status(201).json({ message: 'Category added successfuly' });

    }catch (error){
        res.status(500).json({message: 'Error Adding Category ', error});
    }
};

const getCategory = async (req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).json({message:'Categories load succesfully', categories});

    } catch (error) {
        res.status(500).json({ message: 'Error retrieving categories', error});
    }
}

const updateCategory = async (req, res) => {
    try{
        const category =  await Category.findById(req.params.id);

        if(!category) return res.status(404).json({message : 'Category not Found '});

        const updatecategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.status(200).json({message: 'Updated Category ', updatecategory});

    }catch (error){
        res.status(500).json(
            {message : 'Error Updating Category', error}
        );
    }
};

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if(!category) return res.status(404).json({message: 'Category not found'});

        if (category){
            await category.deleteOne();
            res.status(200).json({ message: 'Category deleted' });
        }
    } catch(error) {
        res.status(500).json({message:'Error deleteing category', error});
    }
}



module.exports = {addCategory, getCategory, updateCategory, deleteCategory};