CREATE TABLE locations (
    id  serial primary key,
    site_name   varchar(255) ,
    site_number integer,
    address varchar(255) ,
    lat numeric, -- e..g -128.455
    lon numeric,
    user_type integer, --1 = youth, 2 = senior
    begin_date  date,
    end_date    date,
    bkfst_portions  integer ,
    lunch_portions integer,
    snack_portions integer,
    hot boolean, --#if not, then cold.
    ovens boolean,
    neigborhood varchar(255),
    coolers boolean,
    days integer, --1 = M-F 2: M-Th
    comments text,
    city varchar(255),
    state varchar(100),
    zipcode integer,
    telephone varchar(100),
    neighborhood varchar(255),
    pgh_region varchar(255)
);

CREATE TABLE menus (
    id serial primary key,
    meal_type varchar(50),  --b, l, snack
    user_type integer , -- 1 = youth, 2 = senior
    hot boolean, -- hot meal or not
    service_date date, -- month and day it will be served on. 1 - many. But for now TODO we will leave it as is, w/ multiple duplicate entries.
    items varchar(255) ,-- e.g. "sub, oj, pastry"
    comments text
);

CREATE TABLE menus_locations (
    menu_id INTEGER,
    location_id INTEGER,
    PRIMARY KEY (menu_id, location_id)
);