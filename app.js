
require('dotenv').config();
const express = require('express');
const app = express();
const categoryRouter = require('./routers/categoryRouter');
const itemRouter = require('./routers/itemRouter');
const methodOverride = require('method-override');


// Set EJS as the view engine and specify the views directory
app.set('view engine', 'ejs');
app.set('views', './views');
// Middleware to parse URL-encoded bodies and override HTTP methods
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use('/', categoryRouter);
app.use('/item', itemRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});