const express = require('express');
const bcrypt = require('bcryptjs');
const sequelize = require('./config/database');
const User = require('./models/user');
const cors = require('cors');
const rplRoutes = require('./routes/rplRoutes')

const app = express();
app.use(express.json());
app.use(cors());

sequelize.sync().then(() => console.log('Database synced')).catch(console.error);


app.post('/register', async (req, res) => {
    const { name, username, password } = req.body;

    
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




app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    

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

        res.status(200).json({ 
            message: 'Login successful',
            token: 'dummy-token', 
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


app.use('/api', rplRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
