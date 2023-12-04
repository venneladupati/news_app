const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const axios = require('axios'); // Add Axios for making HTTP requests
const app = express();
const port = 3000;

const db = require('./database'); // Import the SQLite database instance

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

app.use(bodyParser.json());

// Endpoint for fetching news based on region
app.get('/api/news', async (req, res) => {
    try {
        const region = 'us';

try {
    const newsResponse = await axios.get(`https://newsapi.org/v2/top-headlines`, {
        params: {
            country: region,
            apiKey: '0bbcc762b3334567b4f5dc90666b9b5e' 
        }
    });

    // Handle the response and update your map or UI accordingly
    console.log(newsResponse.data); // Log the response data for debugging
} catch (error) {
    console.error('Error fetching news:', error.response ? error.response.data : error.message);
    // Handle the error 
}

        // Assuming the API response has articles in the 'articles' property
        const newsData = newsResponse.data.articles;

        // Insert news data into the 'news' table
        const stmt = db.prepare('INSERT INTO news (title, description, lat, lng) VALUES (?, ?, ?, ?)');
        newsData.forEach((article) => {
            stmt.run(article.title, article.description, Math.random() * 180 - 90, Math.random() * 360 - 180);
        });
        stmt.finalize();

        // Retrieve news data from the 'news' table
        db.all('SELECT * FROM news', (err, rows) => {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.json(rows);
            }
        });
        console.log(newsResponse.data); // Log the response data for debugging
} catch (error) {
    console.error('Error fetching news:', error.response ? error.response.data : error.message);
    // Handle the error (e.g., show an error message to the user)
}
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
