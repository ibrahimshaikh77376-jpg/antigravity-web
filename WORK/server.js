const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.')); // Serve static files from current directory

// In-memory storage (replace with database in production)
const users = new Map();
const demoRequests = new Map();
const trialUsers = new Map();

// ============================================
// TELEGRAM CONFIGURATION
// ============================================
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE';
const TELEGRAM_BOT_NAME = process.env.TELEGRAM_BOT_NAME || 'YOUR_BOT_NAME';

// Verify Telegram login data
function verifyTelegramAuth(authData) {
    const checkHash = authData.hash;
    delete authData.hash;
    
    const dataCheckArr = Object.keys(authData)
        .sort()
        .map(key => `${key}=${authData[key]}`);
    
    const dataCheckString = dataCheckArr.join('\n');
    const secretKey = crypto.createHash('sha256')
        .update(TELEGRAM_BOT_TOKEN)
        .digest();
    
    const hash = crypto.createHmac('sha256', secretKey)
        .update(dataCheckString)
        .digest('hex');
    
    return hash === checkHash;
}

// ============================================
// AUTHENTICATION ENDPOINTS
// ============================================

// Email/Password Login
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email and password are required'
        });
    }
    
    // In production: Check against database with hashed passwords
    const user = users.get(email);
    if (!user || user.password !== password) {
        return res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        });
    }
    
    // Generate session token (in production: use JWT)
    const sessionToken = crypto.randomBytes(32).toString('hex');
    user.sessionToken = sessionToken;
    user.lastLogin = new Date();
    
    res.json({
        success: true,
        message: 'Login successful',
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        },
        token: sessionToken
    });
});

// Mobile OTP Request
app.post('/api/auth/request-otp', (req, res) => {
    const { mobile } = req.body;
    
    if (!mobile) {
        return res.status(400).json({
            success: false,
            message: 'Mobile number is required'
        });
    }
    
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP (expires in 5 minutes)
    const otpData = {
        otp,
        mobile,
        expiresAt: Date.now() + 5 * 60 * 1000
    };
    
    users.set(`otp_${mobile}`, otpData);
    
    // In production: Send OTP via SMS service (Twilio, MSG91, etc.)
    console.log(`OTP for ${mobile}: ${otp}`);
    
    res.json({
        success: true,
        message: 'OTP sent successfully',
        // Remove this in production:
        debug_otp: otp
    });
});

// Mobile OTP Verify
app.post('/api/auth/verify-otp', (req, res) => {
    const { mobile, otp } = req.body;
    
    if (!mobile || !otp) {
        return res.status(400).json({
            success: false,
            message: 'Mobile number and OTP are required'
        });
    }
    
    const otpData = users.get(`otp_${mobile}`);
    
    if (!otpData) {
        return res.status(400).json({
            success: false,
            message: 'OTP not found. Please request a new one.'
        });
    }
    
    if (Date.now() > otpData.expiresAt) {
        users.delete(`otp_${mobile}`);
        return res.status(400).json({
            success: false,
            message: 'OTP expired. Please request a new one.'
        });
    }
    
    if (otpData.otp !== otp) {
        return res.status(401).json({
            success: false,
            message: 'Invalid OTP'
        });
    }
    
    // OTP verified - create/get user
    let user = Array.from(users.values()).find(u => u.mobile === mobile);
    if (!user) {
        user = {
            id: crypto.randomUUID(),
            mobile,
            role: 'user',
            createdAt: new Date()
        };
        users.set(mobile, user);
    }
    
    // Generate session token
    const sessionToken = crypto.randomBytes(32).toString('hex');
    user.sessionToken = sessionToken;
    user.lastLogin = new Date();
    
    // Clean up OTP
    users.delete(`otp_${mobile}`);
    
    res.json({
        success: true,
        message: 'Login successful',
        user: {
            id: user.id,
            mobile: user.mobile,
            role: user.role
        },
        token: sessionToken
    });
});

// Telegram Login
app.post('/api/auth/telegram', (req, res) => {
    const authData = req.body;
    
    // Verify Telegram authentication
    if (!verifyTelegramAuth(authData)) {
        return res.status(401).json({
            success: false,
            message: 'Invalid Telegram authentication data'
        });
    }
    
    // Create or get user
    const telegramId = authData.id;
    let user = Array.from(users.values()).find(u => u.telegramId === telegramId);
    
    if (!user) {
        user = {
            id: crypto.randomUUID(),
            telegramId,
            firstName: authData.first_name,
            lastName: authData.last_name,
            username: authData.username,
            photoUrl: authData.photo_url,
            role: 'user',
            createdAt: new Date()
        };
        users.set(telegramId, user);
    }
    
    // Generate session token
    const sessionToken = crypto.randomBytes(32).toString('hex');
    user.sessionToken = sessionToken;
    user.lastLogin = new Date();
    
    res.json({
        success: true,
        message: 'Telegram login successful',
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            role: user.role
        },
        token: sessionToken
    });
});

// ============================================
// DEMO BOOKING ENDPOINT
// ============================================

app.post('/api/demo/book', (req, res) => {
    const { fullName, email, mobile, city, address, idCards } = req.body;
    
    // Validation
    if (!fullName || !email || !mobile || !city || !address || !idCards) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid email address'
        });
    }
    
    // Mobile validation (Indian format)
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile.replace(/\D/g, ''))) {
        return res.status(400).json({
            success: false,
            message: 'Invalid mobile number'
        });
    }
    
    // Create demo request
    const demoId = crypto.randomUUID();
    const demoRequest = {
        id: demoId,
        fullName,
        email,
        mobile,
        city,
        address,
        idCards,
        status: 'pending',
        createdAt: new Date()
    };
    
    demoRequests.set(demoId, demoRequest);
    
    // In production: Send confirmation email, notify admin, etc.
    console.log('New demo request:', demoRequest);
    
    res.json({
        success: true,
        message: 'Demo booking successful! We will contact you shortly.',
        demoId
    });
});

// ============================================
// FREE TRIAL SIGNUP ENDPOINT
// ============================================

app.post('/api/trial/signup', (req, res) => {
    const { fullName, email, mobile, organizationName, organizationType } = req.body;
    
    // Validation
    if (!fullName || !email || !mobile) {
        return res.status(400).json({
            success: false,
            message: 'Name, email, and mobile are required'
        });
    }
    
    // Check if user already has a trial
    const existingTrial = Array.from(trialUsers.values()).find(t => t.email === email);
    if (existingTrial) {
        return res.status(400).json({
            success: false,
            message: 'A trial account already exists for this email'
        });
    }
    
    // Create trial user
    const userId = crypto.randomUUID();
    const password = crypto.randomBytes(8).toString('hex'); // Random password
    
    const trialUser = {
        id: userId,
        fullName,
        email,
        mobile,
        organizationName: organizationName || 'N/A',
        organizationType: organizationType || 'N/A',
        password, // In production: hash this!
        role: 'trial',
        plan: 'free',
        maxIdCards: 10,
        trialStartDate: new Date(),
        trialEndDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
        status: 'active',
        createdAt: new Date()
    };
    
    trialUsers.set(userId, trialUser);
    users.set(email, trialUser);
    
    // In production: Send welcome email with credentials
    console.log('New trial user:', trialUser);
    
    res.json({
        success: true,
        message: 'Trial account created successfully!',
        user: {
            id: userId,
            email,
            password, // Send this in email in production, not API response
            trialEndDate: trialUser.trialEndDate,
            loginUrl: '/login'
        }
    });
});

// ============================================
// USER ENDPOINTS
// ============================================

// Get user profile
app.get('/api/user/profile', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Authentication required'
        });
    }
    
    const user = Array.from(users.values()).find(u => u.sessionToken === token);
    
    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Invalid session'
        });
    }
    
    res.json({
        success: true,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            plan: user.plan,
            maxIdCards: user.maxIdCards
        }
    });
});

// ============================================
// ADMIN ENDPOINTS
// ============================================

// Get all demo requests
app.get('/api/admin/demos', (req, res) => {
    const demos = Array.from(demoRequests.values());
    res.json({
        success: true,
        count: demos.length,
        demos
    });
});

// Get all trial users
app.get('/api/admin/trials', (req, res) => {
    const trials = Array.from(trialUsers.values());
    res.json({
        success: true,
        count: trials.length,
        trials
    });
});

// ============================================
// HEALTH CHECK
// ============================================

app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date(),
        uptime: process.uptime()
    });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📝 API Documentation:`);
    console.log(`   POST /api/auth/login - Email/Password login`);
    console.log(`   POST /api/auth/request-otp - Request mobile OTP`);
    console.log(`   POST /api/auth/verify-otp - Verify mobile OTP`);
    console.log(`   POST /api/auth/telegram - Telegram login`);
    console.log(`   POST /api/demo/book - Book demo`);
    console.log(`   POST /api/trial/signup - Start free trial`);
    console.log(`   GET  /api/user/profile - Get user profile`);
    console.log(`   GET  /api/admin/demos - Get demo requests (admin)`);
    console.log(`   GET  /api/admin/trials - Get trial users (admin)`);
    console.log(`   GET  /api/health - Health check`);
});

module.exports = app;
