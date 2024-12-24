import axios from "@/services/axiosConfig";

/**
 * Create a transaction in the backend
 * @param buyOrder - Order id
 * @param sessionId - Session id
 * @param amount - Amount to pay
 * @param returnUrl - URL to redirect after payment
 */
export const createTransaction = async (
    buyOrder: string,
    sessionId: string,
    amount: number,
    returnUrl: string
) => {
    const response = await axios.post(`/api/payments/create-transaction`, {
        buyOrder,
        sessionId,
        amount,
        returnUrl,
    });
    return response.data;
};

/**
 * Get the token from the transaction
 * @param token - Token from the transaction
 */
export const commitTransaction = async (token: string) => {
    const response = await axios.post(`/api/payments/commit-transaction`, { token_ws: token });
    return response.data;
};
