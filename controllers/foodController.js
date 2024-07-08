const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

// CREATE FOOD
const createFoodController = async (req,res) => {
    try {
        const {title,description,price,imageUrl,foodTags,category,code,isAvailable,resturant,rating} = req.body;
        if(!title || !description || !price || !resturant){
            return res.status(500).send({
                success:false,
                message:'Please Provide All Fields'
            });
        }
        const newFood = new foodModel({title,description,price,imageUrl,foodTags,category,code,isAvailable,resturant,rating});
        await newFood.save();
        res.status(201).send({
            success:true,
            message:'New Food Item Created',
            newFood
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Erro In Create Food API',
            error
        });
    }
};

// GET ALL FOODS
const getAllFoodsController = async (req,res) => {
    try {
        const foods = await foodModel.find({});
        if(!foods){
            return res.status(404).send({
                success:false,
                message:'No Food Item Was Found'
            });
        }
        res.status(200).send({
            success:true,
            totalFoods:foods.length,
            foods
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error In Get All Fooods API',
            error
        });
    }
};

// GET SINGLE FOOD
const getSingleFoodController = async (req,res) => {
    try {
        const foodId = req.params.id;
        if(!foodId){
            return res.status(404).send({
                success:false,
                message:'Please Provide Id'
            });
        }
        const food = await foodModel.findById(foodId);
        if(!food){
            return res.status(404).send({
                success:false,
                message:'No Food Found With This Id'
            });
        }
        res.status(200).send({
            success:true,
            food
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error In Get Food By Id Controller',
            error
        });
    }
};

// GET FOOD BY RESTURANT
const getFoodByResturantController = async (req,res) => {
    try {
        const resturantId = req.params.id;
        if(!resturantId){
            return res.status(404).send({
                success:false,
                message:'Please Provide Id'
            });
        }
        const food = await foodModel.find({resturant:resturantId});
        if(!food){
            return res.status(404).send({
                success:false,
                message:'No Food Found With This Id'
            });
        }
        res.status(200).send({
            success:true,
            message:'Food Base On resturant',
            food
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error In Get Food By Id Controller',
            error
        });
    }
};

// UPDATE FOOD ITEM
const updateFoodController = async (req,res) => {
    try {
        const foodId = req.params.id;
        if(!foodId){
            return res.status(404).send({
                success:false,
                message:'No Food Id Was Found'
            });
        }
        const food = await foodModel.findById(foodId);
        if(!food){
            return res.status(404).send({
                success:false,
                message:'No Food Found'
            });
        }
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            resturant,
            rating
        } = req.body;
        const updatedFood = await foodModel.findByIdAndUpdate(foodId,{
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            resturant,
            rating
        },{new:true});
        res.status(200).send({
            success:true,
            message:'Food Item Was Updated'
        });
        } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error In Update Food API',
            error
        });
    }
};

// DELETE FOOD
const deleteFoodController = async (req,res) => {
    try {
        const foodId = req.params.id;
        if(!foodId){
            return res.status(404).send({
                success:false,
                message:'Provide Food Id'
            });
        }
        const food = await foodModel.findById(foodId);
        if(!food){
            return res.status(404).send({
                success:false,
                message:'No Food Found With Id'
            });
        }
        await foodModel.findByIdAndDelete(foodId);
        res.status(200).send({
            success:true,
            message:'Food Item Deleted'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error In Delete Food API',
            error
        });
    }
};

// PLACE ORDER
const placeOrderController = async (req,res) => {
    try {
        const {cart} = req.body;
        if(!cart){
            return res.status(500).send({
                success:false,
                message:'Please Food Cart Or Payment Method'
            });
        }
        let total = 0;
        // cal
        cart.map((i) => {
            total += i.price;
        });

        const newOrder = await orderModel({
            foods:cart,
            payment:total,
            buyer:req.body.id
        });
        await newOrder.save();
        res.status(201).send({
            success:true,
            message:'Order Placed Successfully',
            newOrder
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error In Place Order API',
            error
        });
    }
};

// CHANGE ORDER STATUS
const orderStatusController = async (req,res) => {
    try {
        const orderId = req.params.id;
        if(!orderId){
            return res.status(404).send({
                success:false,
                message:'Please Provide Valid Order Id'
            });
        }
        const {status} = req.body;
        const order = await orderModel.findByIdAndUpdate(orderId,{status},{new:true});
        res.status(200).send({
            success:true,
            message:'Order Status Updated'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error In Order Status API',
            error
        });
    }
};

module.exports = {createFoodController,getAllFoodsController,getSingleFoodController,getFoodByResturantController,updateFoodController,deleteFoodController,placeOrderController,orderStatusController};