export const products = [
  {
    id: 1,
    name: 'Hydrating Face Serum',
    category: 'Skincare',
    price: 1299,
    rating: 4.8,
    reviewCount: 124,
    image: 'https://cdn.pixabay.com/photo/2018/01/16/10/20/cosmetics-3085578_1280.jpg',
    description: 'Deeply hydrating serum with hyaluronic acid and vitamin E',
    isBestseller: true,
    shades: [{ id: 1, name: 'Default', color: '#f5f5f5' }],
    images: [
      { id: 1, src: 'https://cdn.pixabay.com/photo/2018/01/16/10/20/cosmetics-3085578_1280.jpg', alt: 'Hydrating Face Serum' },
      { id: 2, src: 'https://cdn.pixabay.com/photo/2016/11/19/11/33/cosmetology-1838985_1280.jpg', alt: 'Hydrating Face Serum in use' }
    ]
  },
  {
    id: 2,
    name: 'Natural Glow Blush',
    category: 'Makeup',
    price: 899,
    rating: 4.5,
    reviewCount: 89,
    image: 'https://cdn.pixabay.com/photo/2016/10/22/20/55/makeup-brushes-1761648_1280.jpg',
    description: 'Buildable blush for a natural flush of color',
    isBestseller: true,
    shades: [
      { id: 1, name: 'Peach Bloom', color: '#ffaa80' },
      { id: 2, name: 'Rose Petal', color: '#ff8080' }
    ],
    images: [
      { id: 1, src: 'https://cdn.pixabay.com/photo/2016/10/22/20/55/makeup-brushes-1761648_1280.jpg', alt: 'Natural Glow Blush' },
      { id: 2, src: 'https://cdn.pixabay.com/photo/2016/10/13/00/13/brush-1736289_1280.jpg', alt: 'Natural Glow Blush application' }
    ]
  },
  {
    id: 3,
    name: 'Nourishing Hair Oil',
    category: 'Hair Care',
    price: 749,
    rating: 4.7,
    reviewCount: 56,
    image: 'https://cdn.pixabay.com/photo/2016/11/19/11/33/cosmetology-1838985_1280.jpg',
    description: 'Lightweight oil blend to nourish and add shine',
    isBestseller: false,
    shades: [{ id: 1, name: 'Default', color: '#f5f5f5' }],
    images: [
      { id: 1, src: 'https://cdn.pixabay.com/photo/2016/11/19/11/33/cosmetology-1838985_1280.jpg', alt: 'Nourishing Hair Oil' },
      { id: 2, src: 'https://cdn.pixabay.com/photo/2016/11/23/14/37/blur-1853262_1280.jpg', alt: 'Nourishing Hair Oil application' }
    ]
  },
  {
    id: 4,
    name: 'Revitalizing Body Scrub',
    category: 'Body Care',
    price: 649,
    rating: 4.6,
    reviewCount: 42,
    image: 'https://cdn.pixabay.com/photo/2016/01/19/15/07/spa-1149393_1280.jpg',
    description: 'Exfoliating scrub with natural ingredients',
    isBestseller: false,
    shades: [{ id: 1, name: 'Default', color: '#f5f5f5' }],
    images: [
      { id: 1, src: 'https://cdn.pixabay.com/photo/2016/01/19/15/07/spa-1149393_1280.jpg', alt: 'Revitalizing Body Scrub' },
      { id: 2, src: 'https://cdn.pixabay.com/photo/2015/01/05/22/29/salt-589449_1280.jpg', alt: 'Revitalizing Body Scrub ingredients' }
    ]
  },
  {
    id: 5,
    name: 'Botanical Eau de Parfum',
    category: 'Fragrance',
    price: 1899,
    rating: 4.9,
    reviewCount: 78,
    image: 'https://cdn.pixabay.com/photo/2016/03/27/19/43/perfume-1283599_1280.jpg',
    description: 'Floral and woody notes in a long-lasting fragrance',
    isBestseller: true,
    shades: [{ id: 1, name: 'Default', color: '#f5f5f5' }],
    images: [
      { id: 1, src: 'https://cdn.pixabay.com/photo/2016/03/27/19/43/perfume-1283599_1280.jpg', alt: 'Botanical Eau de Parfum' },
      { id: 2, src: 'https://cdn.pixabay.com/photo/2018/11/14/03/37/perfume-3814363_1280.jpg', alt: 'Botanical Eau de Parfum bottle' }
    ]
  },
  {
    id: 6,
    name: 'Vitamin C Brightening Cream',
    category: 'Skincare',
    price: 1099,
    rating: 4.7,
    reviewCount: 103,
    image: 'https://cdn.pixabay.com/photo/2018/07/11/21/51/toast-3532016_1280.jpg',
    description: 'Brightening face cream with vitamin C and antioxidants',
    isBestseller: true,
    shades: [{ id: 1, name: 'Default', color: '#f5f5f5' }],
    images: [
      { id: 1, src: 'https://cdn.pixabay.com/photo/2018/07/11/21/51/toast-3532016_1280.jpg', alt: 'Vitamin C Brightening Cream' },
      { id: 2, src: 'https://cdn.pixabay.com/photo/2015/12/09/17/11/moisturizer-1085555_1280.jpg', alt: 'Vitamin C Brightening Cream application' }
    ]
  },
  {
    id: 7,
    name: 'Volumizing Mascara',
    category: 'Makeup',
    price: 799,
    rating: 4.4,
    reviewCount: 67,
    image: 'https://cdn.pixabay.com/photo/2017/09/07/19/43/soap-2726387_1280.jpg',
    description: 'Buildable mascara for dramatic volume and length',
    isBestseller: false,
    shades: [{ id: 1, name: 'Black', color: '#000000' }],
    images: [
      { id: 1, src: 'https://cdn.pixabay.com/photo/2017/09/07/19/43/soap-2726387_1280.jpg', alt: 'Volumizing Mascara' },
      { id: 2, src: 'https://cdn.pixabay.com/photo/2017/05/31/21/52/mascara-2361853_1280.jpg', alt: 'Volumizing Mascara application' }
    ]
  },
  {
    id: 8,
    name: 'Repairing Hair Mask',
    category: 'Hair Care',
    price: 849,
    rating: 4.8,
    reviewCount: 49,
    image: 'https://cdn.pixabay.com/photo/2016/03/28/10/05/soap-1285241_1280.jpg',
    description: 'Deep conditioning mask for damaged hair',
    isBestseller: true,
    shades: [{ id: 1, name: 'Default', color: '#f5f5f5' }],
    images: [
      { id: 1, src: 'https://cdn.pixabay.com/photo/2016/03/28/10/05/soap-1285241_1280.jpg', alt: 'Repairing Hair Mask' },
      { id: 2, src: 'https://cdn.pixabay.com/photo/2016/11/23/14/37/blur-1853262_1280.jpg', alt: 'Repairing Hair Mask application' }
    ]
  }
];

export const getBestsellers = () => {
  return products.filter(product => product.isBestseller);
};

export const getProductById = (id) => {
  return products.find(product => product.id === Number(id));
};

export const getProductsByCategory = (category) => {
  if (category === 'All') return products;
  return products.filter(product => product.category === category);
};