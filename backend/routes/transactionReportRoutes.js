const express = require('express');
const { generateReportPDFAndEmail } = require('../controllers/transactionReportController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/email', protect, generateReportPDFAndEmail); // ✅ Email Report as PDF

module.exports = router;
