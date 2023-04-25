// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
//WHEN A CATEGORY GETS DELETED ALL PRODUCTS ARE DELETED
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'product_id',
  onUpdate: 'CASCADE'
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  foreignKey: 'tag_id',
  through: {
    model: ProductTag,
    unique: false
  },
})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  foreignKey: 'product_id',
  through: {
    model: ProductTag,
    unique: false
  },
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
