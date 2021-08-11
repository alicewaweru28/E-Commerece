// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

module.exports = {
    Product,
    Category,
    Tag,
    ProductTag,
  };

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false,
  },
  as: 'product_tags',
  foreignKey: 'product_id',
});

// Categories have many Products
Category.hasMany(Product, {
    foreignKey: 'category_id',
  });

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false,
  },
  as: 'products_tagged',
  foreignKey: 'tag_id'
});
