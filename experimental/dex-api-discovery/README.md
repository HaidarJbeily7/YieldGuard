# DEX API Integration

## Overview

This document summarizes the research and findings related to integrating APIs for various NEAR DEXes, including Spin, Jumbo, and REF Finance. The goal is to understand the capabilities and limitations of each DEX to guide the integration process.

---

## Spin

### Documentation Summary

The Spin DEX provides comprehensive and well-documented resources for interacting with its platform. The documentation includes:

- **On-Chain Methods**: For write operations such as depositing, withdrawing, placing, and canceling orders, and some read operations like retrieving currencies, market information, and order books.
- **Gateway API**: An off-chain service that aggregates results from smart contract operations and provides JSON-RPC 2.0 endpoints via WebSocket for easier access.

### Key API Functions

1. **`get_orderbook`**
    - **Description**: Returns the order book information for a given market ID.
    - **Use Case**: Useful for fetching market depth and current liquidity.
2. **`get_trades`**
    - **Description**: Returns the latest trades for instruments in a specific market ID.
    - **Use Case**: Retrieve real-time trade data for market analysis.
3. **`get_user_trades`**
    - **Description**: Returns the latest trades for a specific account ID (including taker or maker).
    - **Use Case**: Track user-specific trade activities.
4. **`get_orders_history`**
    - **Description**: Provides a history of orders that have been partially/fully filled or canceled.
    - **Use Case**: Useful for audit trails and user history management.

### Issues

- **Low Liquidity**: The order book has very low liquidity.
- **Low Traffic**: The platform experiences minimal activity, with a 24-hour volume of only $14.08.
- **Price Accuracy**: Prices are often not reflective of real market conditions due to the above issues.

### Conclusion

Currently, the Spin DEX is not suitable for integration due to its limited activity and liquidity. However, it may become a viable option in the future as the platform grows.

---

## Jumbo

### Overview

Jumbo exhibits strong liquidity and high trading volume, making it a potentially valuable resource for integration.

### Key Challenge

- **Lack of API**: Jumbo does not offer a public API. Instead, integration would require indexing the swapping and bridging contracts for the available tokens.

### Next Steps

- Identify and document the relevant contracts for token swaps and bridging.

---

## REF Finance

### Overview

REF Finance has promising documentation and robust liquidity. Its SDK appears to be a rich resource for integration.

### SDK

- [REF Finance SDK GitHub Repository](https://github.com/ref-finance/ref-sdk)
- [All REF FINANCE contracts](https://guide.ref.finance/developers/contracts)

The REF Finance SDK offers a comprehensive set of tools for interacting with the protocol. Below is a summary of the most relevant endpoints for specific tasks:

#### **1. Get the Price of a Token**

- **Endpoint**: `pointToPrice`
    - **Description**: Converts a given liquidity point to the price of one token in terms of another.
    - **Use Case**: Fetch the real-time price of a token in the specified pool.

#### **2. Fetch Transaction History for a Pair**

- **Endpoint**: `getPoolByIds`
    - **Description**: Retrieves detailed information about specific pools, including token pairs and transaction data.
    - **Use Case**: Retrieve trade history for token pairs in specific pools.

#### **3. Fetch Transaction History for an Address**

- **Endpoint**: `list_history_orders`
    - **Description**: Lists all historical orders for a given account ID, including canceled and completed orders.
    - **Use Case**: Fetch transaction history for a specific user account.


