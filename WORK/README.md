# AI-ID Management Platform 🚀

A stunning, high-conversion SaaS website for AI-Powered ID Card Management ERP Platform with full backend API integration.

## ✨ Features

### Frontend
- ✅ Modern, responsive SaaS design
- ✅ Clean white UI with premium gradients
- ✅ Smooth animations and micro-interactions
- ✅ Fully SEO-optimized
- ✅ Mobile-first responsive design

### Backend API
- ✅ RESTful API with Express.js
- ✅ Multiple authentication methods:
  - Email/Password login
  - Mobile OTP verification
  - Telegram bot integration
- ✅ Demo booking system
- ✅ Free trial signup with auto-provisioning
- ✅ Session management
- ✅ Admin endpoints

## 🎯 Pages & Sections

1. **Hero Section** - Powerful headline with CTAs
2. **Features** - 8 comprehensive feature cards
3. **Mobile App** - Showcase of mobile capabilities
4. **Data Migration** - Excel, Google Sheets, CSV support
5. **Pricing** - 3-tier pricing (Free, Professional, Enterprise)
6. **Security** - Bank-grade security features
7. **Demo & Login** - Forms with backend integration
8. **Footer** - Complete company information

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Navigate to project directory**
   ```bash
   cd "c:\Users\Ibrah\Documents\MyWebsite\WORK"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```
   
   Edit `.env` and add your configuration (especially Telegram bot credentials)

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open the website**
   
   Open `index.html` in your browser or navigate to:
   ```
   http://localhost:3000/index.html
   ```

## 📱 Telegram Bot Setup

To enable Telegram login, you need to create a Telegram bot:

1. **Create a bot with BotFather**:
   - Open Telegram and search for `@BotFather`
   - Send `/newbot` command
   - Follow the prompts to create your bot
   - Save the **bot token** you receive

2. **Set up the bot for login**:
   - Send `/setdomain` to @BotFather
   - Select your bot
   - Enter your domain (e.g., `localhost` for local testing or your actual domain)

3. **Update configuration**:
   - Add bot token to `.env`:
     ```
     TELEGRAM_BOT_TOKEN=your_bot_token_here
     TELEGRAM_BOT_NAME=your_bot_username
     ```
   
   - In `index.html`, find the Telegram login section and uncomment the widget code
   - Replace `YOUR_BOT_NAME` with your bot's username

## 🎨 Assets Included

- ✅ **Logo** - AI-powered ID card with brain circuit pattern
- ✅ **Mobile Mockup** - Professional app interface design
- ✅ **Hero Illustration** - Modern ID card visualization

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Email/password login
- `POST /api/auth/request-otp` - Request mobile OTP
- `POST /api/auth/verify-otp` - Verify mobile OTP
- `POST /api/auth/telegram` - Telegram authentication

### Demo & Trial
- `POST /api/demo/book` - Book a demo
- `POST /api/trial/signup` - Start free trial

### User Management
- `GET /api/user/profile` - Get user profile (requires auth)

### Admin (for future use)
- `GET /api/admin/demos` - List all demo requests
- `GET /api/admin/trials` - List all trial users

### Health Check
- `GET /api/health` - Server health status

## 🔒 Security Features

- Bank-grade encryption
- Role-based access control (RBAC)
- Session management
- Automatic OTP expiration (5 minutes)
- Telegram authentication verification
- Input validation

## 📊 Database (Future Enhancement)

Currently uses in-memory storage. For production, integrate with:
- PostgreSQL
- MongoDB
- MySQL

Update the `.env` file with database credentials and implement database models.

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3 (Custom modern design)
- Vanilla JavaScript (ES6+)
- Font Awesome icons
- Google Fonts (Inter & Outfit)

### Backend
- Node.js
- Express.js
- CORS
- Body-parser
- Crypto (for authentication)

## 🎯 Next Steps

1. **Create Dashboard** - Build a user dashboard (`dashboard.html`)
2. **Database Integration** - Replace in-memory storage with real database
3. **Email Service** - Integrate email service for notifications
4. **SMS Service** - Integrate SMS provider for OTP (Twilio, MSG91, etc.)
5. **Payment Gateway** - Integrate Razorpay/Stripe for payments
6. **ID Card Generation** - Build PDF/image generation for ID cards
7. **Admin Panel** - Create comprehensive admin interface
8. **Analytics** - Add Google Analytics or similar
9. **Deploy** - Deploy to production (Vercel, Netlify, AWS, etc.)

## 📝 Development Commands

```bash
# Install dependencies
npm install

# Start production server
npm start

# Start development server with auto-restart
npm run dev

# Run tests (when implemented)
npm test
```

## 🌐 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Push code to GitHub
2. Connect repository to Vercel/Netlify
3. Deploy!

### Backend Deployment (Heroku/Railway/Render)
1. Set environment variables in hosting platform
2. Deploy from GitHub
3. Update `API_BASE_URL` in `index.html` to your production API URL

## 📸 Features Showcase

- **AI-Powered ID Generation** - Automated card creation
- **Multi-Language Support** - 10+ Indian languages
- **Offline Mode** - Work without internet
- **Real-Time Analytics** - AI-powered insights
- **Secure Payments** - UPI, Cards, Net Banking
- **Data Migration** - Import from Excel/CSV/Google Sheets
- **Role-Based Access** - Admin, Employee, Client portals

## 💡 Important Notes

1. **Trial Accounts**: Currently creates accounts with random passwords. In production, send via email.
2. **OTP**: Development mode shows OTP in console. Remove `debug_otp` in production.
3. **Telegram**: Requires bot setup. See Telegram Bot Setup section above.
4. **Security**: Hash passwords before storing in production database.
5. **CORS**: Configure CORS properly for production.

## 🤝 Support

For questions or issues:
- Email: support@ai-id-management.com
- Documentation: [Link to docs]
- GitHub Issues: [Link to issues]

## 📄 License

MIT License - feel free to use for your projects!

---

**Built with ❤️ for modern institutional management**

© 2026 AI-ID Management Platform. Digitizing, One ID at a Time.
