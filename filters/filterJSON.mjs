import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function filter() {
    return new Promise((resolve, reject) => {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const nudePath = path.join(__dirname, '..', 'nude.json');
        
        fs.readFile(nudePath, 'utf8', (err, data) => {
            if (err) return reject(err); 
            
            const nude = JSON.parse(data);
            let colors = [];
            let categories = [];

            nude.forEach(product => {
                if (product.product_type) {
                    categories.push(product.product_type);
                }
                if (product.options[1]) {
                    if (product.options[1].hasOwnProperty("name") && product.options[1].name === "COLOUR") {
                        colors.push(product.options[1].values[0]);
                    }
                }
            });

            colors = [...new Set(colors)];
            categories = [...new Set(categories)];
            const finalColors = colors.map(color => color.toUpperCase());
            const finalCategories = categories.map(cat => cat.toUpperCase());

            resolve({ finalColors, finalCategories });
        });
    });
}

export default filter
