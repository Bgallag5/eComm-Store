const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: ['category_name'],
    include: [
      {
        model: Product,
        attributes: ['product_name', 'price', 'stock']
      }
    ]
  })
  .then(dbData => res.json(dbData))
  .catch((err) => res.status(500).json({message: err}))
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(dbData => {
    if (!dbData){
      res.status(404).json({message: 'No category with this ID exists'})
    }
    res.json(dbData)
  })
  .catch((err) => res.status(500).json({message: err}))
});

router.post('/', (req, res) => {
  console.log(req.body);
  Category.create(req.body).then(category => {
    console.log(category);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
