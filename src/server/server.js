const express = require('express');
const app = express();
const port = process.env.PORT || 8080;


app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' }
  ];
  res.json(users);
});


app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
