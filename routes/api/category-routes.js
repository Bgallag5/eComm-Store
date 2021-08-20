const router = require("express").Router();
const { Category, Product, Tag } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: ["category_name", "id"],
    include: [
      {
        model: Product,
        attributes: ["product_name", "price", "stock"],
      },
    ],
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => res.status(500).json({ message: err }));
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
      attributes: ['product_name', 'price', 'stock']
    }
  })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No category with this ID exists" });
      }
      res.json(dbData);
    })
    .catch((err) => res.status(500).json({ message: err }));
});

router.post("/", (req, res) => {
  console.log(req.body);
  Category.create(req.body).then(() => {
    Category.findAll({}).then(res.status(200).json(dbData))
  });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then((dbData) => {
    if (!dbData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    Category.findAll({}).then(dbData => res.status(201).json(dbData));
  }).catch((err) => res.status(500).json({message: err}))
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbData => {
    if (!dbData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    Category.findAll({}).then(dbData => res.status(200).json(dbData))
    .catch((err) => res.status(500).json({message: err}))
  })
});

module.exports = router;
