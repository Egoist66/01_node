# 📚 Tech Learning Journal

A powerful, interactive web application to track your weekly learning progress with React Native, Docker, Node.js (Express, NestJS), and other technologies. Built with React, Express, and Docker.

## 🚀 Features

- **Weekly Journal Table**: Organized learning tracking from Monday to Sunday
- **Multiple Technologies**: Track progress across React Native, Docker, Node.js, Express, and NestJS
- **Status Tracking**: Mark entries as planned, in-progress, completed, or review
- **Time Tracking**: Log hours spent on each topic
- **Beautiful UI**: Modern, responsive design with gradient backgrounds and smooth animations
- **Full CRUD Operations**: Add, edit, update, and delete journal entries
- **RESTful API**: Express backend with comprehensive API endpoints
- **Docker Support**: Complete containerization with docker-compose

## 🛠️ Technologies Used

### Frontend
- **React 18**: Modern UI framework
- **CSS3**: Custom styling with gradients and animations
- **Axios**: HTTP client for API calls

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web application framework
- **CORS**: Cross-origin resource sharing
- **Body Parser**: Request body parsing middleware

### DevOps
- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration
- **Nginx**: Reverse proxy for frontend

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Docker and Docker Compose (for containerized deployment)

## 🏃 Quick Start

### Option 1: Run with Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tech-learning-journal
   ```

2. **Build and start containers**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost
   - Backend API: http://localhost:5000/api

### Option 2: Run Locally

1. **Install backend dependencies**
   ```bash
   npm install
   ```

2. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

3. **Start the backend server**
   ```bash
   npm start
   # Or for development with auto-reload:
   npm run dev
   ```

4. **Start the frontend (in a new terminal)**
   ```bash
   cd client
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

## 📖 Usage Guide

### Adding a Learning Entry

1. Click the "**+ Add Learning Entry**" button
2. Fill in the form:
   - **Day**: Select Monday through Sunday
   - **Technology**: Choose from React Native, Docker, Node.js, Express, or NestJS
   - **Topic**: Enter what you're learning (e.g., "Setting up Docker containers")
   - **Notes**: Add detailed notes about your learning experience
   - **Status**: Set as planned, in-progress, completed, or review
   - **Hours**: Log time spent (supports decimals like 1.5)
3. Click "**Add Entry**"

### Managing Entries

- **Update Status**: Click the status dropdown on any entry to change it
- **Delete Entry**: Click the 🗑️ icon to remove an entry
- **View Hours**: See total hours per day and weekly total at the top

### API Endpoints

#### Health Check
```
GET /api/health
```

#### Get All Entries
```
GET /api/journal
```

#### Get Entries for Specific Day
```
GET /api/journal/:day
```

#### Add Entry
```
POST /api/journal/:day
Body: {
  "technology": "React Native",
  "topic": "Navigation",
  "notes": "Learned React Navigation",
  "status": "completed",
  "hours": 2
}
```

#### Update Entry
```
PUT /api/journal/:day/:id
Body: { "status": "completed" }
```

#### Delete Entry
```
DELETE /api/journal/:day/:id
```

#### Clear Day
```
DELETE /api/journal/:day
```

## 🎨 UI Features

- **Gradient Header**: Eye-catching purple gradient design
- **Tech Badges**: Color-coded badges for each technology
- **Status Colors**: Visual indicators for entry status
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Modal pop-ups and hover effects
- **Weekly Statistics**: Track total hours across the week

## 🐳 Docker Commands

```bash
# Build and start containers
docker-compose up --build

# Start containers (detached mode)
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f

# Rebuild specific service
docker-compose build backend
docker-compose build frontend
```

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```
PORT=5000
NODE_ENV=development
```

**Frontend (client/.env)**
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Customization

- **Add More Technologies**: Edit the `technologies` array in `client/src/App.js`
- **Change Colors**: Modify the `getTechColor()` function for custom tech badge colors
- **Add Status Types**: Update the `statuses` array and `getStatusColor()` function

## 📁 Project Structure

```
tech-learning-journal/
├── server/
│   └── index.js          # Express backend server
├── client/
│   ├── public/
│   │   └── index.html    # HTML template
│   ├── src/
│   │   ├── App.js        # Main React component
│   │   ├── App.css       # Styling
│   │   ├── index.js      # React entry point
│   │   └── index.css     # Global styles
│   ├── Dockerfile        # Frontend Docker config
│   ├── nginx.conf        # Nginx configuration
│   └── package.json      # Frontend dependencies
├── Dockerfile            # Backend Docker config
├── docker-compose.yml    # Multi-container setup
├── package.json          # Backend dependencies
├── .env                  # Backend environment variables
└── README.md            # This file
```

## 🚧 Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] User authentication and multiple users
- [ ] Export journal to PDF
- [ ] Charts and analytics dashboard
- [ ] Calendar view
- [ ] Tags and categories
- [ ] Search and filter functionality
- [ ] Dark mode toggle
- [ ] Mobile app with React Native

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

MIT License - feel free to use this project for learning and development.

## 💡 Tips for Learning

1. **Be Consistent**: Try to log entries daily
2. **Set Realistic Goals**: Start with 1-2 hours per day
3. **Review Weekly**: Look back at what you've accomplished
4. **Take Notes**: Detailed notes help reinforce learning
5. **Track Challenges**: Document problems and solutions

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Change PORT in .env file or kill existing process
lsof -ti:5000 | xargs kill -9
```

### Docker Issues
```bash
# Remove all containers and rebuild
docker-compose down
docker system prune -a
docker-compose up --build
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Happy Learning! 🎓**
