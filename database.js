const sqlite3 = require('sqlite3');

const db = new sqlite3.Database(':memory:'); // In-memory SQLite database

// Create a 'news' table
db.serialize(() => {
    db.run('CREATE TABLE news (id INTEGER PRIMARY KEY, title TEXT, description TEXT, lat REAL, lng REAL)');
});

module.exports = db;
