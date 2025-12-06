# Product Showcase Application

A full-stack e-commerce product showcase application with user authentication, product browsing, and inquiry management.

## Features

- **Product Listing**: Browse products with search, filtering, and pagination
- **Product Details**: View detailed information about each product
- **User Authentication**: Sign up and sign in functionality
- **Product Enquiries**: Submit enquiries for specific products
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Axios (HTTP client)
- CSS3

### Backend
- Node.js
- Express.js
- SQLite3
- CORS
- Body Parser

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

### Clone the repository
```bash
git clone https://github.com/yourusername/project-root.git
cd project-root
```

### Backend Setup
```bash
cd backend
npm install
npm run seed  # Populate the database with sample data
npm start     # Start the backend server (runs on http://localhost:3005)
```

### Frontend Setup
```bash
cd frontend
npm install
npm start     # Start the frontend (runs on http://localhost:3002)
```

## Demo Credentials

- Email: `user@example.com`
- Password: `password123`

## Project Structure

```
project-root/
├── backend/
│   ├── db.js              # Database connection
│   ├── index.js           # Main server file
│   ├── package.json       # Backend dependencies
│   ├── seed.js            # Database seeding script
│   └── database.sqlite    # SQLite database
├── frontend/
│   ├── public/
│   │   └── index.html     # HTML entry point
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── styles/        # CSS stylesheets
│   │   ├── App.js         # Main App component
│   │   └── index.js       # React entry point
│   └── package.json       # Frontend dependencies
├── schema.sql             # Database schema
├── seed.sql               # Sample data
└── README.md              # This file
```

## API Endpoints

### Products
- `GET /api/products` - Get all products with pagination, search, and filtering
- `GET /api/products/:id` - Get a specific product by ID

### Enquiries
- `POST /api/enquiries` - Submit a product enquiry
- `GET /api/enquiries` - Get all enquiries

### Authentication
- `POST /api/login` - User login
- `POST /api/register` - User registration

## Features in Detail

### Product Browsing
- Search products by name or description
- Filter by category
- Pagination support
- Responsive grid layout

### User Authentication
- Sign up with name, email, and password
- Sign in with email and password
- Secure token-based authentication
- User session management

### Product Enquiries
- Submit enquiries for products
- Form validation
- Success/error messages
- Enquiry history tracking

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@example.com or open an issue on GitHub.

## Future Enhancements

- User profile management
- Order history
- Product reviews and ratings
- Wishlist functionality
- Admin dashboard
- Payment integration
- Email notifications
