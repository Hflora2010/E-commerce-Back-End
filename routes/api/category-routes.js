const router = require("express").Router();
const { Category, Product} = require("../../models");


// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  
  try {
    const allCategories = await Category.findAll(
     {
        include: [Product]
      });
    console.log(allCategories);

    if (!allCategories) {
      res.status(404).json({ message: "Could not retrieve all categories" });
      return;
    }

    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).send('internal server error');
    console.log(err);
  }
});

// find one category by its `id` value
// be sure to include its associated Products

router.get ("/:id", async (req, res) => {
  console.log(req.params);
  try {
    const category = await Category.findByPk(req.params.id, 
    {
      include: [Product]
    });
    console.log(category);

    if(!category) {
      res.status(404).json({ message: 'cannot get category with this id'});
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).send('internal server error')
    console.log(err);
  }
});

// create a new category

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const newCategory = await Category.create(req.body);
    console.log(newCategory);

    if(!newCategory) {
      res.status(400).json({ message: 'error creating this category'});
      return;
    }

    res.status(200).send('new cateory created');
  } catch (err) {
    res.status(500).send('internal server error')
    console.log(err);
  }
});

// update a category by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if(!updateCategory[0]) {
      res.status(404).json({ message: 'unable to update this category' });
      return;
    }
    res.status(200).send('category update successfully');
  } catch(err) {
    res.status(500).send('inernal server error')
    console.log(err);
  }
});

// delete a category by its `id` value
router.delete("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const deleteCategory = await Category.findByPk(req.params.id);
    await deleteCategory.destroy();
    console.log(deleteCategory);

    if(!deleteCategory) {
      res.status(400).json({ message: 'could not delete this category'});
      return;
    }


    res.status(204).send('your category has been deleted');
  } catch (err) {
    res.status(500).send('internal server error')
    console.log(err);
  }
});

module.exports = router;
