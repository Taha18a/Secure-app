console.log(" THIS IS MY SERVER FILE ");

const winston = require('winston');
const express = require('express');
const bodyParser = require('body-parser');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');

const app = express();
const PORT = 3000;
const SECRET_KEY = "your-secret-key";

app.use(bodyParser.json());
app.use(helmet());
app.use(express.static('public'));

let users = [];

// ✅ GLOBAL REQUEST LOGGER (MUST BE BEFORE ROUTES)
app.use((req, res, next) => {
    console.log("🌐 REQUEST:", req.method, req.url);
    next();
});

// ✅ LOGGER (ONLY ONCE)
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
            return `${timestamp} ${level}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: './security.log'
        })
    ]
});

// ======================
// REGISTER ROUTE
// ======================
app.post('/register', async (req, res) => {
    console.log(" REGISTER API HIT");
    logger.info("REGISTER ROUTE HIT");

    const { email, password } = req.body;

    logger.info(`Register attempt: ${email}`);

    if (!validator.isEmail(email)) {
        logger.error("Invalid email entered");
        return res.status(400).send("Invalid email");
    }

    if (!validator.isLength(password, { min: 6 })) {
        logger.error("Weak password entered");
        return res.status(400).send("Password must be at least 6 characters");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = { id: users.length + 1, email, password: hashedPassword };
    users.push(user);

    logger.info(`User registered successfully: ${email}`);

    res.send("User registered successfully");
});

// ======================
// LOGIN ROUTE
// ======================
app.post('/login', async (req, res) => {
    console.log(" LOGIN API HIT");
    logger.info("LOGIN ROUTE HIT");

    const { email, password } = req.body;

    logger.info(`Login attempt: ${email}`);

    const user = users.find(u => u.email === email);

    if (!user) {
        logger.error("User not found");
        return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        logger.error("Invalid password attempt");
        return res.status(400).json({ message: "Invalid credentials" });
    }

    logger.info(`Login successful: ${email}`);

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
});

// ======================
// DASHBOARD ROUTE
// ======================
app.get('/dashboard', (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        logger.error("Access denied - No token");
        return res.status(401).send("Access denied");
    }

    try {
        const token = authHeader.split(" ")[1];
        const verified = jwt.verify(token, SECRET_KEY);

        logger.info(`Dashboard accessed by user ${verified.id}`);

        res.send(`Welcome User ${verified.id} to Dashboard`);
    } catch {
        logger.error("Invalid token used");
        res.status(400).send("Invalid token");
    }
});

// ======================
// SERVER START
// ======================
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    logger.info("Server started successfully");
});
