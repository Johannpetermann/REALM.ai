# Realm.ai - Interdisciplinary Project

## Project Overview

Realm.ai was an interdisciplinary project for the MSc Health, and Digital Transformation cohort 2023/2024. Group members included: Johann, Daniel, Fré, Evita and Suleyman. This project was designed to enhance transparency in AI software development for healthcare. We created a prototype/concept version of a system which aims to enable clear monitoring and certification of machine learning models to improve trust and adoption in the healthcare sector. It utilizes blockchain technology to create a decentralized process, allowing users to submit, validate, and revalidate machine learning models securely and transparently.

## Features

- **Model Submission**: Users can submit their machine learning models along with associated metadata.
- **Model Validation**: Submitted models are validated against predefined criteria to ensure they meet minimum standards.
- **Revalidation**: Models can be revalidated to update their performance metrics and compliance status.
- **Model Results Retrieval**: Users can retrieve detailed results and status of any submitted model by its unique identifier.
- **Decentralized Storage**: All transactions are recorded on a blockchain, ensuring data integrity and transparency.

## Technologies Used

- **Ethereum Blockchain**: For creating a transparent and immutable record of model validations.
- **Smart Contracts**: Used to enforce validation rules and record model information.
- **Node.js**: Server-side logic including API endpoints for interacting with the blockchain.
- **Express.js**: Framework for handling HTTP requests and serving the API.
- **Ethers.js**: Library for interacting with the Ethereum blockchain and smart contracts.
- **HTML/CSS/JavaScript**: For the frontend to interact with the smart contracts through a web interface.

## Setup and Installation

### Prerequisites

- Node.js and npm
- Git### Cloning the Repository

```bash
git clone https://github.com/your-username/realm.ai.git
cd realm.ai
```

### Installing Dependencies

```bash
npm install
```

### Configuring the Environment

Create a `.env` file in the project root and add the following variables:
```
RPC_URL="Your_Ethereum_Node_URL"
PRIVATE_KEY="Your_Wallet_Private_Key"
CONTRACT_ADDRESS="Deployed_Contract_Address"
```

### Running the Server

```bash
node server.js or npm start
```

The server will start running on `http://localhost:3000`. Visit the localhost to interact with the API, you can now upload model information, submit them for validation, update them, and get results.

### Contributing

Contributions are welcome. Please feel free to submit pull requests, create issues, or suggest improvements.

### License

MIT
