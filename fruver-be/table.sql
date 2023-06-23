create table users(
    id int primary key AUTO_INCREMENT,
    userName varchar(250) NOT NULL,
    contactNumber varchar(20) NOT NULL,
    email varchar(50) NOT NULL,
    password varchar(20) NOT NULL,
    role varchar(20) NOT NULL,
    UNIQUE (email)
);

INSERT INTO users (userName, contactNumber, email, password, role) values('Admin', '3165456767', 'admin@gmail.com', 'admin', 'admin');

CREATE TABLE products(
    id int NOT NULL primary key AUTO_INCREMENT,
    name varchar(250) NOT NULL,
    description text,
    price double NOT NULL,
    image text,
    status varchar(20) NOT NULL
);

CREATE TABLE order(
    id int NOT NULL primary key AUTO_INCREMENT,
    customer_name varchar(200) NOT NULL,
    customer_id varchar(20) NOT NULL,
    customer_contact_number varchar(20) NOT NULL,
    customer_email varchar(200) NOT NULL,
    total double NOT NULL,
    productDetails JSON DEFAULT NULL,
    createBy varchar(255) NOT NULL,
    status varchar(20) NOT NULL
);