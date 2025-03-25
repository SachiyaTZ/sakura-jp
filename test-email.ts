import { sendVerificationEmail } from '../my-ecommerce-api/src/utils/email';

const testEmail = async () => {
  try {
    await sendVerificationEmail('recipient@example.com', 'test-token');
    console.log('Test email sent successfully');
  } catch (error) {
    console.error('Error sending test email:', error);
  }
};

testEmail();