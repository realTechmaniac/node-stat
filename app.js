const fs = require('fs');

const express = require('express');

const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(__dirname + '/dev-data/data/tours-simple.json')
);

app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: { tours } });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const tour = tours.find((tour) => tour.id == id);

  if (!tour) {
    res.status(404).json({ status: 'failed', message: 'Invalid ID' });
  }

  res.status(200).json({ status: 'success', data: { tour } });
});

app.post('/api/v1/tours', (req, res) => {
  console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: 'success', data: { tour: newTour } });
    }
  );
});

app.patch('/api/v1/tours/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const tour = tours.find((tour) => tour.id == id);

  if (!tour) {
    res.status(404).json({ status: 'failed', message: 'Invalid ID' });
  }

  res.status(200).json({ status: 'success', data: { tour: 'Updated Tour' } });
});

app.delete('/api/v1/tours/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const tour = tours.find((tour) => tour.id == id);

  if (!tour || id > tours.length) {
    res.status(404).json({ status: 'failed', message: 'Invalid ID' });
  }

  res.status(200).json({ status: 'success', data: null });
});

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
