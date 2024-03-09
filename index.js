// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// app.get('/api/cryptocurrency', async (req, res) => {
//   try {
//     const { start = 1, limit = 6 } = req.query;
//     const response = await axios.get(
//       'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
//       {
//         params: {
//           start,
//           limit,
//           convert: 'USD',
//         },
//         headers: {
//           'X-CMC_PRO_API_KEY': '35494dbf-fa47-410e-859e-c3486f956554',
//         },
//       }
//     );
//     res.json(response.data);
//   } catch (error) {
//     console.error('Error fetching cryptocurrency data:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// app.get('/api/cryptocurrency/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//       // Make a request to your cryptocurrency API with the provided ID
//       const response = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=${id}`, {
//         headers: {
//           'X-CMC_PRO_API_KEY': '35494dbf-fa47-410e-859e-c3486f956554',
//         },
//       });
//       // Return the data for the specified cryptocurrency
//       res.json(response.data);
//     } catch (error) {
//       console.error('Error fetching cryptocurrency data:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });

app.get('/api/coin/:currency', async (req, res) => {
    const { currency } = req.params;
    const { timePeriod } = req.query;
    const baseUrl = `https://api.coinranking.com/v2/coin/${currency}?timePeriod=${timePeriod}`;
    const apiKey = process.env.apiKey;

    try {
        const response = await axios.get(baseUrl, {
            headers: {
                'x-access-token': apiKey
            }
        });

        const data = response.data;
        res.json(data);
    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
