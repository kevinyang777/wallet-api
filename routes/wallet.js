const express = require("express");
const router = express.Router();
const walletController = require("../controllers/wallet");
const auth = require("../helpers/auth");

router.post("/init", walletController.initAccount);

router.use(auth.authorizeToken);

router.post("/wallet", walletController.enableWallet);
router.get("/wallet", walletController.viewBalance);
router.get("/wallet/transactions", walletController.viewTransactions);
router.post("/wallet/deposits", walletController.addDeposit);
router.post("/wallet/withdrawals", walletController.makeWithdrawal);
router.patch("/wallet", walletController.disableWallet);

module.exports = router;
