const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: {
      model: Product,
      attrubutes: ["product_name", "price", "stock"],
    },
  }).then((dbData) => {
    res.status(200).json(dbData);
  });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attrubutes: ['product_name', 'price', 'stock']
    }
  }).then(dbData => {
    if (!dbData) {
      res.status(404).json({message: 'No product with that ID exists'});
      return 
    }
    res.json(dbData)   
  }).catch((err) => res.status(500).json({message: err}))
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create(req.body).then(() => {
    Tag.findAll({}).then((dbData) => res.json(dbData));
  });
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
Tag.update({
  tag_name: req.body.tag_name
},
 {
   where: {
     id: req.params.id
   }
 }).then(() => {
   Tag.findAll({}).then(dbData => res.status(200).json(dbData))
 })

});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    Tag.findAll({}).then(dbData => res.status(201).json(dbData))
  })
});

module.exports = router;
