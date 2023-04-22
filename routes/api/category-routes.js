const router = require("express").Router();
const { Category, Product, ProductTag } = require("../../models");
const seedProducts = require("../../seeds/product-seeds");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll(
    //  {
    //     include: [{ model: Product, through: ProductTag}]
    //   }
      );
    console.log(allCategories);
    if (!allCategories) {
      res.status(404).json({ message: "Could not retrieve all categories" });
      return;
    }
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get ("/:id", async (req, res) => {
  console.log(req.params);
  try {
    const category = await Category.findByPk(req.params.id, {

      // include: [{ model: }]
    });
    if(!category) {
      res.status(404).json({ message: 'cannot get category with this id'});
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).send('internal server error')
    console.log(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const newCategory = await Category.create(req.body);
    if(!newCategory) {
      res.status(400).json({ message: 'error creating this category'});
      return;
    }

    res.status(200).send('new cateory created');
  } catch (err) {
    res.status(500).send('internal server error')
    console.log(err);
  }
  // create a new category
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    
    await category.destroy();
    res.status(204).send('your category has been deleted');
  }
  // delete a category by its `id` value
});

module.exports = router;
