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