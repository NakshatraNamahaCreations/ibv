exports.generateUniqueTransactionId = async function () {
  // Implement your logic to generate a unique transaction ID
  // You can use a library like uuid to generate a unique ID

  // Example using uuid:
  const { v4: uuidv4 } = require("uuid");
  const transactionId = uuidv4();

  return transactionId;
};
