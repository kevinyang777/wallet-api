Installation and Setup
1. Clone the repository: git clone https://github.com/kevinyang777/wallet-api.git
2. Install dependencies: npm install
3. Start the server: npm start

Endpoints :

Initialize account
POST /api/v1/init
This endpoint initializes a customer's account and creates a virtual wallet for them. It returns a token that can be used to authenticate future requests.

Enable wallet
POST /api/v1/wallet
This endpoint enables a customer's wallet. Once the wallet is enabled, the customer can add and use virtual money.

View balance
GET /api/v1/wallet
This endpoint allows a customer to view their current virtual money balance.

View transactions
GET /api/v1/wallet/transactions
This endpoint allows a customer to view all their wallet transactions.

Add virtual money
POST /api/v1/wallet/deposits
This endpoint allows a customer to add virtual money to their wallet.

Use virtual money
POST /api/v1/wallet/withdrawals
This endpoint allows a customer to use virtual money from their wallet.

Disable wallet
PATCH /api/v1/wallet
This endpoint disables a customer's wallet.

Error Handling
If there is an error with a request, the API will return a JSON response with an error property that contains a message describing the error. The HTTP status code will be 400.

Authentication
All requests (except for /init) require authentication using the token obtained from the /init endpoint. The token should be included in the Authorization header as Token <token>.

Note :
- This application will be using in-memory storage to save information. (User will lost data on restart)
- I'm assuming the application is done without a database.