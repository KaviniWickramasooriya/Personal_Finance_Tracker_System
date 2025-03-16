require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false  
    }
});

// ✅ Function to Send an Email with a Modern Design
const sendEmail = async (to, subject, financialData, pdfBuffer) => {
    const { totalIncome, totalExpenses, netBalance } = financialData;

    const emailHTML = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; border: 1px solid #ddd; background-color: #f9f9f9;">
        <div style="background-color: #222; padding: 15px; text-align: center; border-radius: 10px 10px 0 0;">
            <h2 style="color: #ffffff; margin: 0;">📊 Financial Report Summary</h2>
        </div>
        <div style="padding: 20px; background-color: #ffffff;">
            <p style="font-size: 16px; color: #333;">Dear User,</p>
            <p style="font-size: 15px; color: #555;">Here’s a quick summary of your financial status:</p>

            <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
                <tr>
                    <td style="padding: 12px; font-weight: bold;">💰 Total Income:</td>
                    <td style="padding: 12px; color: green; font-weight: bold;">$${totalIncome}</td>
                </tr>
                <tr>
                    <td style="padding: 12px; font-weight: bold;">💸 Total Expenses:</td>
                    <td style="padding: 12px; color: red; font-weight: bold;">$${totalExpenses}</td>
                </tr>
                <tr>
                    <td style="padding: 12px; font-weight: bold;">📈 Net Balance:</td>
                    <td style="padding: 12px; color: ${netBalance >= 0 ? 'green' : 'red'}; font-weight: bold;">$${netBalance}</td>
                </tr>
            </table>

            <p style="font-size: 14px; color: #555;">For a detailed breakdown, please refer to the attached PDF report.</p>

            <div style="text-align: center; margin: 20px 0;">
                <a href="#" style="background-color: #4CAF50; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">📂 Download Report</a>
            </div>

            <p style="font-size: 14px; color: #555;">Thank you for using <strong>Finance Tracker</strong>!</p>
        </div>
        <footer style="text-align: center; color: #777; font-size: 12px; padding: 10px;">
            <p>© ${new Date().getFullYear()} Finance Tracker App | All rights reserved</p>
        </footer>
    </div>`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html: emailHTML,
        attachments: [{ filename: "Financial_Report.pdf", content: pdfBuffer }]
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`📩 Email sent to ${to}`);
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
};

module.exports = sendEmail;