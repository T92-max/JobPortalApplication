# Job Portal Application

A full-stack job portal application that connects job seekers with employers, built with Java Spring Boot backend and React frontend.

## 📋 Overview

This job portal application provides a comprehensive platform for job searching and recruitment. It enables job seekers to browse and apply for positions while allowing employers to post job listings and manage applications.

## 🚀 Features

### For Job Seekers
- Browse available job listings
- Search and filter jobs by category, location, and keywords
- Create and manage user profiles
- Apply for jobs online
- Track application status

### For Employers
- Post and manage job listings
- Review and manage job applications
- Search for candidates
- Company profile management

## 🛠️ Tech Stack

### Backend (JobAppBackend)
- **Framework**: Java Spring Boot
- **Database**: (Specify your database - MySQL/PostgreSQL/MongoDB)
- **Authentication**: (JWT/OAuth/Spring Security)
- **API**: RESTful APIs

### Frontend (JobPortal Frontend)
- **Framework**: React.js
- **Language**: JavaScript
- **Styling**: CSS/HTML
- **HTTP Client**: Axios/Fetch API

## 📁 Project Structure

```
JobPortalApplication/
├── JobAppBackend/          # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/      # Java source files
│   │   │   └── resources/ # Application properties
│   └── pom.xml            # Maven dependencies
│
└── JobPortal Frontend/     # React frontend
    ├── src/
    │   ├── components/    # React components
    │   ├── pages/         # Page components
    │   └── services/      # API services
    └── package.json       # NPM dependencies
```

## 🔧 Installation & Setup

### Prerequisites
- Java JDK 11 or higher
- Node.js 14+ and npm
- Maven 3.6+
- (Your database - MySQL/PostgreSQL)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd JobAppBackend
```

2. Configure database connection in `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/jobportal_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

3. Build the project:
```bash
mvn clean install
```

4. Run the application:
```bash
mvn spring-boot:run
```

The backend server will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd "JobPortal Frontend"
```

2. Install dependencies:
```bash
npm install
```

3. Update API endpoint in configuration file (if needed):
```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

4. Start the development server:
```bash
npm start
```

The frontend application will open at `http://localhost:3000`

## 🔌 API Endpoints

### Job Listings
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/{id}` - Get job by ID
- `POST /api/jobs` - Create new job listing
- `PUT /api/jobs/{id}` - Update job listing
- `DELETE /api/jobs/{id}` - Delete job listing

### User Management
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Applications
- `POST /api/applications` - Submit job application
- `GET /api/applications/user/{userId}` - Get user's applications
- `GET /api/applications/job/{jobId}` - Get applications for a job

## 💾 Database Schema

### Key Tables
- **Users**: User account information
- **Jobs**: Job listing details
- **Applications**: Job application records
- **Companies**: Employer information
- **Categories**: Job categories

## 🧪 Testing

### Backend Tests
```bash
cd JobAppBackend
mvn test
```

### Frontend Tests
```bash
cd "JobPortal Frontend"
npm test
```

## 📦 Deployment

### Backend Deployment
1. Build the JAR file:
```bash
mvn clean package
```

2. Deploy the JAR to your server:
```bash
java -jar target/jobportal-backend.jar
```

### Frontend Deployment
1. Create production build:
```bash
npm run build
```

2. Deploy the `build` folder to your hosting service (Netlify, Vercel, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**T92-max**
- GitHub: [@T92-max](https://github.com/T92-max)


## 🔮 Future Enhancements

- [ ] Advanced search filters
- [ ] Email notifications for application updates
- [ ] Resume upload and parsing
- [ ] Interview scheduling system
- [ ] Analytics dashboard for employers
- [ ] Real-time chat between employers and candidates



---

**Note**: Remember to update configuration files with your specific database credentials and API endpoints before running the application.
