//Tables: Users, Comments, Paintings, Artists, Collections, Saves
//Tables that should start with data are Paintings, Artists, and Collections
//Paintings has dependencies in Artists and Collections, Comments and Saves are dependent on Users and Paintings

//import client and seed data
const client = require('./client')
const { collections, artists, paintings } = require('./seedData.js')

//Drop tables
async function dropTables () {
    try {
        console.log('Starting to drop tables')
        await client.query(`
        DROP TABLE IF EXISTS saves;
        DROP TABLE IF EXISTS comments;
        DROP TABLE IF EXISTS paintings;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS collections;
        DROP TABLE IF EXISTS artists;
        `)
        console.log('Tables Dropped')
    } catch (error) {
        console.log('Error dropping tables')
        throw error
    }
}

//create tables
async function createTables () {
    console.log('Building tables')
    await client.query(`
        CREATE TABLE collections (
            id SERIAL PRIMARY KEY, 
            title varchar(25) UNIQUE NOT NULL
        );
        CREATE TABLE artists (
            id SERIAL PRIMARY KEY,
            name varchar(50) UNIQUE NOT NULL,
            bio TEXT NOT NULL,
            image TEXT NOT NULL,
            email varchar(50),
            link TEXT
        );
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            name varchar(25) NOT NULL,
            username varchar(25) UNIQUE NOT NULL,
            password TEXT NOT NULL
        );
        CREATE TABLE paintings (
            id SERIAL PRIMARY KEY,
            title varchar(50) UNIQUE NOT NULL,
            image TEXT NOT NULL,
            description varchar(200) NOT NULL,
            available BOOLEAN NOT NULL,
            "artistId" INTEGER REFERENCES artists("id") NOT NULL,
            "collectionId" INTEGER REFERENCES collections("id")
        );
        CREATE TABLE comments (
            id SERIAL PRIMARY KEY,
            title varchar(25),
            content varchar(255) NOT NULL,
            "lastUpdated" TIMESTAMP NOT NULL,
            edited BOOLEAN NOT NULL,
            "paintingId" INTEGER REFERENCES paintings("id") NOT NULL,
            "userId" INTEGER REFERENCES users("id") NOT NULL
        );
        CREATE TABLE saves (
            id SERIAL PRIMARY KEY,
            "paintingId" INTEGER REFERENCES paintings("id") NOT NULL,
            "userId" INTEGER REFERENCES users("id") NOT NULL
        );
    `)
    console.log('tables built!')
}

async function initCollections () {
    try {
        console.log('initializing Collections')
        for (const collection of collections) {
            const {
                rows: [collectionName]
            } = await client.query(`
                INSERT INTO collections(title)
                VALUES($1);
            `, [collection])
        }
        console.log('Collections initialized')
    } catch (error) {
        throw error
    }
}

async function initArtists () {
    try {
        console.log('initializing Artists')
        for (const artist of artists) {
            const {
                rows: [artists]
            } = await client.query(`
                INSERT INTO artists(name, bio, image, email, link)
                VALUES($1, $2, $3, $4, $5);
            `, [artist.name, artist.bio, artist.image, artist.email ? artist.email : null, artist.link ? artist.link : null]
            )
        }
        console.log('Artists initialized')
    } catch (error) {
        throw error
    }
}

async function initPaintings () {
    try {
        console.log('initializing Paintings')
        for (const painting of paintings) {
            const {
                rows: [paintings]
            } = await client.query(`
                INSERT INTO paintings(title, image, description, available, "artistId", "collectionId")
                VALUES($1, $2, $3, $4, $5, $6);
            `, [painting.title, painting.image, painting.description, painting.available, painting.artistId, painting.collectionId ? painting.collectionId : null]
            )
        }
        console.log('Paintings initialized')
    } catch (error) {
        throw error
    }
}

async function build () {
    try {
        client.connect()
        
        await dropTables()
        await createTables()

        await initCollections()
        await initArtists()
        await initPaintings()
    } catch (error) {
        console.error(error)
    } finally {
        client.end()
    }
}

build()