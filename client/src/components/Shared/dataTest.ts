import type { ImovelType } from '@/interfaces/interfaces'

// data.js
export const ImoveisTeste: ImovelType[] = [
  {
    id: 1,
    banner: true,
    category: 'Apartamento',
    model: 'Compra',
    mainImage: 'https://demoapus1.com/justhome/wp-content/uploads/2024/02/slider7.jpg',
    images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
    video: 'video_url',
    location: {
      city: 'Jaguariuna',
      neighborhood: 'Nova Jaguariúna'
    },
    price: 1000,
    monthly: 500,
    details: {
      rooms: 2,
      bathrooms: 1,
      garage: 1,
      suites: 1,
      area: 100,
      tags: ['tag1', 'tag2']
    },
    description: 'Description 1',
    tags: ['Tag 1', 'Tag 2', 'Tag 3'],
    sellerName: 'Seller 1'
  },
  {
    id: 2,
    banner: true,
    category: 'Casa',
    model: 'Alugar',
    mainImage:
      'https://conteudos.gtbuilding.com.br/wp-content/uploads/2021/12/apartamento-de-luxo-capa.jpg',
    images: ['image4.jpg', 'image5.jpg', 'image6.jpg'],
    video: 'video_url',
    location: {
      city: 'Jaguariúna',
      neighborhood: 'Lago da Barra'
    },
    price: 2000,
    details: {
      rooms: 3,
      bathrooms: 2,
      garage: 2,
      suites: 2,
      area: 200,
      tags: ['tag3', 'tag4']
    },
    description: 'Description 2',
    tags: ['Tag 4', 'Tag 5', 'Tag 6'],
    sellerName: 'Seller 2'
  },
  {
    id: 3,
    banner: true,
    category: 'Apartamento',
    model: 'Compra',
    mainImage:
      'https://www.estilofontana.com.br/blog/wp-content/uploads/2023/06/f-v-apto-estar-ef-web-603502429cc73-1024x576.jpg',
    images: ['image7.jpg', 'image8.jpg', 'image9.jpg'],
    video: 'video_url',
    location: {
      city: 'Amparo',
      neighborhood: 'Tamboré'
    },
    price: 1500,
    monthly: 600,
    details: {
      rooms: 1,
      bathrooms: 1,
      garage: 0,
      suites: 1,
      area: 70,
      tags: ['tag5', 'tag6']
    },
    description: 'Description 3',
    tags: ['Tag 7', 'Tag 8', 'Tag 9'],
    sellerName: 'Seller 3'
  },
  {
    id: 4,
    banner: true,
    isfavourite: true,
    category: 'Casa',
    model: 'Alugar',
    mainImage:
      'https://arquivos-blog.s3.amazonaws.com/mariliaveiga/wp-content/uploads/2021/06/apartamentos-decorados-de-luxo-blog-marilia-veiga-capa.jpg',
    images: ['image10.jpg', 'image11.jpg', 'image12.jpg'],
    video: 'video_url',
    location: {
      city: 'São Paulo',
      neighborhood: 'Alphaville'
    },
    price: 2500,
    details: {
      rooms: 4,
      bathrooms: 3,
      garage: 2,
      suites: 2,
      area: 250,
      tags: ['tag10', 'tag11']
    },
    description: 'Description 4',
    tags: ['Tag 10', 'Tag 11', 'Tag 12'],
    sellerName: 'Seller 4'
  },
  {
    id: 5,
    isfavourite: true,
    category: 'Terreno',
    model: 'Compra',
    mainImage: 'main_image_5.jpg',
    images: ['image13.jpg', 'image14.jpg', 'image15.jpg'],
    video: 'video_url',
    location: {
      city: 'Jaguariuna',
      neighborhood: 'Neighborhood 5'
    },
    price: 50000,
    details: {
      area: 500,
      tags: ['tag12', 'tag13']
    },
    description: 'Description 5',
    tags: ['Tag 13', 'Tag 14', 'Tag 15'],
    sellerName: 'Seller 5'
  },
  {
    id: 6,
    category: 'Area',
    model: 'Compra',
    mainImage: 'main_image_6.jpg',
    images: ['image16.jpg', 'image17.jpg', 'image18.jpg'],
    video: 'video_url',
    location: {
      city: 'Pedreira',
      neighborhood: 'Neighborhood 6'
    },
    price: 100000,
    details: {
      area: 1000,
      tags: ['tag14', 'tag15']
    },
    description: 'Description 6',
    tags: ['Tag 16', 'Tag 17', 'Tag 18'],
    sellerName: 'Seller 6'
  },
  {
    id: 7,
    isfavourite: true,
    category: 'Condomínio',
    model: 'Compra',
    mainImage: 'main_image_7.jpg',
    images: ['image19.jpg', 'image20.jpg', 'image21.jpg'],
    video: 'video_url',
    location: {
      city: 'Amparo',
      neighborhood: 'Neighborhood 7'
    },
    price: 300000,
    details: {
      area: 1500,
      tags: ['tag16', 'tag17']
    },
    description: 'Description 7',
    tags: ['Tag 19', 'Tag 20', 'Tag 21'],
    sellerName: 'Seller 7'
  },
  {
    id: 8,
    category: 'Galpão',
    model: 'Alugar',
    mainImage: 'main_image_8.jpg',
    images: ['image22.jpg', 'image23.jpg', 'image24.jpg'],
    video: 'video_url',
    location: {
      city: 'São Paulo',
      neighborhood: 'Neighborhood 8'
    },
    price: 5000,
    details: {
      area: 2000,
      tags: ['tag18', 'tag19']
    },
    description: 'Description 8',
    tags: ['Tag 22', 'Tag 23', 'Tag 24'],
    sellerName: 'Seller 8'
  },
  {
    id: 9,
    category: 'Casa',
    model: 'Compra',
    isfavourite: true,
    mainImage: 'https://demoapus1.com/justhome/wp-content/uploads/2024/03/p11-500x500.jpg',
    images: ['image25.jpg', 'image26.jpg', 'image27.jpg'],
    video: 'video_url',
    location: {
      city: 'São Paulo',
      neighborhood: 'Neighborhood 9'
    },
    price: 400000,
    details: {
      rooms: 5,
      bathrooms: 4,
      garage: 3,
      suites: 3,
      area: 300,
      tags: ['tag20', 'tag21']
    },
    description: 'Description 9',
    tags: ['Tag 25', 'Tag 26', 'Tag 27'],
    sellerName: 'Seller 9'
  },
  {
    id: 10,
    category: 'Apartamento',
    model: 'Compra',
    mainImage: 'main_image_10.jpg',
    images: ['image28.jpg', 'image29.jpg', 'image30.jpg'],
    video: 'video_url',
    location: {
      city: 'Jaguariuna',
      neighborhood: 'Neighborhood 10'
    },
    price: 1500,
    monthly: 700,
    details: {
      rooms: 3,
      bathrooms: 2,
      garage: 1,
      suites: 2,
      area: 120,
      tags: ['tag22', 'tag23']
    },
    description: 'Description 10',
    tags: ['Tag 28', 'Tag 29', 'Tag 30'],
    sellerName: 'Seller 10'
  },
  {
    id: 11,
    category: 'Casa',
    model: 'Alugar',
    mainImage: 'main_image_11.jpg',
    images: ['image31.jpg', 'image32.jpg', 'image33.jpg'],
    video: 'video_url',
    location: {
      city: 'Pedreira',
      neighborhood: 'Neighborhood 11'
    },
    price: 2500,
    details: {
      rooms: 4,
      bathrooms: 3,
      garage: 2,
      suites: 2,
      area: 250,
      tags: ['tag24', 'tag25']
    },
    description: 'Description 11',
    tags: ['Tag 31', 'Tag 32', 'Tag 33'],
    sellerName: 'Seller 11'
  },
  {
    id: 12,
    category: 'Terreno',
    model: 'Compra',
    mainImage: 'main_image_12.jpg',
    images: ['image34.jpg', 'image35.jpg', 'image36.jpg'],
    video: 'video_url',
    location: {
      city: 'Amparo',
      neighborhood: 'Neighborhood 12'
    },
    price: 80000,
    details: {
      area: 800,
      tags: ['tag26', 'tag27']
    },
    description: 'Description 12',
    tags: ['Tag 34', 'Tag 35', 'Tag 36'],
    sellerName: 'Seller 12'
  },
  {
    id: 13,
    category: 'Area',
    isfavourite: true,
    model: 'Compra',
    mainImage: 'main_image_13.jpg',
    images: ['image37.jpg', 'image38.jpg', 'image39.jpg'],
    video: 'video_url',
    location: {
      city: 'São Paulo',
      neighborhood: 'Neighborhood 13'
    },
    price: 200000,
    details: {
      area: 2000,
      tags: ['tag28', 'tag29']
    },
    description: 'Description 13',
    tags: ['Tag 37', 'Tag 38', 'Tag 39'],
    sellerName: 'Seller 13'
  },
  {
    id: 14,
    category: 'Condomínio',
    isfavourite: true,
    model: 'Compra',
    mainImage: 'main_image_14.jpg',
    images: ['image40.jpg', 'image41.jpg', 'image42.jpg'],
    video: 'video_url',
    location: {
      city: 'Jaguariuna',
      neighborhood: 'Neighborhood 14'
    },
    price: 500000,
    details: {
      area: 3000,
      tags: ['tag30', 'tag31']
    },
    description: 'Description 14',
    tags: ['Tag 40', 'Tag 41', 'Tag 42'],
    sellerName: 'Seller 14'
  },
  {
    id: 15,
    category: 'Galpão',
    model: 'Alugar',
    mainImage: 'main_image_15.jpg',
    images: ['image43.jpg', 'image44.jpg', 'image45.jpg'],
    video: 'video_url',
    location: {
      city: 'São Paulo',
      neighborhood: 'Neighborhood 15'
    },
    price: 6000,
    details: {
      area: 2500,
      tags: ['tag32', 'tag33']
    },
    description: 'Description 15',
    tags: ['Tag 43', 'Tag 44', 'Tag 45'],
    sellerName: 'Seller 15'
  }
]
