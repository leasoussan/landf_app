

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(255) NOT NULL
)

CREATE TABLE profile(
    profile_id SERIAL PRIMARY KEY,
    p_user_id INT REFERENCES users(user_id),
    last_name VARCHAR(200) NOT NULL,
    first_name VARCHAR(200) NOT NULL,
    Phone VARCHAR(200) NOT NULL,
    city VARCHAR(200) NOT NULL,
    Profile_pic VARCHAR(500) NOT NULL,
    is_center BOOLEAN
)


CREATE TABLE category(
    cat_id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL
);


CREATE TABLE sub_cat(
    sub_cat_id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    category INT REFERENCES category(cat_id)
);


CREATE TABLE item(
id SERIAL PRIMARY KEY, 
name VARCHAR(200) NOT NULL, 
category_id INT REFERENCES category(cat_id),
sub_category INT REFERENCES sub_cat(sub_cat_id),
height INT, 
width INT,
weight INT,
color_in VARCHAR(200),
color_out VARCHAR(200),
material VARCHAR(200),
brand VARCHAR(200)
lat VARCHAR(50) NOT NULL,
len VARCHAR(50) NOT NULL,
found_date TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
user_id INT REFERENCES users(id),
note TEXT,
is_lost BOOLEAN,
is_found BOOLEAN,
resolved BOOLEAN,
)
-------------



Center
Name = String 
Location = GeoLocation
Address = String
City = FK City 
Email =  EmailField
Phone = Phone Field 
Website = URL
Opening_hours = 
  


