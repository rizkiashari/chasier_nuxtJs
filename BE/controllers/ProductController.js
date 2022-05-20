import product from "../models/Product.js";
import category from "../models/Category.js";

const index = async (req, res) => {
  try {
    const categories = await product.find();

    if (!categories) {
      throw { code: 500, message: "Get categories failed" };
    }

    // return res.status(200).json({
    //   status: true,
    //   total: categories.length,
    //   categories,
    // });
  } catch (error) {
    return res.status(error.code).json({
      status: false,
      message: error.message,
    });
  }
};

const store = async (req, res) => {
  try {
    // is required fields
    if (!req.body.title) {
      throw { code: 428, message: "Title is required" };
    }
    if (!req.body.thumbnail) {
      throw { code: 428, message: "Thumbnail is required" };
    }
    if (!req.body.price) {
      throw { code: 428, message: "Price is required" };
    }
    if (!req.body.categoryId) {
      throw { code: 428, message: "CategoryId is required" };
    }

    // is product exist
    const productExist = await product.findOne({
      title: req.body.title,
    });
    if (productExist) {
      throw { code: 428, message: "Product is exist" };
    }

    const title = req.body.title;
    const thumbnail = req.body.thumbnail;
    const price = req.body.price;
    const categoryId = req.body.categoryId;

    const newProduct = new product({
      title: title,
      thumbnail: thumbnail,
      price: price,
      categoryId: categoryId,
    });

    const Product = await newProduct.save();

    if (!Product) {
      throw { code: 500, message: "Store product failed" };
    }

    return res.status(200).json({
      status: true,
      Product,
    });
  } catch (error) {
    return res.status(error.code).json({
      status: false,
      message: error.message,
    });
  }
};

export { index, store };
