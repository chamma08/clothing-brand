import nodemailer from "nodemailer";
import dns from "dns";

// Set DNS to prefer IPv4 addresses
dns.setDefaultResultOrder('ipv4first');

// Custom DNS lookup that forces IPv4 only
const customDnsLookup = (hostname, options, callback) => {
  dns.lookup(hostname, { family: 4, all: false }, (err, address, family) => {
    if (err) {
      console.error('DNS lookup error:', err);
      return callback(err);
    }
    console.log(`DNS resolved ${hostname} to ${address} (IPv${family})`);
    callback(null, address, family);
  });
};


let transporter = null;

const getTransporter = () => {
  if (!transporter) {
    console.log('Creating email transporter with:');
    console.log('HOST:', process.env.EMAIL_HOST);
    console.log('PORT:', process.env.EMAIL_PORT);
    console.log('USER:', process.env.EMAIL_USER);
    
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: false, // Use STARTTLS for port 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Force IPv4 with custom DNS lookup
      dnsLookup: customDnsLookup,
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 15000,
    });
  }
  return transporter;
};

// Send order confirmation email
export const sendOrderEmail = async (userEmail, order) => {
  try {
    // Build order items HTML
    const itemsHTML = order.items
      .map(
        (item) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">
            ${item.product.name || "Product"}
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${
            item.size
          }</td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${
            item.quantity
          }</td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">$${
            item.price
          }</td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">$${(
            item.price * item.quantity
          ).toFixed(2)}</td>
        </tr>
      `
      )
      .join("");

    // Email HTML template
    const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; background: white; }
          th { background-color: #4CAF50; color: white; padding: 12px; text-align: left; }
          .total { font-size: 18px; font-weight: bold; text-align: right; margin-top: 20px; }
          .footer { text-align: center; padding: 20px; color: #777; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmation</h1>
          </div>
          <div class="content">
            <h2>Thank you for your purchase!</h2>
            <p>Your order has been successfully placed.</p>
            
            <p><strong>Order ID:</strong> ${order._id}</p>
            <p><strong>Order Date:</strong> ${new Date(
              order.orderDate
            ).toLocaleString()}</p>
            
            <h3>Order Summary:</h3>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Size</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHTML}
              </tbody>
            </table>
            
            <div class="total">
              Total: $${order.totalPrice.toFixed(2)}
            </div>
          </div>
          <div class="footer">
            <p>Thank you for shopping with us!</p>
            <p>If you have any questions, please contact our support team.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Get transporter (creates it if needed)
    const emailTransporter = getTransporter();

    // Send email
    const info = await emailTransporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: userEmail,
      subject: `Order Confirmation - Order #${order._id}`,
      html: emailHTML,
    });

    console.log("Email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
};