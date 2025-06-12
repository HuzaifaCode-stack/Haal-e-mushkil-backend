const mongoose = require('mongoose');


const db =() => {
mongoose.connect(process.env.DB_URL
)
.then(() => {
    console.log('Connected to MongoDB database successfully!');
})
.catch((error) => {
    console.error('Error connecting to MongoDB database:', error);
});
}

module.exports = db;