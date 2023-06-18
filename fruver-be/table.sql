create table admin(
    id int primary key AUTO_INCREMENT,
    user varchar(250),
    contac_number varchar(20),
    email varchar(50),
    password varchar(20),
    status varchar(20),
    UNIQUE (email)
);

INSERT INTO admin(name, contac_number, email, password, status) values('Admin', '3165456767', 'admin@gmail.com', 'admin', 'true');


CREATE TABLE product(
    id int NOT NULL primary key AUTO_INCREMENT,
    name varchar(250) NOT NULL,
    description varchar(250),
    price integer NOT NULL,
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