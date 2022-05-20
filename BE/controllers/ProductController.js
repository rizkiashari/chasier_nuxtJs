import product from "../models/Product.js";

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
    // if (!req.body.title) {
    //   throw { code: 428, message: "Title is required" };
    // }

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
