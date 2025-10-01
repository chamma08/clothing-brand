import nodemailer from "nodemailer";

// Create transporter with forced IPv4
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: true, // Change to true for port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // Force IPv4 to avoid ::1 localhost issue
  family: 4,
  // Add connection timeout
  connectionTimeout: 10000,
});

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

    // Send email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: userEmail,
      subject: `Order Confirmation - Order #${order._id}`,
      html: emailHTML,
    });

    console.log("Email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
};
