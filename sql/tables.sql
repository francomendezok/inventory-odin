DROP TYPE IF EXISTS sizes CASCADE;
DROP TYPE IF EXISTS genders CASCADE;
DROP TYPE IF EXISTS actions CASCADE;

CREATE TYPE sizesType AS ENUM ('XS', 'S', 'M', 'L', 'XL', 'XXL');
CREATE TYPE gendersType AS ENUM ('male', 'female');
CREATE TYPE actionsType AS ENUM ('sale', 'purchase');


CREATE TABLE IF NOT EXISTS sizes (
    id SERIAL PRIMARY KEY,
    size sizesType NOT NULL
);

CREATE TABLE IF NOT EXISTS genders (
    id SERIAL PRIMARY KEY,
    gender gendersType NOT NULL
);

CREATE TABLE IF NOT EXISTS colors (
    id SERIAL PRIMARY KEY,
    color VARCHAR(32) NOT NULL
);

CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    categorie VARCHAR(32) NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    categorieID INT NOT NULL,
    sizeID INT NOT NULL,
    colorID INT NOT NULL,
    genderID INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (categorieID) REFERENCES categories(id),
    FOREIGN KEY (sizeID) REFERENCES sizes(id),
    FOREIGN KEY (colorID) REFERENCES colors(id),
    FOREIGN KEY (genderID) REFERENCES genders(id)
);

CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    productID INT NOT NULL,
    action actionsType NOT NULL,
    transaction_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    quantity INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (productID) REFERENCES products(id)
);
