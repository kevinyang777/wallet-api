const { v4: uuidv4 } = require("uuid");
const { createResponse, success, error } = require("../helpers/response");
const auth = require("../helpers/auth");

// Since all the function is small we're skipping the service layer creation and put the business logic in the controller
// Store wallet data in an object with customer_xid as key
const wallets = {};

exports.initAccount = (req, res) => {
  const customer_xid = req.body.customer_xid;
  const token = uuidv4();
  auth.storeToken(token, customer_xid);
  const walletId = uuidv4();
  wallets[customer_xid] = {
    id: walletId,
    owned_by: customer_xid,
    status: "disabled",
    enabled_at: null,
    balance: 0,
    transactions: [],
  };
  const response = createResponse("success", { token });
  return success(res, response);
};

exports.enableWallet = (req, res) => {
  const { customer_xid } = req;
  const wallet = wallets[customer_xid];
  if (!wallet) {
    const response = createResponse("error", { error: "Wallet not found" });
    return error(res, response);
  }
  if (wallet.isWalletEnabled) {
    const response = createResponse("error", {
      error: "Wallet already enabled",
    });
    return error(res, response);
  }
  wallet.isWalletEnabled = true;
  const response = createResponse("success", {
    wallet: {
      id: uuidv4(),
      owned_by: customer_xid,
      status: "enabled",
      enabled_at: new Date().toISOString(),
      balance: wallet.balance,
    },
  });
  return success(res, response);
};

exports.viewBalance = (req, res) => {
  const { customer_xid } = req;
  const wallet = wallets[customer_xid];
  if (!wallet) {
    const response = createResponse("error", { error: "Wallet not found" });
    return error(res, response);
  }
  const response = createResponse("success", { balance: wallet.balance });
  return success(res, response);
};

exports.viewTransactions = (req, res) => {
  const { customer_xid } = req;
  const wallet = wallets[customer_xid];
  const response = createResponse("success", {
    transactions: wallet.transactions,
  });
  return success(res, response);
};

exports.addDeposit = (req, res) => {
  const { customer_xid } = req;
  const { amount, reference_id } = req.body;
  const wallet = wallets[customer_xid];
  if (!wallet.isWalletEnabled) {
    const response = createResponse("error", { error: "Wallet not enabled" });
    return error(res, response);
  }
  if (amount <= 0) {
    const response = createResponse("error", {
      error: "Invalid deposit amount",
    });
    return error(res, response);
  }
  wallet.balance += amount;
  const transaction = {
    type: "deposit",
    amount,
    reference_id,
    timestamp: new Date().toISOString(),
  };
  wallet.transactions.push(transaction);
  const response = createResponse("success", { transaction });
  return success(res, response);
};

exports.makeWithdrawal = (req, res) => {
  const { customer_xid } = req;
  const { amount, reference_id } = req.body;
  const wallet = wallets[customer_xid];
  if (!wallet.isWalletEnabled) {
    const response = createResponse("error", { error: "Wallet not enabled" });
    return error(res, response);
  }
  if (amount <= 0) {
    const response = createResponse("error", {
      error: "Invalid withdrawal amount",
    });
    return error(res, response);
  }
  if (amount > wallet.balance) {
    const response = createResponse("error", { error: "Insufficient balance" });
    return error(res, response);
  }
  wallet.balance -= amount;
  const transaction = {
    type: "withdrawal",
    amount,
    reference_id,
    timestamp: new Date().toISOString(),
  };
  wallet.transactions.push(transaction);
  const response = createResponse("success", { transaction });
  return success(res, response);
};

exports.disableWallet = (req, res) => {
  const { customer_xid } = req;
  const wallet = wallets[customer_xid];
  if (!wallet.isWalletEnabled) {
    const response = createResponse("error", { error: "Wallet not enabled" });
    return error(res, response);
  }
  wallet.isWalletEnabled = false;
  const response = createResponse("success", { message: "Wallet disabled" });
  return success(res, response);
};
