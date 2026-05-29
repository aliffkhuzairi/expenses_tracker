const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.json({message: "Express API is running"});
})

app.listen(PORT, () => {
    console.log(`Server is running on  http://localhost:${PORT}`);
})