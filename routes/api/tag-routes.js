const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include: [Product]
  }).then(dbTag => {
    res.json(dbTag);
  })
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    include: [Product],
    where: {
      id: req.params.id
    }
  }).then(dbTag =>{
    if (!dbTag) {
      return res.status(404).json({message: 'not found'});
    } 
    return res.json(dbTag);
  })
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  }).then(dbTag => {
    res.json(dbTag);
  }).catch(err => {
    res.status(500).json(err);
  })
  // create a new tag
});

router.put('/:id', (req, res) => {
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    }
  }).then(dbTag =>{
    if (!dbTag) {
      return res.status(404).json({message: 'not found'});
    } 
    return res.json(dbTag);
  })
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbTag =>{
    if (!dbTag) {
      return res.status(404).json({message: 'not found'});
    } 
    return res.json(dbTag);
  })
  // delete on tag by its `id` value
});

module.exports = router;
