CREATE DATABASE blogitout;

CREATE TABLE blog (
    _id SERIAL PRIMARY KEY,
    user_id VARCHAR(255),
    post_id VARCHAR(255),
    post_name VARCHAR(255),
    post_type VARCHAR(255),
    post_data TEXT
);