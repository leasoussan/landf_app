

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
    category INT REFERENCES category(cat_id),
    sub_sub_cat VARCHAR(55)
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

CREATE TABLE color(
    id SERIAL PRIMARY KEY,
    name VARCHAR(55) NOT NULL,
    range INT 
 
)

CREATE TABLE item_identification_type(
    id SERIAL PRIMARY KEY,
    name VARCHAR(55) NOT NULL,
    needs_authentification BOOLEAN,
    item_type VARCHAR(50) NOT NULL
)


CREATE TABLE item_identification_details(
    id SERIAL PRIMARY KEY,
    item_id INT REFERENCES item(id) ON DELETE CASCADE,
    identification_type INT REFERENCES item_identification_type(id) ON DELETE CASCADE,
    context VARCHAR(200) NOT NULL,
    match BOOLEAN 
)


CREATE TABLE item_content (
    id SERIAL PRIMARY KEY,
    item_id INT REFERENCES item(id) ON DELETE CASCADE,
    category_id INT REFERENCES category(cat_id) ON DELETE CASCADE,
    sub_cat INT REFERENCES sub_cat(sub_cat_id) ON DELETE CASCADE,
    color INT REFERENCES colors(id) ON DELETE CASCADE
)


CREATE TABLE conversation(
conv_id SERIAL PRIMARY KEY, 
date_started TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
user_id INT REFERENCES users(id)  ON DELETE CASCADE
);




CREATE TABLE suggestion(
	id SERIAL PRIMARY KEY,
	type VARCHAR(50) NOT NULL, 
    suggestionItem_id INT REFERENCES item(id) ON DELETE CASCADE
	item_id INT REFERENCES item(id),
	conversation INT REFERENCES conversation(conv_id) ON DELETE CASCADE,
    resolved BOOLEAN

)




CREATE TABLE message(
msg_id SERIAL PRIMARY KEY, 
date_started TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
user_id INT REFERENCES users(id),
conversation INT REFERENCES conversation(conv_id) ON DELETE CASCADE,
is_last_sent BOOLEAN
)


CREATE TABLE notification_type(
    id SERIAL PRIMARY KEY, 
    name VARCHAR(55) NOT NULL
    );
	
	
	

CREATE TABLE notification(
ntf_id SERIAL PRIMARY KEY, 
date_started TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
user_id INT REFERENCES users(id)  ON DELETE CASCADE,
item_id INT REFERENCES item(id)  ON DELETE CASCADE,
type INT REFERENCES notification_type(id) ON DELETE CASCADE
status VARCHAR(55)  
)	



Center
Name = String 
Location = GeoLocation
Address = String
City = FK City 
Email =  EmailField
Phone = Phone Field 
Website = URL
Opening_hours = 
  


