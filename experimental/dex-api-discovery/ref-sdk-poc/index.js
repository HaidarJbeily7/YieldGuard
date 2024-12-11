const express = require('express');
const { getPoolByIds, list_history_orders, init_env, ftGetTokenMetadata } = require('@ref-finance/ref-sdk');

const app = express();
const PORT = 3000;

// Initialize the REF SDK environment
init_env('mainnet'); 

// Middleware to parse JSON requests
app.use(express.json());

/**
 * Endpoint: /pools
 * Description: Fetches pool details by IDs
 */
app.get('/pools', async (req, res) => {
  try {
    const { poolIds } = req.query; // Example: poolIds=1,2,3

    if (!poolIds) {
      return res.status(400).json({ error: 'Missing poolIds query parameter.' });
    }

    const ids = poolIds.split(',').map(Number);
    const pools = await getPoolByIds(ids);

    res.json({ pools });
  } catch (error) {
    console.error('Error fetching pool details:', error);
    res.status(500).json({ error: 'Failed to fetch pool details.' });
  }
});

/**
 * Endpoint: /user-history
 * Description: Fetches transaction history for a specific account
 */
app.get('/user-history', async (req, res) => {
  try {
    const { accountId } = req.query; 
    if (!accountId) {
      return res.status(400).json({ error: 'Missing accountId query parameter.' });
    }

    const history = await list_history_orders(accountId);

    res.json({ history });
  } catch (error) {
    console.error('Error fetching user history:', error);
    res.status(500).json({ error: 'Failed to fetch user history.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
