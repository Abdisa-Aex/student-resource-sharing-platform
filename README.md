# ResourceHub — Student Resource Sharing Platform

ResourceHub is a full-stack web application designed to help university students borrow, lend, rent, exchange, and share useful resources such as books, electronics, tools, and other educational materials.

The platform aims to make student resources more accessible, encourage collaboration, reduce unnecessary purchases, and promote a community-based sharing economy.

## Key Features

### Resource Management
- Create and manage resource listings.
- Browse and filter available resources.
- Support free sharing, rentals, deposits, and barter exchanges.
- View resource details and availability.

### User Management and Security
- User authentication and authorization.
- Role-based access control (RBAC) for users, moderators, administrators, and super administrators.
- JWT-based authentication and refresh tokens.
- Email verification and two-factor authentication.
- User profiles and account management.

### Booking and Interaction
- Resource booking and scheduling.
- Wishlist functionality.
- User referrals and reward points.
- Resource discovery and featured listings.

### Administration and Analytics
- Role-based administrative functions.
- Activity logging and monitoring.
- Platform analytics and management tools.

*Feature availability depends on the current implementation and configuration.*

## Technology Stack

### Frontend
- Next.js
- React
- JavaScript
- Tailwind CSS
- HTML5 and CSS3

### Backend
- Node.js
- Express.js
- RESTful APIs

### Data and Integrations
- MongoDB
- Firebase
- Cloudinary for media management

### Development Tools
- Git and GitHub
- Environment-based configuration
- API testing and debugging tools

## Architecture

ResourceHub separates its frontend and backend responsibilities.

- **Frontend:** User interface, navigation, resource discovery, and interactions.
- **Backend:** API endpoints, application logic, authentication, and authorization.
- **Database:** Persistent application data and resource records.
- **External services:** Media storage and supporting integrations.

## Getting Started

### Prerequisites

- Node.js and npm
- Git
- MongoDB access and any required external service credentials
- Environment variables required by the application

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Abdisa-Aex/Rsp.git
   ```

2. Enter the project directory:

   ```bash
   cd Rsp
   ```

3. Install dependencies separately in the frontend and backend directories, according to their respective `package.json` files.

4. Configure the required environment variables using the project's environment configuration examples.

5. Start the frontend and backend using the scripts defined in their respective `package.json` files.

**Note:** Exact startup commands and environment variable names depend on the current project configuration.

## Environment Variables and Security

- Keep database credentials, JWT secrets, API keys, and other sensitive values in local environment files.
- Never commit `.env` or `.env.local` files containing secrets.
- Configure production environment variables through the relevant deployment platform.
- Apply appropriate authorization checks to protected API endpoints.

## Deployment

The backend has previously been deployed on Render:

[ResourceHub Backend API](https://resourcehub-backend-pfly.onrender.com)

The frontend and backend may require separate environment configuration. Verify the current deployment status and API connectivity before relying on the live service.

## Project Status

**Ongoing Development**

ResourceHub is an evolving software engineering project. Features, integrations, security controls, and documentation may be improved as development continues.

## Future Improvements

- Improve performance and accessibility.
- Expand automated testing and error handling.
- Strengthen API security and validation.
- Improve deployment and monitoring.
- Refine the user experience across mobile and desktop devices.

## Developer

**Abdisa Alemayehu Niguse**

- GitHub: [Abdisa-Aex](https://github.com/Abdisa-Aex)
- LinkedIn: [Abdisa Alemayehu](https://www.linkedin.com/in/abdisa-alex-96ba03353/)

---

ResourceHub is a practical full-stack software engineering project focused on resource sharing, secure application development, and solving real-world student needs.
