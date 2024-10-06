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
            const sizes = ['XS','S','M','L','XL','XXL']

            nude.forEach(product => {
                let singleProduct = {
                    name:'',
                    categorie:'',
                    size:'',
                    color: '',
                    price:''
                }
                if (sizes.includes(product.variants[0].option1) && product.variants[0].option2 && product.product_type) {
                    singleProduct.name = product.title.toUpperCase()
                    singleProduct.categorie = product.product_type.toUpperCase()
                    singleProduct.size = product.variants[0].option1.toUpperCase() 
                    singleProduct.color = product.variants[0].option2.toUpperCase() 
                    singleProduct.price = product.variants[0].price
                    products.push(singleProduct)
                }
            })
            resolve(products)
        })
    }
)}

export default filterProducts