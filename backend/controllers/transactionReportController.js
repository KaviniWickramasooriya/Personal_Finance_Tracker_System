const PDFDocument = require('pdfkit');
const Transaction = require('../models/Transaction');
const Budget = require('../models/Budget');
const sendEmail = require('../config/emailConfig');

const generateReportPDFAndEmail = async (req, res) => {
    try {
        // Define a filter to determine data access based on user role
        let filter = req.user.role === 'admin' ? {} : { user: req.user._id };

        // Retrieve financial data: income and expenses
        const totals = await Transaction.aggregate([
            { $match: filter }, 
            { $group: { _id: "$type", totalAmount: { $sum: "$amount" } } }
        ]);

        let totalIncome = 0, totalExpenses = 0;
        totals.forEach((item) => {
            if (item._id === "income") totalIncome = item.totalAmount;
            if (item._id === "expense") totalExpenses = item.totalAmount;
        });

        // Retrieve categorized expenses and budget details
        const categoryExpenses = await Transaction.aggregate([
            { $match: filter },
            { $group: { _id: "$category", totalSpent: { $sum: "$amount" } } }
        ]);
        
        const budgets = await Budget.find(filter);
        const transactions = await Transaction.find(filter).sort({ date: -1 });

        // Calculate budget usage details
        const budgetUsage = budgets.map(budget => ({
            category: budget.category,
            limit: budget.limit,
            spent: budget.spent,
            remaining: budget.limit - budget.spent,
            status: budget.spent > budget.limit ? "Over Budget" : "Within Budget"
        }));

        // Initialize PDF document with appropriate margin settings
        const doc = new PDFDocument({ margin: 50 });
        let pdfBuffer = [];

        doc.on('data', chunk => pdfBuffer.push(chunk));
        doc.on('end', async () => {
            const pdfData = Buffer.concat(pdfBuffer);
            await sendEmail(
                req.user.email,
                "Your Financial Report",
                { totalIncome, totalExpenses, netBalance: totalIncome - totalExpenses },
                pdfData
            );
            res.status(200).json({ message: "Financial report emailed successfully!" });
        });

        // Document Title and Header
        doc.font('Helvetica-Bold').fontSize(22).fillColor("#4CAF50")
           .text("Finance Report", { align: "center" }).moveDown(1);
        
        const formattedDate = new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
        doc.font('Times-Roman').fontSize(12).fillColor("black")
           .text(`Date: ${formattedDate}`, { align: "right" })
           .moveDown(1.5);

        // Financial Overview Section
        doc.font('Helvetica-Bold').fontSize(16).fillColor("#333")
           .text("Financial Summary:", { underline: true }).moveDown(0.5);
        doc.font('Times-Roman').fontSize(12).fillColor("black");
        doc.text(`Total Income: $${totalIncome.toFixed(2)}`);
        doc.text(`Total Expenses: $${totalExpenses.toFixed(2)}`);
        doc.fillColor(totalIncome - totalExpenses >= 0 ? "green" : "red")
           .text(`Net Balance: $${(totalIncome - totalExpenses).toFixed(2)}`)
           .moveDown(1);

        // Section for Expense Distribution by Category
        doc.font('Helvetica-Bold').fontSize(16).fillColor("#333")
           .text("Expenses by Category:", { underline: true }).moveDown(0.5);

        const expStartX = 50;
        const expStartY = doc.y;
        const expColWidths = [300, 150];

        // Table Header for Expenses by Category
        doc.fillColor("#00695C")
           .rect(expStartX, expStartY, expColWidths[0] + expColWidths[1], 20)
           .fill();
        doc.fillColor("white").fontSize(12)
           .text("Category", expStartX + 5, expStartY + 5, { width: expColWidths[0], align: "left" })
           .text("Amount", expStartX + expColWidths[0] + 5, expStartY + 5, { width: expColWidths[1], align: "right" });

        // Populate Expense Data
        doc.font('Times-Roman').fillColor("black");
        let currentY = expStartY + 20;
        categoryExpenses.forEach((item) => {
            doc.text(item._id, expStartX + 5, currentY + 5, { width: expColWidths[0], align: "left" })
               .text(`$${item.totalSpent.toFixed(2)}`, expStartX + expColWidths[0] + 5, currentY + 5, { width: expColWidths[1], align: "right" });
            currentY += 20;
        });
        doc.moveDown(1);

        // Recent Transactions Section
        doc.font('Helvetica-Bold').fontSize(16).fillColor("#333")
           .text("Recent Transactions:", { underline: true }).moveDown(0.5);

        const startX = 50;
        const startY = doc.y;
        const colWidths = [130, 90, 90, 150];

        // Table Header for Transactions
        doc.fillColor("#00695C")
           .rect(startX, startY, colWidths.reduce((a, b) => a + b), 20)
           .fill();
        doc.fillColor("white").fontSize(12)
           .text("Date", startX + 5, startY + 5, { width: colWidths[0], align: "left" })
           .text("Type", startX + colWidths[0] + 5, startY + 5, { width: colWidths[1], align: "left" })
           .text("Amount", startX + colWidths[0] + colWidths[1] + 5, startY + 5, { width: colWidths[2], align: "right" })
           .text("Category", startX + colWidths[0] + colWidths[1] + colWidths[2] + 5, startY + 5, { width: colWidths[3], align: "left" });

        // Populate Transaction Data
        doc.font('Times-Roman').fillColor("black");
        currentY = startY + 20;
        transactions.slice(0, 10).forEach((txn) => {
            const formattedTxnDate = new Date(txn.date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
            doc.text(formattedTxnDate, startX + 5, currentY + 5, { width: colWidths[0], align: "left" })
               .text(txn.type.charAt(0).toUpperCase() + txn.type.slice(1), startX + colWidths[0] + 5, currentY + 5, { width: colWidths[1], align: "left" })
               .text(`$${txn.amount.toFixed(2)}`, startX + colWidths[0] + colWidths[1] + 5, currentY + 5, { width: colWidths[2], align: "right" })
               .text(txn.category, startX + colWidths[0] + colWidths[1] + colWidths[2] + 5, currentY + 5, { width: colWidths[3], align: "left" });
            currentY += 20;
        });

        doc.end();
    } catch (error) {
        res.status(500).json({ message: "Error generating and emailing PDF report", error });
    }
};

module.exports = { generateReportPDFAndEmail };