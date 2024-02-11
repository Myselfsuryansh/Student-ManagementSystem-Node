const categoryModel = require("../models/categoryModel");

const createCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    if (!title) {
      return res.send(500).send({
        success: false,
        messaage: "Please enter a title or send image url",
      });
    }
    const newCategory = new categoryModel({ title, imageUrl });
    await newCategory.save();
    res.status(200).send({
      success: true,
      message: "Title  and image url added successfully",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: "Error creating category",
      error,
    });
  }
};

const getAllCategoryController = async (req, res) => {
  try {
    const getCategory = await categoryModel.find({});

    if (!getCategory) {
      return res.status(404).send({
        success: false,
        messaage: "Can't get category",
      });
    }

    res.status(200).send({
      success: true,
      message: "Category Get Successfully",
      getCount: getCategory.length,
      getCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { title, imageUrl } = req.body;
    const updateCategory = await categoryModel.findByIdAndUpdate(
      id,
      {
        title,
        imageUrl,
      },
      { new: true }
    );

    if (!updateCategory) {
      return res.status(500).send({
        success: false,
        messaage: "Eror while updating category",
      });
    }
    res.status(200).send({
      success: true,
      message: "Updated Succssesfully",
      updateCategory: updateCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      messaage: "Error while updating",
      error,
    });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOneAndDelete(req.params.id);
    if (!category) {
      return res.status(500).send({
        success: false,
        message: "Plese Provide Category",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category Deleted Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while deleting category",
    });
  }
};



module.exports = {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController,
  
};
