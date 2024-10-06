import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

async function filterProducts() {
    return new Promise((resolve, reject) => {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const nudePath = path.join(__dirname, '..', 'nude.json');
        
        let products = []

        fs.readFile(nudePath, 'utf8', (err, data) => {
            if (err) return reject(err); 
            
            const nude = JSON.parse(data);

            nude.forEach(product => {
                let singleProduct = {
                    name:'',
                    categorie:'',
                    size:'',
                    color: '',
                    price:''
                }
                if (product.variants[0].option1 && product.variants[0].option2) {
                    singleProduct.name = product.title
                    singleProduct.categorie = product.product_type
                    singleProduct.size = product.variants[0].option1 
                    singleProduct.color = product.variants[0].option2 
                    singleProduct.price = product.variants[0].price
                    products.push(singleProduct)
                }
            })
            resolve(products)
        })
    }
)}

(async () => {
    const result = await filterProducts();
    console.log(result);
    
})();

export default filterProducts