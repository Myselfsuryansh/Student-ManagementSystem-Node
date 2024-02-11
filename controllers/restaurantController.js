const restaurantModel = require("../models/restaurantModel");

const CreaterestaurantController = async (req, res) => {
  try {
    const {
      title,
      imageUrlfoods,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    if (!title || !coords || !foods) {
      return res.status(404).send({
        success: false,
        message: "Pleae Provide Title and Address and Foods",
      });
    }
    const newRestaurant = new restaurantModel({
      title,
      imageUrlfoods,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newRestaurant.save();

    res.status(200).send({
      success: true,
      message: "New Restaurant Created Successfully",
     
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error while creating restaurant",
        error,
      });
  }
};

const getAllRestaurantControllers = async (req, res) => {
  try {
    const restaurant = await restaurantModel.find({});

    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "Restuarnt not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Restaurants Availabe",
      totalCount:restaurant.length,
      restaurant,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error while getting restaurant",
      });
  }
};

const getAllRestaurantByIdControllers = async (req, res) => {

    try{
        const restaurantId  = await restaurantModel.findById(req.params.id);
        console.log(restaurantId)
        if(!restaurantId) {
            res.status(404).send({
                success: false,
                message: "Restaurtant Not Found"
            })
        }
       
        res.status(200).send({
            success: true,
            message: "Restaurants Found",
            restaurantId
        })

    }

    catch(error){
        console.log(error),
        res.status(500).send({
            success: false,
            message: "Error while getting Id Of Restaurant",
            error
        })
    }
}

const deleteRestaurantController = async(req, res) =>{

    try{
        const restarantId = await restaurantModel.findByIdAndDelete(req.params.id);
         if(!restarantId) {
            return res.status(404).send({
                success: false,
                message: "Restaurant Not Found"
            })


    }
   
        res.status(200).send({
            success: true,
            message: "Restaurant Deleted Successfully",
            restarantId
        })
}

    catch(error){
        console.log(error),
        res.status(500).send({
            success:false,
            message:"Error while deleting Restaurant",
            error
        })
    }

}

module.exports = { CreaterestaurantController, getAllRestaurantControllers, getAllRestaurantByIdControllers,deleteRestaurantController };
