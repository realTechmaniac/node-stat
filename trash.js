app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello from the other side',
    app: 'Natours API',
  });
});
