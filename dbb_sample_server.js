require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const admin = require('firebase-admin');

const adKey = {
  "type": "service_account",
  "project_id": "luxuryvalet-dd1fd",
  "private_key_id": "98ded902b45f437fb63488d08568367be18f4162",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCxRIk0jyamNj8m\nD/dJXz4J5VPCdlWl+IIevFpV+YYeTRF0xujCzwLSFF5fa6YBWQergq3cvLIrQEO7\nWq8iiiMlLgqpcNDuRoDtj5FPkVKi1m4OLsP7g+DEumEenhbXeXoUtQRL7Kg/KY9b\nIFuHKCIN2d8ZaUx1SC7amA543dJULMQULw5AP8zCkPZ8rHArSqXBtG2qX712uVEp\n42WC/o34Kmx9csV+znECaxznn+jgAEuShX0QqEfc/Hj8BLODIJ9ZkV2r3ZoKUMYx\ntTHtQXd7mc/ybEi+lT+nZUiOjvpP9E9OIsCcwWpRxjMISr5MQzZpi0cCQRenKsFP\nMmhWLvunAgMBAAECggEAVP0z/yQG9reZbSlIeUAVoW72yowroihUUmIhuYipmct/\nbAqVvBi+FHS5jmwxKgJCYCOGMgeyMHReROxEfX3XPdMmP3icYzEgTUWA+LIG+ZVv\nLJOVWPgwgoGNYL2Q2/wc4OKsza4IOEg3uAv6dgFy2ksz4J4Qj0ZtWFaA0cggOER1\nIIErTeqRo/QVoyclLxP5159ofLhLkc1zLNcMhgiRiUlQtgx3rI91TpKCc4y0LwPQ\nwwXKBHiwTyt0f8d7nDY4Xd7tS9n5NvO2WeBOxKoDfUGczFFpSxfwkNwvMXP8B95H\nERUXsLLYJxDpyks/1/B+X31ngznzdhWk0h0IQQzqcQKBgQDpGu9N5dRwt3WpJYuj\nIl2LvHBOk7CZ/b8LHwe3mOpJHZ6tUvpt/nYNpL7s7swjMRUeMlGQVKYOk7RVNtAt\nK+QJSxRFdfExiglhkbg+nMjYRVl9SC8y1/MrO6W6B24q/u2o9r08bhwDLmdVFqC3\n8LkxZPpwq8848m0e0fnas/KZzwKBgQDCraemF+em6fUBIreyTSa+yf/vT6T+H784\np2JtMMxKP5uPlxT0JsmrwWYDdDoMhOsyA1NwSePkibi9XyaZADcp1W4NlpUNEkXm\nTXc2pylWkT2kV+pX8qo63sRz8h5clfVxZYPFAThLO+bjp1W/MDdxZy8Vo1HvQuNN\nDqt4NqfuqQKBgFhH7yFdTVty34izw3KA7VSihRX9MQDg7J1VnyKVMwWFxjZ2GonV\nuPfp0LUCqyUYzZqmC+XRaSJUJhOvsp+o46/xUzgLNtFAKdVdzp1H23isqvubfuSO\njHVvHZCah8qYyYEYEQr12H4L8O50p2GCNWDTkVVifBRhG5p0g1+kjthZAoGBAIuO\nu4EY3+rLCuUOg0thfWYGHt/qY2f9UDKH48pM0hZj9NuBvfasm6Px13SgbECvRH+s\n3LLBdYpOpE21GVFTUzg9FVDOYvlk4REQ9WYLfVnecqcOkyMLBbeAHKrVpahPpAzv\nbf/bOQTN413Nhm2xXf2Ar8M+Oi1f8Nw7qPZbkBVJAoGBAOAdLOhHt4p7s5OJzt/l\nFZ9hjKlkJTFMZXMQ2CqOUH/IGPvApAnoA3TDGiaF7ggGzuU7bEslnIF3BnzUXsL4\n3KsIYbufSzNugn9yOSiMOVdg2TfEJqipY0aDXt4Ck2xPwD++MnLffNLGVYiQjjrN\nUMY13gBxfB4D5WaRSkFXngO9\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@luxuryvalet-dd1fd.iam.gserviceaccount.com",
  "client_id": "110124923252370291203",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40luxuryvalet-dd1fd.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

if (!admin.apps.length) {
    try {
        const serviceAccount = adKey
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    } catch (err) {
        console.error('Failed to initialize Firebase:', err.message);
    }
}

const db = admin.apps.length ? admin.firestore() : null;

const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [
            'https://www.desotobitsandbytes.com',
            'https://desotobitsandbytes.com',
            'https://www.luxuryvaletnz.com',
            'https://luxuryvaletnz.com'
        ];
        
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log('CORS blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization',
        'Cache-Control',
        'X-Cache-Control'
    ]
};

const app = express();



// Trust Vercel proxy
app.set('trust proxy', 1);

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

const verifyTurnstileToken = async (token, ip) => {
  if (!token) {
    return { success: false, errors: ['missing-input-response'] };
  }

  const params = new URLSearchParams();
  params.append('secret', TURNSTILE_SECRET_KEY);
  params.append('response', token);
  if (ip) params.append('remoteip', ip);

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  });

  if (!response.ok) throw new Error(`Turnstile verify failed (${response.status})`);
  return response.json();
};

// Rate limiter configuration
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20, 
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true, 
    legacyHeaders: false, 
});

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    return res.json({message: 'Hello from the DBB Server :)'})
})



app.post('/validateTurnstile', async (req, res) => {
  try {
    const { token } = req.body;
    const verification = await verifyTurnstileToken(token, req.ip);

    if (!verification.success) {
      return res.status(400).json({
        success: false,
        errors: verification['error-codes'] || ['unknown-error']
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Turnstile validation error:', error);
    res.status(500).json({ success: false, message: 'Validation failed' });
  }
});

app.post('/login', limiter, async (req, res) => {
    try {
        const { email, password, turnstileToken } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required.' });
        }

        const verification = await verifyTurnstileToken(turnstileToken, req.ip);
        if (!verification.success) {
            return res.status(400).json({
                success: false,
                message: 'Security validation failed',
                errors: verification['error-codes'] || []
            });
        }

        // TODO: Add actual user authentication logic here (e.g. Firebase Auth, database lookup)
        // For now, return a placeholder response
        return res.status(200).json({ success: true, message: 'Turnstile verified. Authentication logic pending.' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Login failed.' });
    }
});

app.post('/sendMessage', limiter, async (req, res) => {
    try {
        const data = req.body;
        console.log('turn stile token: ', data.turnstileToken)
        const verification = await verifyTurnstileToken(data.turnstileToken, req.ip);
        console.log('verification response from verifyTurnstileToken function: ', verification)
        if (!verification.success) {
        return res.status(400).json({
            success: false,
            message: 'Security validation failed',
            errors: verification['error-codes'] || []
        });
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, 
            auth: {
                user: "erickcrowne85@gmail.com",
                pass: process.env.PASSWORD,
            },
        });

        // Format email content properly
        const emailContent = `
            Name: ${data.name || 'Not provided'}
            Email: ${data.email || 'Not provided'}
            Message: ${data.message || 'Not provided'}
        `;

        const info = await transporter.sendMail({
            from: '"Desoto Bits and Bytes" <admin@desotobitsandbytes.com>',
            to: "admin@desotobitsandbytes.com",
            subject: "You Have a new message!",
            text: emailContent,
            replyTo: data.email || undefined,
        });

        if (info.accepted.length > 0) {
            res.status(200).json({ success: true, message: 'Email sent!' });
        } else {
            res.status(500).json({ success: false, message: "Email failed!" });
        }
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ success: false, message: "Email failed!", error: error.message });
    }
});

// POST a new customer review
app.post('/reviews', limiter, async (req, res) => {
    try {
        const { name, service, rating, review } = req.body;

        if (!name || !service || !rating || !review) {
            return res.status(400).json({ success: false, message: 'name, service, rating, and review are required.' });
        }

        const parsedRating = parseInt(rating);
        if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
            return res.status(400).json({ success: false, message: 'Rating must be a number between 1 and 5.' });
        }

        const docRef = await db.collection('customerReviews').add({
            name,
            date: new Date(),
            reviewed: false,
            service,
            rating: parsedRating,
            review,
        });

        res.status(201).json({ success: true, id: docRef.id });
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ success: false, message: 'Failed to create review.' });
    }
});

// GET all approved customer reviews (only reviewed === true)
app.get('/reviews', limiter, async (req, res) => {
    try {
        const snapshot = await db.collection('customerReviews')
            .where('reviewed', '==', true)
            .orderBy('date', 'desc')
            .get();
        const reviews = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                service: data.service,
                rating: data.rating || 5,
                review: data.review,
                date: data.date.toDate ? data.date.toDate().toISOString() : data.date,
                reviewed: data.reviewed,
            };
        });
        res.status(200).json({ success: true, reviews });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch reviews.' });
    }
});

// Export for Vercel serverless function
module.exports = app;

app.listen(3000, (e) => {
    if(e) {throw new Error(e.message)}
    else {console.log('Server is running on Port 3000')}
});
