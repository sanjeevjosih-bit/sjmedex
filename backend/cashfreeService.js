const axios = require('axios');

const CF_BASE_URL = process.env.CASHFREE_ENV === 'PRODUCTION'
  ? 'https://api.cashfree.com/pg'
  : 'https://sandbox.cashfree.com/pg';

const headers = {
  'x-client-id': process.env.CASHFREE_APP_ID,
  'x-client-secret': process.env.CASHFREE_SECRET_KEY,
  'x-api-version': '2023-08-01',
  'Content-Type': 'application/json',
};

// Create a Cashfree order, returns payment_session_id used by frontend checkout
async function createCashfreeOrder({ orderId, amount, customerName, customerPhone, customerEmail, returnUrl }) {
  const payload = {
    order_id: orderId,
    order_amount: amount,
    order_currency: 'INR',
    customer_details: {
      customer_id: 'cust_' + orderId,
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_email: customerEmail || 'noemail@sjmedex.in',
    },
    order_meta: {
      return_url: returnUrl,
    },
  };

  const response = await axios.post(`${CF_BASE_URL}/orders`, payload, { headers });
  return response.data; // contains payment_session_id, cf_order_id, order_status
}

// Fetch order status from Cashfree (used as a fallback check, webhook is primary)
async function getCashfreeOrderStatus(orderId) {
  const response = await axios.get(`${CF_BASE_URL}/orders/${orderId}`, { headers });
  return response.data;
}

// Verify webhook signature to ensure the request genuinely came from Cashfree
function verifyWebhookSignature(rawBody, signature, timestamp) {
  const crypto = require('crypto');
  const signedPayload = timestamp + rawBody;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.CASHFREE_SECRET_KEY)
    .update(signedPayload)
    .digest('base64');
  return expectedSignature === signature;
}

module.exports = { createCashfreeOrder, getCashfreeOrderStatus, verifyWebhookSignature };
