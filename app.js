const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); 
app.use(express.static('public'));

// MySQL Database Configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '$tick$$stick',         // Replace with your MySQL password
    database: 'witch',
});

// Connect to the Database
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});
// Route to Fetch and Display Employee Data
app.get('/', (req, res) => {
    const query = "SELECT * FROM employees ORDER BY Name DESC";
    db.query(query, (err, results) => {
        if (err) {
            console.error('Failed to fetch data:', err.stack);
           res.status(500).send('Error fetching data.');
           return;
        }
        res.render('index', { employees: results });
    });
});

app.post("/update-department", (req, res) => {
    const { name, newdepartment} = req.body;

    const updateQuery = "UPDATE employees SET Department =? WHERE Name =?";
     db.query(updateQuery, [newdepartment, name], (err, result) => {
        if (err) {
            console.err('Failed to update department:', err.stack);
            res.status(500).send("Error updating department.");
            return;
        }
     
        console.log(`Department updated for Name: ${name}`);
        res.redirect("/");
    });
});


app.listen(PORT, ()=> {
    console.log (`Server running on http:localhost:${PORT}`);
});