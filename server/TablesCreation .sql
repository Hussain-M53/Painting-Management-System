CREATE TABLE Category (
    category_id CHAR PRIMARY KEY CHECK(
        category_id = 'S'
        OR category_id = 'B'
        OR category_id = 'G'
        OR category_id = 'P'
    ),
    category_discount INT NOT NULL,
    category_description VARCHAR2(255)
    
) CREATE TABLE Customer (
    customer_id VARCHAR2(255) PRIMARY KEY,
    customer_name VARCHAR2(50) NOT NULL,
    customer_address VARCHAR2(50),
    category_id CHAR NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Category(category_id)
);

CREATE TABLE Artist (
    artist_id VARCHAR2(255) PRIMARY KEY,
    artist_name VARCHAR(50) NOT NULL,
    country_of_birth VARCHAR(50),
    year_of_birth int,
    year_of_death int
);

CREATE TABLE Owner (
    owner_id VARCHAR2(255) PRIMARY KEY,
    owner_name VARCHAR2(50) NOT NULL,
    owner_adress VARCHAR2(50),
    owner_tel VARCHAR2(50) NOT NULL
);

CREATE TABLE Paintings(
    painting_id VARCHAR2(255) PRIMARY KEY,
    painting_title VARCHAR2(50) NOT NULL,
    theme VARCHAR2(50) NOT NULL,
    rental_price INT NOT NULL,
    artist_id VARCHAR2(255) NOT NULL,
    owner_id VARCHAR2(255) NOT NULL,
    FOREIGN KEY (artist_id) REFERENCES Artist(artist_id),
    FOREIGN KEY (owner_id) REFERENCES Owner(owner_id)
);

CREATE TABLE Paintings_Rented (
    customer_id VARCHAR2(255),
    painting_id VARCHAR2(255),
    hire_date DATE NOT NULL,
    due_date_back DATE NOT NULL,
    return_status VARCHAR2(1) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
    FOREIGN KEY (painting_id) REFERENCES Paintings(painting_id),
    PRIMARY KEY (customer_id, painting_id)
);