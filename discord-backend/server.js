const path = require('path');
require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

const authRoutes = require('./routes/authRoutes');
const socketServer = require('./socketServer');
const friendRequestsRoutes = require('./routes/friendRequestsRoutes');

// Connect to database
connectDB();
// Initialize express
const app = express();
// cors middleware
app.use(cors());
// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);
// Socket.io
socketServer(server);

// Production setup
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../discord-frontend', 'build')));

  app.get('*', (_, res) =>
    res.sendFile(
      path.resolve(__dirname, '../discord-frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (_, res) => {
    res.send('API is running...');
  });
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/friend-requests', friendRequestsRoutes);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
