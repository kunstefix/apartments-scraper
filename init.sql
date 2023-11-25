-- Create a new PostgreSQL user
-- CREATE USER myuser WITH PASSWORD 'mypassword';

-- Create a new database and assign ownership to the user
-- CREATE DATABASE mydatabase WITH OWNER = myuser;

CREATE TABLE property_listings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    locality VARCHAR(255) NOT NULL,
    images JSONB
);

-- Grant necessary privileges to the user (e.g., superuser, if needed)
ALTER USER myuser WITH SUPERUSER;

-- Exit the database session
\q