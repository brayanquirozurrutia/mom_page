const express = require('express');
const {
    WebpayPlus,
    Options,
    IntegrationCommerceCodes,
    IntegrationApiKeys,
    Environment
} = require('transbank-sdk');

const router = express.Router();

// Set the configuration to the SDK
const tx = new WebpayPlus.Transaction(new Options(
    IntegrationCommerceCodes.WEBPAY_PLUS,
    IntegrationApiKeys.WEBPAY,
    Environment.Integration
));

router.post('/create-transaction', async (req, res) => {
    try {
        const { buyOrder, sessionId, amount, returnUrl } = req.body;

        const response = await tx.create(buyOrder, sessionId, amount, returnUrl);
        res.json(response);
    } catch (error) {
        console.error('Error creando transacción:', error);
        res.status(500).json({ error: 'Error al crear la transacción' });
    }
});

router.post('/commit-transaction', async (req, res) => {
    const { token_ws } = req.body;

    try {
        const response = await tx.commit(token_ws);
        console.log('response:', response);

        if (response.status === 'AUTHORIZED') {
            res.json(response);
        } else {
            res.status(400).json({ error: 'Transacción fallida', details: response });
        }
    } catch (error) {
        console.error('Error confirmando transacción:', error);
        res.status(500).json({ error: 'Error al confirmar la transacción' });
    }
});


module.exports = router;
