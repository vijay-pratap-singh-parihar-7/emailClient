const router = require('./rest-services');
const express = require('express');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));


app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

app.use('/', router);