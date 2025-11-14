const BRAND_COLORS = {
  raspberryPink: '#C14B78',
  cream: '#F7EAD9',
  darkText: '#2D1B2E',
  lightText: '#6B4E71',
};

interface OrderConfirmationData {
  customerName: string;
  orderId: number;
  trackingToken: string;
  orderDetails: {
    flavor?: string;
    servings?: number;
    eventDate?: string;
    layers?: string;
    message?: string;
  };
  totalAmount?: number;
  depositRequired?: number;
}

interface OrderStatusUpdateData {
  customerName: string;
  orderId: number;
  trackingToken: string;
  oldStatus: string;
  newStatus: string;
  eventDate?: string;
}

export function generateOrderConfirmationEmail(data: OrderConfirmationData) {
  const trackingUrl = `${process.env.REPLIT_DOMAINS?.split(',')[0] || 'https://your-domain.com'}/track-order?token=${data.trackingToken}`;
  
  const subject = `Order Confirmation #${data.orderId} - Emily Bakes Cakes`;
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, ${BRAND_COLORS.raspberryPink} 0%, #9B3A5F 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Emily Bakes Cakes</h1>
              <p style="color: ${BRAND_COLORS.cream}; margin: 10px 0 0 0; font-size: 16px;">Handcrafted with Love</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: ${BRAND_COLORS.darkText}; margin: 0 0 20px 0; font-size: 24px;">Thank You, ${data.customerName}! 🎉</h2>
              
              <p style="color: ${BRAND_COLORS.lightText}; line-height: 1.6; margin: 0 0 20px 0; font-size: 16px;">
                We've received your custom cake order and our team is excited to create something special for you!
              </p>
              
              <!-- Order Number -->
              <div style="background-color: ${BRAND_COLORS.cream}; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <p style="color: ${BRAND_COLORS.darkText}; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Order Number</p>
                <p style="color: ${BRAND_COLORS.raspberryPink}; margin: 0; font-size: 24px; font-weight: 700;">#${data.orderId}</p>
              </div>
              
              <!-- Order Details -->
              <div style="margin: 30px 0;">
                <h3 style="color: ${BRAND_COLORS.darkText}; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid ${BRAND_COLORS.cream}; padding-bottom: 10px;">Order Details</h3>
                
                ${data.orderDetails.flavor ? `
                <div style="margin: 10px 0;">
                  <span style="color: ${BRAND_COLORS.lightText}; font-weight: 600;">Flavor:</span>
                  <span style="color: ${BRAND_COLORS.darkText};">${data.orderDetails.flavor}</span>
                </div>
                ` : ''}
                
                ${data.orderDetails.servings ? `
                <div style="margin: 10px 0;">
                  <span style="color: ${BRAND_COLORS.lightText}; font-weight: 600;">Servings:</span>
                  <span style="color: ${BRAND_COLORS.darkText};">${data.orderDetails.servings}</span>
                </div>
                ` : ''}
                
                ${data.orderDetails.eventDate ? `
                <div style="margin: 10px 0;">
                  <span style="color: ${BRAND_COLORS.lightText}; font-weight: 600;">Event Date:</span>
                  <span style="color: ${BRAND_COLORS.darkText};">${new Date(data.orderDetails.eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                ` : ''}
                
                ${data.orderDetails.layers ? `
                <div style="margin: 10px 0;">
                  <span style="color: ${BRAND_COLORS.lightText}; font-weight: 600;">Custom Layers:</span>
                  <span style="color: ${BRAND_COLORS.darkText};">Yes</span>
                </div>
                ` : ''}
                
                ${data.orderDetails.message ? `
                <div style="margin: 10px 0;">
                  <span style="color: ${BRAND_COLORS.lightText}; font-weight: 600;">Message:</span>
                  <span style="color: ${BRAND_COLORS.darkText};">${data.orderDetails.message}</span>
                </div>
                ` : ''}
              </div>
              
              <!-- Payment Info -->
              ${data.totalAmount ? `
              <div style="background-color: #f9f9f9; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h3 style="color: ${BRAND_COLORS.darkText}; margin: 0 0 15px 0; font-size: 18px;">Payment Information</h3>
                <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                  <span style="color: ${BRAND_COLORS.lightText};">Total Amount:</span>
                  <span style="color: ${BRAND_COLORS.darkText}; font-weight: 600;">$${data.totalAmount.toFixed(2)}</span>
                </div>
                ${data.depositRequired ? `
                <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                  <span style="color: ${BRAND_COLORS.lightText};">Deposit Required (50%):</span>
                  <span style="color: ${BRAND_COLORS.raspberryPink}; font-weight: 600;">$${data.depositRequired.toFixed(2)}</span>
                </div>
                ` : ''}
              </div>
              ` : ''}
              
              <!-- Track Order Button -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="${trackingUrl}" style="display: inline-block; background-color: ${BRAND_COLORS.raspberryPink}; color: white; text-decoration: none; padding: 15px 40px; border-radius: 8px; font-weight: 600; font-size: 16px;">Track Your Order</a>
              </div>
              
              <!-- Next Steps -->
              <div style="margin: 30px 0; padding: 20px; border-left: 4px solid ${BRAND_COLORS.raspberryPink}; background-color: ${BRAND_COLORS.cream};">
                <h3 style="color: ${BRAND_COLORS.darkText}; margin: 0 0 10px 0; font-size: 16px;">What's Next?</h3>
                <ul style="color: ${BRAND_COLORS.lightText}; line-height: 1.8; margin: 0; padding-left: 20px;">
                  <li>Our team will review your order within 24 hours</li>
                  <li>We'll contact you to confirm details and discuss any customizations</li>
                  <li>Track your order status anytime using the link above</li>
                  <li>We'll notify you when your cake is ready for pickup or delivery</li>
                </ul>
              </div>
              
              <p style="color: ${BRAND_COLORS.lightText}; line-height: 1.6; margin: 20px 0 0 0; font-size: 14px;">
                Questions? Feel free to reply to this email or contact us directly. We're here to make your celebration special!
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9f9f9; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="color: ${BRAND_COLORS.lightText}; margin: 0 0 10px 0; font-size: 14px;">Emily Bakes Cakes</p>
              <p style="color: #999; margin: 0; font-size: 12px;">Handcrafted custom cakes for your special moments</p>
              <p style="color: #999; margin: 10px 0 0 0; font-size: 12px;">
                <a href="${trackingUrl}" style="color: ${BRAND_COLORS.raspberryPink}; text-decoration: none;">Track Order</a>
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
  
  return { subject, html };
}

export function generateOrderStatusUpdateEmail(data: OrderStatusUpdateData) {
  const trackingUrl = `${process.env.REPLIT_DOMAINS?.split(',')[0] || 'https://your-domain.com'}/track-order?token=${data.trackingToken}`;
  
  const statusMessages: Record<string, { emoji: string; title: string; message: string; color: string }> = {
    'pending': {
      emoji: '⏳',
      title: 'Order Received',
      message: 'We\'re reviewing your order and will confirm details soon.',
      color: '#FFA500'
    },
    'confirmed': {
      emoji: '✅',
      title: 'Order Confirmed',
      message: 'Your order has been confirmed and added to our production schedule!',
      color: '#10B981'
    },
    'in_production': {
      emoji: '👨‍🍳',
      title: 'In Production',
      message: 'Our bakers are working their magic on your custom cake!',
      color: BRAND_COLORS.raspberryPink
    },
    'ready': {
      emoji: '🎂',
      title: 'Ready for Pickup',
      message: 'Your cake is ready! Come pick it up at your convenience.',
      color: '#10B981'
    },
    'completed': {
      emoji: '🎉',
      title: 'Order Completed',
      message: 'Thank you for choosing Emily Bakes Cakes! We hope you enjoyed your cake.',
      color: '#10B981'
    },
    'cancelled': {
      emoji: '❌',
      title: 'Order Cancelled',
      message: 'Your order has been cancelled as requested.',
      color: '#EF4444'
    }
  };
  
  const statusInfo = statusMessages[data.newStatus] || {
    emoji: '📝',
    title: 'Status Update',
    message: `Your order status has been updated to: ${data.newStatus}`,
    color: BRAND_COLORS.raspberryPink
  };
  
  const subject = `${statusInfo.emoji} Order #${data.orderId} - ${statusInfo.title}`;
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Status Update</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, ${BRAND_COLORS.raspberryPink} 0%, #9B3A5F 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Emily Bakes Cakes</h1>
              <p style="color: ${BRAND_COLORS.cream}; margin: 10px 0 0 0; font-size: 16px;">Order Status Update</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: ${BRAND_COLORS.darkText}; margin: 0 0 20px 0; font-size: 24px;">Hi ${data.customerName}!</h2>
              
              <!-- Status Badge -->
              <div style="text-align: center; margin: 30px 0;">
                <div style="display: inline-block; background-color: ${statusInfo.color}; color: white; padding: 15px 30px; border-radius: 50px; font-size: 18px; font-weight: 600;">
                  ${statusInfo.emoji} ${statusInfo.title}
                </div>
              </div>
              
              <p style="color: ${BRAND_COLORS.lightText}; line-height: 1.6; margin: 20px 0; font-size: 16px; text-align: center;">
                ${statusInfo.message}
              </p>
              
              <!-- Order Info -->
              <div style="background-color: ${BRAND_COLORS.cream}; border-radius: 8px; padding: 20px; margin: 30px 0;">
                <div style="margin: 10px 0;">
                  <span style="color: ${BRAND_COLORS.lightText}; font-weight: 600;">Order Number:</span>
                  <span style="color: ${BRAND_COLORS.darkText};">#${data.orderId}</span>
                </div>
                <div style="margin: 10px 0;">
                  <span style="color: ${BRAND_COLORS.lightText}; font-weight: 600;">Previous Status:</span>
                  <span style="color: ${BRAND_COLORS.darkText}; text-transform: capitalize;">${data.oldStatus.replace(/_/g, ' ')}</span>
                </div>
                <div style="margin: 10px 0;">
                  <span style="color: ${BRAND_COLORS.lightText}; font-weight: 600;">Current Status:</span>
                  <span style="color: ${statusInfo.color}; font-weight: 600; text-transform: capitalize;">${data.newStatus.replace(/_/g, ' ')}</span>
                </div>
                ${data.eventDate ? `
                <div style="margin: 10px 0;">
                  <span style="color: ${BRAND_COLORS.lightText}; font-weight: 600;">Event Date:</span>
                  <span style="color: ${BRAND_COLORS.darkText};">${new Date(data.eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                ` : ''}
              </div>
              
              <!-- Track Order Button -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="${trackingUrl}" style="display: inline-block; background-color: ${BRAND_COLORS.raspberryPink}; color: white; text-decoration: none; padding: 15px 40px; border-radius: 8px; font-weight: 600; font-size: 16px;">Track Your Order</a>
              </div>
              
              ${data.newStatus === 'ready' ? `
              <div style="margin: 30px 0; padding: 20px; border-left: 4px solid ${BRAND_COLORS.raspberryPink}; background-color: ${BRAND_COLORS.cream};">
                <h3 style="color: ${BRAND_COLORS.darkText}; margin: 0 0 10px 0; font-size: 16px;">Pickup Instructions</h3>
                <ul style="color: ${BRAND_COLORS.lightText}; line-height: 1.8; margin: 0; padding-left: 20px;">
                  <li>Please bring your order number (#${data.orderId})</li>
                  <li>Check your confirmation email for our address</li>
                  <li>Contact us if you need to reschedule pickup</li>
                </ul>
              </div>
              ` : ''}
              
              <p style="color: ${BRAND_COLORS.lightText}; line-height: 1.6; margin: 20px 0 0 0; font-size: 14px;">
                Have questions about your order? Feel free to reply to this email or contact us directly.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9f9f9; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="color: ${BRAND_COLORS.lightText}; margin: 0 0 10px 0; font-size: 14px;">Emily Bakes Cakes</p>
              <p style="color: #999; margin: 0; font-size: 12px;">Handcrafted custom cakes for your special moments</p>
              <p style="color: #999; margin: 10px 0 0 0; font-size: 12px;">
                <a href="${trackingUrl}" style="color: ${BRAND_COLORS.raspberryPink}; text-decoration: none;">Track Order</a>
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
  
  return { subject, html };
}
