CREATE TABLE UrlTrackingData (
    short_url VARCHAR(20) UNIQUE NOT NULL,
    long_url  VARCHAR(255) NOT NULL,
    click_count int
);