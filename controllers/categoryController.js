const categoryModel = require("../models/categoryModel");
// CREATE CAT 
const createCatController = async (req,res) => {
    try {
        const {title,imageUrl} = req.body;
        // valdn
        if(!title){
            return res.status(500).send({
                success:false,
                message:'Please Provide Category Title'
            });
        }
        const newCategory = new categoryModel({title,imageUrl});
        await newCategory.save();
        res.status(201).send({
            success:true,
            message:'Category Created',
            newCategory
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error In Create Cat API',
            error
        });
    }
};

// GET ALL CAT
const getAllCatController = async (req,res) => {
    try {
        const catagories = await categoryModel.find({});
        if(!catagories){
            return res.status(404).send({
                success:false,
                message:'No Catagories Found'
            });
        }
        res.status(201).send({
            success:true,
            totalCat:catagories.length,
            catagories
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error Im Get All Catagory API',
            error
        });
    }
};

// UPDATE CAT
const updateCatController = async (req,res) => {
    try {
        const {id} = req.params;
        const {title,imageUrl} = req.body;
        const updatedCategory = await categoryModel.findByIdAndUpdate(id,{title,imageUrl},{new:true});
        if(!updatedCategory){
            return res.status(500).send({
                success:false,
                message:'No Category Found'
            });
        }
        res.status(200).send({
            success:true, 
            message:'Category Updated Successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error In Update Cat API',
            error
        });
    }
};

// DELETE CAT
const deleteCatController = async (req,res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(500).send({
                success:false,
                message:'Please Provide Category Id'
            });
        }
        const category = await categoryModel.findById(id);
        if(!category){
            return res.status(500).send({
                success:false,
                message:'No Category Found With This Id'
            });
        }
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:'Category Deleted Successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error In Delete Cat API',
            error
        });
    }
};

module.exports = {createCatController,getAllCatController,updateCatController,deleteCatController};
