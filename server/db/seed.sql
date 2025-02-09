-- Insert initial data into Users table
INSERT INTO users (username, password, city, state) VALUES
('john_doe', 'password123', 'New York', 'NY'),
('jane_smith', 'password456', 'Los Angeles', 'CA');

-- Insert initial data into Events table
INSERT INTO events (event_name, event_url, event_date, event_latitude, event_longitude, event_image, user_id) VALUES
('Concert', 'http://example.com/concert', '2025-03-01 19:00:00', '40.7128', '-74.0060', 'http://example.com/image1.jpg', 1),
('Festival', 'http://example.com/festival', '2025-04-15 12:00:00', '34.0522', '-118.2437', 'http://example.com/image2.jpg', 2);