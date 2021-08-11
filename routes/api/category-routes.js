//TO DO: PUT Works (updates the DB), but I get a 400 in Insomnia. Error in console says can't read property 'filter' of undefined on line 97.

const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get a product by its 'id'
router.get('/:id', async (req, res) => {
    try {
      const productData = await Product.findByPk(req.params.id, {
        include: [
          { model: Category},
          { model: Tag, through: ProductTag, as: 'product_tags' },
        ],
      });
  
      if (!productData) {
        res.status(404).json({ message: 'No product found with this id!' });
        return;
      }
  
      res.status(200).json(productData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  // get a product by its 'id'
router.get('/:id', async (req, res) => {
    try {
      const productData = await Product.findByPk(req.params.id, {
        include: [
          { model: Category},
          { model: Tag, through: ProductTag, as: 'product_tags' },
        ],
      });
  
      if (!productData) {
        res.status(404).json({ message: 'No product found with this id!' });
        return;
      }
  
      res.status(200).json(productData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  // create new product
router.post('/', (req, res) => {
    Product.create(req.body)
      .then((product) => {
        // if there's product tags, we need to create pairings to bulk create in the ProductTag model
        if (req.body.tagIds && req.body.tagIds.length) {
          const productTagIdArr = req.body.tagIds.map((tag_id) => {
            return {
              product_id: product.id,
              tag_id,
            };
          });
          return ProductTag.bulkCreate(productTagIdArr);
        }

        // get all products
router.get('/', async (req, res) => {
    try {
      const productData = await Product.findAll({
        include: [
          { 
            model: Category,
            attributes: ['category_name']
          },
          { 
            model: Tag, through: ProductTag, as: 'product_tags',
            attributes: ['tag_name']
          },
        ],
      });
      if(!productData) {
        res.status(404).json({ message: 'No products were found!'});
        return;
      }
      res.status(200).json(productData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
