//Tables: Users, Comments, Paintings, Artists, Collections, Saves
//Tables that should start with data are Paintings, Artists, and Collections
//Paintings has dependencies in Artists and Collections

//Collections can be an array of Collection Titles
const collections = [
    'Slug Trails',
    'Clue',
    'The Triptic',
    'Display',
    'Recylcing',
    'Cult Classics',
]

//Artists require: name, bio, image. may contain: email, link
const artists = [
    {name: 'Cara Uhrich', bio: 'Pandemic Artist!', image: 'https://imgur.com/NzNHEhL', email: 'carauhrich@gmail.com'},
    {name: 'Kirsten Brink', bio: 'Chaos!', image: 'placeholder', link: 'https://www.instagram.com/chaosbykay?igsh=OHI3eGJ2YTR4dmhk'},
    {name: 'Ryanne McEvoy', bio: 'Follow the Flow', image: 'placeholder'}
]

//Paintings require: Title, image, description, available, artistId. May contain: collectionId
const paintings = [
    {title: 'Anti Slug Trails', image: 'https://i.imgur.com/G15rXye.jpg', description: 'Acrylic on canvas vertical panel. A perminent piece of the Nonantum Collection', available: false, artistId: 1, collectionId: 1},
    {title: 'Carnival', image: 'https://i.imgur.com/eh5EQjA.jpg', description: 'Acrylic on canvas', available: true, artistId: 1},
    {title: 'Banana Slug Trails', image: 'https://i.imgur.com/bSetavE.jpg', description: 'Acrylic on canvas vertical panel. A perminent piece of the Nonantum Collection', available: false, artistId: 1, collectionId: 1},
    {title: 'Cloud Cover', image: 'https://i.imgur.com/N8hUpQV.jpg', description: 'Acrylic on canvas horizontal panel. On display at the Tremont Gallery', available: false, artistId: 1},
    {title: 'Colonel Mustard', image: 'https://i.imgur.com/KRR49fw.jpg', description: 'Acrylic on canvas board', available: true, artistId: 1, collectionId: 2},
    {title: 'Cultish Behaviors', image: 'https://i.imgur.com/NzNHEhL.jpg', description: 'Acrylic on canvas', available: true, artistId: 1, collectionId: 6},
    {title: 'Finger Print', image: 'https://i.imgur.com/loW3s82.jpg', description: 'Acrylic on canvas board', available: true, artistId: 1},
    {title: 'Braid', image: 'https://i.imgur.com/MVJtp6X.jpg', description: 'Acrylic on canvas', available: true, artistId: 1},
    {title: 'Fire Elemental', image: 'https://i.imgur.com/HkFuLP5.jpg', description: 'Acrylic on canvas vertical panel. A perminent piece of the Nonantum Collection', available: false, artistId: 1, collectionId: 3},
    {title: 'Autumn', image: 'https://i.imgur.com/T3McPBX.jpg', description: 'Acrylic on canvas', available: true, artistId: 1},
    {title: 'Chameleon', image: 'https://i.imgur.com/MbHBY6k.jpg', description: 'Acrylic on canvas', available: true, artistId: 1},
    {title: 'Deconstructed', image: 'https://i.imgur.com/5urKuMj.jpg', description: 'Acrylic on canvas', available: true, artistId: 1},
    {title: 'Forest Floor', image: 'https://i.imgur.com/1Nn53Qe.jpg', description: 'Acrylic on canvas board', available: true, artistId: 1},
    {title: 'Froider', image: 'https://i.imgur.com/MIRSmkq.jpg', description: 'Acrylic on canvas vertical panel. A perminent piece of the Nonantum Collection', available: false, artistId: 1, collectionId: 3},
    {title: 'Geodes', image: 'https://i.imgur.com/Tys7tNG.jpg', description: 'Acrylic on canvas board. On display at the Tremont Gallery', available: false, artistId: 1},
    {title: 'Drag Queen', image: 'https://i.imgur.com/7GeLAhG.jpg', description: 'Acrylic on canvas', available: true, artistId: 1},
    {title: 'Forest', image: 'https://i.imgur.com/EV7JUfT.jpg', description: 'Acrylic on canvas board', available: true, artistId: 1},
    {title: 'Growth in Chaos', image: 'https://i.imgur.com/l8OHa3m.jpg', description: 'Acrylic on canvas', available: true, artistId: 1},
    {title: 'Lady Luck', image: 'https://i.imgur.com/NJS19zc.jpg', description: 'Acrylic on canvas board', available: true, artistId: 1}
]

//export data
module.exports = { collections, artists, paintings }