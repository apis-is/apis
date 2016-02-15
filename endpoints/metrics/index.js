import axios from 'axios';
import app from '../../server';

app.get('/metrics', (req,res,next) => {
  axios
    .get('http://localhost:8091/metrics')
    .then((response) => {
      res.json(response.data);
    })
    .catch( (error) => {
      res.status(500).json({ error: 'Could not query the data source' });
    });
});
