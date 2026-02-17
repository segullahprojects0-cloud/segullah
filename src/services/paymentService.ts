interface PayFastPaymentData {
  name: string;
  email: string;
  phone: string;
  amount: number;
  items: Array<{ name: string; quantity: number; price: number }>;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const createPayFastPayment = async (paymentData: PayFastPaymentData): Promise<{
  success: boolean;
  data?: any;
  payfastUrl?: string;
  error?: string;
}> => {
  try {
    const itemName = paymentData.items
      .map(item => `${item.name} x${item.quantity}`)
      .join(', ');

    const response = await fetch(`${API_BASE_URL}/api/create-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: paymentData.amount,
        itemName,
        customerName: paymentData.name,
        customerEmail: paymentData.email,
        customerPhone: paymentData.phone,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create payment');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Payment creation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export const submitPayFastForm = (data: Record<string, string>, payfastUrl: string) => {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = payfastUrl;

  Object.entries(data).forEach(([key, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = value;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
};

export const storePaymentData = (paymentData: PayFastPaymentData) => {
  sessionStorage.setItem('payfast_payment_data', JSON.stringify(paymentData));
};

export const getPaymentData = (): PayFastPaymentData | null => {
  const data = sessionStorage.getItem('payfast_payment_data');
  return data ? JSON.parse(data) : null;
};

export const clearPaymentData = () => {
  sessionStorage.removeItem('payfast_payment_data');
};
