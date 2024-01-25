//Tables: Users, Comments, Paintings, Artists, Collections, Saves
//Tables that should start with data are Paintings, Artists, and Collections
//Paintings has dependencies in Artists and Collections

//Collections can be an array of Collection Titles
const collections = [
    'Slug Trails',
    'Clue',
    'The Triptic',
    'Never Say Never',
    'Recylcing',
    'Cult Classics',
    'Redacted',
    'Florida, Man'
]

//Artists require: name, bio, image. may contain: email, link
const artists = [
    {name: 'Cara Uhrich', bio: 'Pandemic Artist!', image: 'https://i.imgur.com/NzNHEhL.jpg', email: 'carauhrich@gmail.com'},
    {name: 'Kirsten Brink', bio: 'Chaos!', image: 'placeholder', link: 'https://www.instagram.com/chaosbykay?igsh=OHI3eGJ2YTR4dmhk'},
    {name: 'Ryanne McEvoy', bio: 'Follow the Flow', image: 'placeholder'}
    {name: 'Jenny Wicks', bio: 'Exciting!', image: 'placeholder'}
]

//Paintings require: Title, image, description, available, artistId. May contain: collectionId
const paintings = [
    {title: '144146', image: 'https://i.imgur.com/kh2WYnR.jpg', description: 'Acrylic on canvas board', available: true, artistId: 3},
    {title: "90's Bus Seat", image: 'https://i.imgur.com/EpRmaJ7.jpg', description: 'Acrylic on canvas', available: true, artistId: 3},
    {title: 'Altered Alt Altarpiece', image: 'https://i.imgur.com/sc69MEK.jpg', description: 'Acrylic on canvas', available: true, artistId: 3},
    {title: 'A Time to Reflect', image: 'https://i.imgur.com/N16zyS6.jpg', description: 'Acrylic on canvas', available: true, artistId: 4},
    {title: 'Anti Slug Trails', image: 'https://i.imgur.com/G15rXye.jpg', description: 'Acrylic on canvas vertical panel', available: false, artistId: 1, collectionId: 1},
    {title: 'Autumn', image: 'https://i.imgur.com/T3McPBX.jpg', description: 'Acrylic on canvas', available: true, artistId: 1},
    {title: 'Banana Slug Trails', image: 'https://i.imgur.com/bSetavE.jpg', description: 'Acrylic on canvas vertical panel', available: false, artistId: 1, collectionId: 1},
    {title: 'Beads?', image: 'https://i.imgur.com/1aW271p.jpg', description: 'Acrylic on canvas vertical panel', available: false, artistId: 3, collectionId: 7},
    {title: 'Ben Wobbles', image: 'https://i.imgur.com/fkERyRg.jpg', description: 'Acrylic on canvas board', available: true, artistId: 3, collectionId: 7},
    {title: 'Beware the Fae', image: 'https://i.imgur.com/8pS4ChK.jpg', description: 'Acrylic on canvas', available: true, artistId: 3},
    {title: 'Blunt Force Triangle', image: 'https://i.imgur.com/sFSNhFt.jpg', description: 'Acrylic on canvas', available: true, artistId: 3},
    {title: 'Boundless', image: 'https://i.imgur.com/iglY4HX.jpg', description: 'Acrylic on canvas horizontal panel', available: true, artistId: 2},
    {title: 'Braid', image: 'https://i.imgur.com/MVJtp6X.jpg', description: 'Acrylic on canvas', available: true, artistId: 1},
    {title: 'Bubble Theory', image: 'https://i.imgur.com/pj3QuIn.jpg', description: 'Acrylic on canvas board', available: true, artistId: 3},
    {title: 'Celebration', image: 'https://i.imgur.com/Pelc3rd.jpg', description: 'Acrylic on canvas', available: true, artistId: 1},
    {title: 'Chameleon', image: 'https://i.imgur.com/MbHBY6k.jpg', description: 'Acrylic on canvas', available: true, artistId: 1},
    {title: "Chiffon en l'Eau", image: 'https://i.imgur.com/Uk7BqD4.jpg', description: 'Acrylic pouring paint on canvas board', available: true, artistId: 3},
    {title: 'Chromatograph', image: 'https://i.imgur.com/Gnc3ipg.jpg', description: 'Acrylic on canvas', available: true, artistId: 3},
    {title: 'Cloud Cover', image: 'https://i.imgur.com/N8hUpQV.jpg', description: 'Acrylic on canvas horizontal panel', available: false, artistId: 1},
    {title: 'Cross-Section', image: 'https://i.imgur.com/BhUHfOU.jpg', description: 'Acrylic pouring paint on canvas board', available: true, artistId: 3},
    {title: 'Colonel Mustard', image: 'https://i.imgur.com/KRR49fw.jpg', description: 'Acrylic on canvas board', available: true, artistId: 1, collectionId: 2},
    {title: 'Composition Notebook', image: 'https://i.imgur.com/0dFMDrU.jpg', description: 'Acrylic on canvas board', available: true, artistId: 3},
    {title: 'Covid Spike', image: 'https://i.imgur.com/KDytj59.jpg', description: 'Acrylic on canvas', available: true, artistId: 3},
    {title: 'Crimping Iron', image: 'https://i.imgur.com/S6f9SFs.jpg', description: 'Acrylic on canvas', available: true, artistId: 2},
    {title: 'Cultish Behaviors', image: 'https://i.imgur.com/NzNHEhL.jpg', description: 'Acrylic on canvas', available: true, artistId: 1, collectionId: 6},
    {title: 'Deconstructed', image: 'https://i.imgur.com/5urKuMj.jpg', description: 'Acrylic on canvas', available: true, artistId: 1},
    {title: 'Do You Remember Osmosis Jones?', image: 'https://i.imgur.com/n8JiYT3.jpg', description: 'Acrylic on canvas board', available: true, artistId: 3},
    {title: 'Dusk on Fire', image: 'https://i.imgur.com/kNt6aBk.jpg', description: 'Acrylic on canvas', available: true, artistId: 4},
    {title: 'Eggsuberance', image: 'https://i.imgur.com/eCdtRs0.jpg', description: 'Acrylic on canvas', available: true, artistId: 4},
    {title: 'Enoki', image: 'https://i.imgur.com/dQOYvvx.jpg', description: 'Acrylic on canvas', available: true, artistId: 3},
    {title: 'Fairyland', image: 'https://i.imgur.com/cEa6xCm.jpg', description: 'Acrylic on canvas', available: true, artistId: 4},
    {title: 'Finger Print', image: 'https://i.imgur.com/loW3s82.jpg', description: 'Acrylic on canvas board', available: true, artistId: 1},
    {title: 'Fire Elemental', image: 'https://i.imgur.com/HkFuLP5.jpg', description: 'Acrylic on canvas vertical panel', available: false, artistId: 1, collectionId: 3},
    {title: 'Fireworks', image: 'https://i.imgur.com/kLCAlwT.jpg', description: 'Acrylic on canvas', available: true, artistId: 2},
    {title: 'First Crack', image: 'https://i.imgur.com/ZYdASeK.jpg', description: 'Acrylic on canvas', available: false, artistId: 2, collectionId: 6},
    {title: 'Fissure', image: 'https://i.imgur.com/8ntZ8vy.jpg', description: 'Acrylic on canvas', available: false, artistId: 3},
    {title: 'Forest Floor', image: 'https://i.imgur.com/1Nn53Qe.jpg', description: 'Acrylic on canvas board', available: true, artistId: 1},
    {title: 'F(r)og', image: 'https://i.imgur.com/YsRCy0U.jpg', description: 'Acrylic on canvas', available: false, artistId: 3, collectionId: 8},
    {title: 'Froider', image: 'https://i.imgur.com/MIRSmkq.jpg', description: 'Acrylic on canvas vertical panel. A perminent piece of the Nonantum Collection', available: false, artistId: 1, collectionId: 3},
    {title: 'Geodes', image: 'https://i.imgur.com/Tys7tNG.jpg', description: 'Acrylic on canvas board. On display at the Tremont Gallery', available: false, artistId: 1},
    {title: 'Drag Queen', image: 'https://i.imgur.com/7GeLAhG.jpg', description: 'Acrylic on canvas', available: true, artistId: 1},
    {title: 'Forest', image: 'https://i.imgur.com/EV7JUfT.jpg', description: 'Acrylic on canvas board', available: true, artistId: 1},
    {title: 'Growth in Chaos', image: 'https://i.imgur.com/l8OHa3m.jpg', description: 'Acrylic on canvas', available: true, artistId: 1},
    {title: 'Lady Luck', image: 'https://i.imgur.com/NJS19zc.jpg', description: 'Acrylic on canvas board', available: true, artistId: 1},
    {title: 'Show Girl', image: 'https://i.imgur.com/eh5EQjA.jpg', description: 'Acrylic on canvas', available: true, artistId: 1},
]

//export data
module.exports = { collections, artists, paintings }