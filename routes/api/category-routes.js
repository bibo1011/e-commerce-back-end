const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [Product]
  }).then(dbCategory => {
    res.json(dbCategory);
  })
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  Category.findOne({
    include: [Product],
    where: {
      id: req.params.id
    }
  }).then(dbCategory =>{
    res.json(dbCategory);
  })
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  }).then(dbCategory => {
    res.json(dbCategory);
  }).catch(err => {
    res.status(500).json(err);
  })
  // create a new category
});

router.put('/:id', (req, res) => {
  Category.update({
    category_name: req.body.category_name
  },
  { 
    where: {
      id: req.params.id
    }
  }).then(dbCategory =>{
    if (!dbCategory) {
      res.status(404).json({message: 'not found'})
      return ;
    } 
    res.json(dbCategory);
  })
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbCategory =>{
    if (!dbCategory) {
      res.status(404).json({message: 'not found'})
      return ;
    } 
    res.json(dbCategory);
  })
  // delete a category by its `id` value
});

module.exports = router;
