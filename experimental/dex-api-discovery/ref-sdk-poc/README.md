# REF Finance SDK POC

- Install the required dependencies:
    
    ```bash
    npm install
    ```
    
- Run the server:
    
    ```bash
    node index.js
    ```
    
- Use the following endpoints:
    - Fetch pool details:
        
        ```bash
        curl -X GET "http://localhost:3000/pools?poolIds=1,2,3" -H "Content-Type: application/json"
        ```
        
        Example Outputs
        
        ```json
        {
          "pools": [
            {
              "id": 1,
              "tokenIds": ["tokenA.testnet", "tokenB.testnet"],
              "supplies": {
                "tokenA.testnet": "100000000",
                "tokenB.testnet": "200000000"
              },
              "fee": 30,
              "shareSupply": "500000000",
              "pool_kind": "SIMPLE_POOL"
            }
          ]
        }
        ```
        
    - Fetch user transaction history:
        
        ```bash
        bash
        Copy code
        GET http://localhost:3000/user-history?accountId=any-account.testnet
        
        ```
        

        Example Outputs

        ```json
        {
        "history": [
            {
            "order_id": "tokenA|tokenB|1000#93",
            "owner_id": "your-account.testnet",
            "pool_id": "tokenA|tokenB|1000",
            "sell_token": "tokenA",
            "buy_token": "tokenB",
            "original_amount": "1000000000",
            "bought_amount": "500000000",
            "created_at": "1667292669983952215",
            "remain_amount": "0"
            }
        ]
        }
        ```