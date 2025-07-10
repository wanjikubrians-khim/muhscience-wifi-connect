const express = require('express');
const router = express.Router();
const safaricom = require('safaricom-node');
const Transaction = require('../models/Transaction');

// Initialize M-Pesa
const mpesa = new safaricom({
  consumerKey: process.env.MPESA_CONSUMER_KEY,
  consumerSecret: process.env.MPESA_CONSUMER_SECRET,
  environment: 'sandbox' // or 'production'
});

// STK Push Endpoint
router.post('/stk-push', async (req, res) => {
  const { phone, amount, bundleId } = req.body;

  try {
    const response = await mpesa.stkPush({
      phone: phone.replace(/^0/, '254'), // Format to 254
      amount: amount,
      accountReference: `WIFI-${bundleId}`,
      transactionDesc: 'WiFi Bundle Purchase',
      shortCode: process.env.MPESA_SHORTCODE,
      passKey: process.env.MPESA_PASSKEY,
      callbackUrl: process.env.CALLBACK_URL
    });

    // Save transaction to DB
    const transaction = new Transaction({
      phone,
      amount,
      bundle: bundleId,
      mpesaCode: response.CheckoutRequestID,
      status: 'pending'
    });
    await transaction.save();

    res.json({ success: true, data: response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Callback URL (for payment confirmation)
router.post('/callback', (req, res) => {
  const data = req.body;
  console.log('M-Pesa Callback:', data);
  
  // Update transaction status in DB
  Transaction.updateOne(
    { mpesaCode: data.CheckoutRequestID },
    { status: data.ResultCode === 0 ? 'completed' : 'failed' }
  ).exec();

  res.status(200).send();
});

module.exports = router;