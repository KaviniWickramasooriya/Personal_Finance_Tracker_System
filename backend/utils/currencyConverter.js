const axios = require('axios');
require('dotenv').config();

const SERP_API_KEY = process.env.SERP_API_KEY; 

const convertCurrency = async (amount, fromCurrency, toCurrency) => {
    try {
        console.log(`Fetching conversion for ${amount} ${fromCurrency} to ${toCurrency}...`);
        
        const response = await axios.get('https://serpapi.com/search', {
            params: {
                engine: 'google',
                q: `${amount} ${fromCurrency} to ${toCurrency}`,
                api_key: SERP_API_KEY
            }
        });

       // console.log("SerpAPI Response:", response.data); // Debugging log

        // Extract the conversion result
        const resultText = response.data?.answer_box?.result;
        console.log("Result : ", resultText);
        
        if (!resultText) {
            throw new Error(`Conversion result not found for ${fromCurrency} to ${toCurrency}`);
        }

        // Extract numeric value (e.g., "108.50 United States Dollar" -> 108.50)
        const convertedAmount = parseFloat(resultText.split(' ')[0]);
        return { convertedAmount, convertedCurrency: toCurrency };
    
    } catch (error) {
        console.error('Currency conversion error:', error);
        return { convertedAmount: null, convertedCurrency: toCurrency }; // Avoid breaking transactions
    }
};

module.exports = { convertCurrency };
