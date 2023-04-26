const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      attributes: ["id", "tag_name"],
      include: [
        { model: Product, attributes: ["id", "product_name", "price", "stock", "category_id"] }
      ],
    });
    console.log(allTags);

    if(!allTags) {
      res.status(404).json({ message: "could not retrieve all tags"});
      return;
    }
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).send("internal server error");
  }
});

// find a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  console.log(req.params);
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: {
        model: Product,
        attributes: ["id", "product_name","price", "stock", "category_id"]
      },
    });
    console.log(tag);

    if(!tag) {
      res.status(404).json({ message: "could not retrieve a tag with this id"});
      return;
    }

    res.status(200).json(tag);
  } catch (err) {
    res.status(500).send("internal server error");
    console.log(err);
  }
});

// create a new tag
router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    console.log(newTag);

    if(!newTag) {
      res.status(400).json({ message: "error creating this tag"});
      return;
    }

    res.status(200).send("new tag created");
  } catch (err) {
    res.status(500).send("internal server error");
    console.log(err);
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if(!updateTag[0]) {
      res.status(404).json({ message: "unable to update this tag" });
      return;
    }
    res.status(200).send("updated tag successfully");
  } catch (err) {
    res.status(500).send("internal server error");
    console.log(err);
  }
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  console.log(req.params.id);
  try {
    const deleteTag = await Tag.findByPk(req.params.id);
    await deleteTag.destroy();
    console.log(deleteTag);

    if(!deleteTag) {
      res.status(400).json({ message: "could not delete this tag"});
      return;
    }

    res.status(204).send("your tag has been deleted");
  } catch (err) {
    res.status(500).send("internal server error");
    console.log(err);
  }
});

module.exports = router;
