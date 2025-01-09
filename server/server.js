const express = require('express');
const bcrypt = require('bcryptjs');
const sequelize = require('./config/database');
const User = require('./models/user');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

sequelize.sync().then(() => console.log('Database synced')).catch(console.error);

// Register Endpoint
app.post('/register', async (req, res) => {
    const { name, username, password } = req.body;

    // Log untuk debug
    console.log('Request body received:', req.body);

    if (!name || !username || !password) {
        console.error('Validation error: All fields are required');
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, username, password: hashedPassword });
        console.log('User registered successfully');
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
});



// Login Endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    // Tambah logging
    console.log('Login attempt for username:', username);

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            console.log('User not found:', username);
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('Password valid:', isPasswordValid);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Ganti token dummy dengan JWT
        const token = jwt.sign({ id: user.id, username: user.username }, 'admin', { expiresIn: '1h' });

        // Kirim response dengan format JSON
        res.status(200).json({ 
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                username: user.username,
                name: user.name
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));
