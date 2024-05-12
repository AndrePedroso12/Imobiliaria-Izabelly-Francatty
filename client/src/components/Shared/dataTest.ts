import type { ImovelType } from '@/interfaces/interfaces'

// data.js
export const ImoveisTeste: ImovelType[] = [
  {
    id: 1,
    banner: true,
    isTop: true,
    category: 'Apartamento',
    model: 'Compra',
    mainImage: 'https://demoapus1.com/justhome/wp-content/uploads/2024/02/slider7.jpg',
    images: [
      'https://s2.glbimg.com/Z5wIQQE_oewkI4Owb1FPGya7VAc=/smart/e.glbimg.com/og/ed/f/original/2015/02/10/apartamento_laura_e_cristina_bezamat_02.jpg',
      'https://www.papoimobiliario.com/wp-content/uploads/2021/12/Apartamentos-alto-padrao-em-Sao-Paulo-750x410-1.jpg',
      'https://www.wkoerich.com.br/wp-content/uploads/2019/05/imagem393_1-960x581.jpg'
    ],
    video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    location: {
      city: 'Jaguariúna',
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
      tags: [
        'Água Incluso',
        'Ar condicionado',
        'Armário banheiro',
        'Armário quarto',
        'Churrasqueira',
        'Em condomínio fechado',
        'Esgoto',
        'Lavabo',
        'Pavimentação',
        'Piso laminado',
        'Aquecimento solar',
        'Armário área de Serviço',
        'Armário cozinha',
        'Campo de futebol',
        'Cozinha',
        'Energia elétrica',
        'Interfone',
        'Lavanderia',
        'Piscina',
        'Porcelanato'
      ]
    },
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lectus elit, tristique eget nisi nec, volutpat porttitor enim. Phasellus vehicula, erat ac placerat tincidunt, purus magna ultrices mauris, sed interdum sem turpis facilisis diam. Quisque consectetur cursus est, ut interdum dolor vestibulum ut. In id lacus vitae eros tempus lobortis. Nullam quis nulla ac purus lacinia ultrices. Donec ullamcorper nisi non massa auctor sodales. Aenean blandit elit ex, non porta massa aliquet vitae. Duis egestas magna sit amet dignissim ultricies. Nulla nec pellentesque odio, eu ultricies nunc. Proin tincidunt libero arcu, eu lacinia purus iaculis a. Cras fringilla ac leo id semper. Ut pharetra mauris tortor, vel interdum velit tincidunt non. Phasellus ac tortor auctor, euismod dui eget, faucibus risus. Proin quis commodo risus, suscipit consequat purus.',
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
    mainImage:
      'https://www.classearpimoveis.com.br/foto_/2021/3153/ribeirao-preto-terreno-condominio-vista-bella-20-10-2021_10-18-11-1.jpg',
    images: ['image13.jpg', 'image14.jpg', 'image15.jpg'],
    video: 'video_url',
    location: {
      city: 'Jaguariúna',
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
    mainImage:
      'https://blog.julianooliva.com.br/wp-content/uploads/2023/01/terreno-na-praia.jpg.webp',
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
    mainImage: 'https://casaantigaimoveis.com.br/wp-content/uploads/2019/05/condominio-806x467.jpg',
    images: ['image19.jpg', 'image20.jpg', 'image21.jpg'],
    video: 'video_url',
    location: {
      city: 'Amparo',
      neighborhood: 'Neighborhood 7'
    },
    price: 300000,
    details: {
      rooms: 4,
      bathrooms: 3,
      garage: 2,
      area: 250,
      tags: ['tag10', 'tag11']
    },
    description: 'Description 7',
    tags: ['Tag 19', 'Tag 20', 'Tag 21'],
    sellerName: 'Seller 7'
  },
  {
    id: 8,
    category: 'Galpão',
    model: 'Alugar',
    mainImage: 'https://mostaza.com.br/wp-content/uploads/2023/05/galpao-metalico-1.jpg',
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
    mainImage:
      'https://www.chavesnamao.com.br/imn/0358x0250/N/imoveis/388262/18439209/sp-jaguariuna-vila-7-de-setembro-rua-dom-pedro-i-apartamento-a-venda-1-quarto-6585ee7f-00.jpg',
    images: ['image28.jpg', 'image29.jpg', 'image30.jpg'],
    video: 'video_url',
    location: {
      city: 'Jaguariúna',
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
    mainImage:
      'https://primaveraimobiliaria.com.br/wp-content/uploads/2020/10/CASA-A-VENDA-JD-MORUMBI-PEDREIRA-1-800x600.jpg',
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
    mainImage:
      'https://static.arboimoveis.com.br/TE0089_DPOZZO/terreno-a-venda-650-m-por-r-155-000-00-vila-nova-matelandia-pr1710352939461tfzwq.jpg',
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
    mainImage:
      'https://s2-g1.glbimg.com/j96EBJaJYwnDUiRCU0NEp8VXrOI=/0x0:5464x3640/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/Y/M/ofPNZ6SfOyq0ASAHr9rw/04-loteamento-nossa-senhora-araquari-1-.jpg',
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
    mainImage:
      'https://www.casamineira.com.br/blog/wp-content/uploads/2022/04/morar-em-condominio-vantagens-desvantagens-1024x576.jpg',
    images: ['image40.jpg', 'image41.jpg', 'image42.jpg'],
    video: 'video_url',
    location: {
      city: 'Jaguariúna',
      neighborhood: 'Neighborhood 14'
    },
    price: 500000,
    details: {
      rooms: 4,
      bathrooms: 3,
      garage: 2,
      area: 250,
      tags: ['tag24', 'tag25']
    },
    description: 'Description 14',
    tags: ['Tag 40', 'Tag 41', 'Tag 42'],
    sellerName: 'Seller 14'
  },
  {
    id: 15,
    category: 'Galpão',
    model: 'Alugar',
    mainImage:
      'https://deltafacilities1.websiteseguro.com/blog/wp-content/uploads/2021/09/galpao_metalico_duas_aguas_beta_plus.jpeg',
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
