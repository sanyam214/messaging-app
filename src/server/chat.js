const express = require('express');
const db = require('./config');
const authenticateToken = require('./middleware');

const router = express.Router();


router.get('/users', authenticateToken, (req, res) => {
    db.query('SELECT id, username FROM app_users WHERE id != ?', [req.user.id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error retrieving users');
        }
        res.json(results);
    });
});

router.get('/messages/:receiverId', authenticateToken, (req, res) => {
    const { receiverId } = req.params;
    const { id: senderId } = req.user;

    db.query(
        `SELECT m.message, m.sender_id, m.receiver_id, u1.username AS sender_username, u2.username AS receiver_username
         FROM messages m
         JOIN app_users u1 ON m.sender_id = u1.id
         JOIN app_users u2 ON m.receiver_id = u2.id
         WHERE (m.sender_id = ? AND m.receiver_id = ?) OR (m.sender_id = ? AND m.receiver_id = ?)`,
        [senderId, receiverId, receiverId, senderId],
        (err, results) => {
            if (err) {
                return res.status(500).send('Error retrieving messages');
            }
            const allMessages = results.flatMap((result) => {
                const senderUsername = result.sender_username;
                const receiverUsername = result.receiver_username;

                let parsedMessages = [];
                if (typeof result.message === 'string') {
                    try {
                        parsedMessages = JSON.parse(result.message);
                    } catch (parseError) {
                        console.error('Error parsing messages:', parseError);
                        return [];
                    }
                } else if (Array.isArray(result.message)) {
                    parsedMessages = result.message;
                }

                return parsedMessages.map((msg) => ({
                    ...msg,
                    senderUsername: msg.sender === senderId ? senderUsername : receiverUsername,
                    receiverUsername: msg.receiver === receiverId ? receiverUsername : senderUsername,
                }));
            });

            const recentMessages = allMessages.slice(-50);
            res.json(recentMessages);
        }
    );
});

router.get('/user/:userId', authenticateToken, (req, res) => {
    const { userId } = req.params;
    db.query('SELECT id, username FROM app_users WHERE id = ?', [userId], (err, results) => {
        if (err) {
            console.error('Error retrieving user details:', err);
            return res.status(500).send('Error retrieving user details');
        }
        
        if (results.length === 0) {
            return res.status(404).send('User not found');
        }

        res.json(results[0]);
    });
});

router.post('/message', authenticateToken, (req, res) => {
    const { receiverId, message } = req.body;
    const { id: senderId } = req.user;
    const timestamp = new Date();

    const newMessage = {
        sender: senderId,
        receiver: receiverId,
        message,
        timestamp,
    };

    db.query(
        'SELECT message FROM messages WHERE sender_id = ? AND receiver_id = ?',
        [senderId, receiverId],
        (err, results) => {
            if (err) {
                console.error('Error checking message existence:', err);
                return res.status(500).send('Error checking message existence');
            }

            if (results.length > 0) {

                let existingMessages;
                try {
                    existingMessages = JSON.parse(results[0].message);
                    if (!Array.isArray(existingMessages)) {
                        existingMessages = [];
                    }
                } catch (parseError) {
                    console.error('Error parsing existing messages:', parseError);
                    existingMessages = [];
                }

                existingMessages.push(newMessage);

                if (existingMessages.length > 50) {
                    existingMessages = existingMessages.slice(-50);
                }

                const updatedMessages = JSON.stringify(existingMessages);

                db.query(
                    'UPDATE messages SET message = ?, timestamp = ? WHERE sender_id = ? AND receiver_id = ?',
                    [updatedMessages, timestamp, senderId, receiverId],
                    (updateErr) => {
                        if (updateErr) {
                            console.error('Error updating message:', updateErr);
                            return res.status(500).send('Error updating message');
                        }
                        res.status(200).send('Message updated successfully');
                    }
                );
            } else {
                const initialMessage = JSON.stringify([newMessage]);

                db.query(
                    'INSERT INTO messages (sender_id, receiver_id, message, timestamp) VALUES (?, ?, ?, ?)',
                    [senderId, receiverId, initialMessage, timestamp],
                    (insertErr) => {
                        if (insertErr) {
                            console.error('Error inserting message:', insertErr);
                            return res.status(500).send('Error inserting message');
                        }
                        res.status(201).send('Message inserted successfully');
                    }
                );
            }
        }
    );
});

module.exports = router;
