import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUp from './SignUp';
import Login from './Login';
import Chat from './Chat';
import Logout from './Logout';
import request from 'supertest';
import app from './app';

//Frontend

describe('Frontend: Sign-Up Form Validation', () => {
  test('registers successfully with correct username and password', () => {
    render(<SignUp />);
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'validUser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'ValidPass123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    expect(screen.getByText(/user is successfully loggedin/i)).toBeInTheDocument();
  });

  test('shows error with invalid username or password', () => {
    render(<SignUp />);
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'us' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '12' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    expect(screen.getByText(/username must be at least 4 characters/i)).toBeInTheDocument();
    expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
  });
});

describe('Frontend: Login Validation', () => {
  test('logs in successfully with registered username and password', () => {
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'registeredUser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'ValidPass123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText(/user is a valid, registeredUser/i)).toBeInTheDocument();
  });

  test('shows error for unregistered user login attempt', () => {
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'nonExistentUser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'WrongPass' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText(/user does not exist/i)).toBeInTheDocument();
  });
});

describe('Frontend: Chat Functionality', () => {
  test('sends a message successfully in chat', () => {
    render(<Chat />);
    fireEvent.change(screen.getByPlaceholderText(/type a message/i), { target: { value: 'Hello' } });
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    expect(screen.getByText(/hello/i)).toBeInTheDocument();
  });

  test('does not send an empty message', () => {
    render(<Chat />);
    fireEvent.change(screen.getByPlaceholderText(/type a message/i), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    expect(screen.queryByText(/hello/i)).not.toBeInTheDocument();
  });
});

describe('Frontend: Logout Functionality', () => {
  test('logs out successfully', () => {
    render(<Logout />);
    fireEvent.click(screen.getByRole('button', { name: /logout/i }));
    expect(screen.getByText(/logged successfull/i)).toBeInTheDocument();
  });
});

//Backend

describe('Backend: User Registration and Login', () => {
    it('should register a new user with valid details', async () => {
      const response = await request(app).post('/api/register').send({
        username: 'newUser',
        password: 'ValidPass123',
      });
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User registered successfully');
    });
  
    it('should return error for registering an existing user', async () => {
      const response = await request(app).post('/api/register').send({
        username: 'existingUser',
        password: 'ValidPass123',
      });
      expect(response.status).toBe(409);
      expect(response.body.error).toBe('User already exists');
    });
  
    it('should log in a registered user with correct credentials', async () => {
      const response = await request(app).post('/api/login').send({
        username: 'registeredUser',
        password: 'ValidPass123',
      });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Login successfull');
    });
  
    it('should return error for incorrect login credentials', async () => {
      const response = await request(app).post('/api/login').send({
        username: 'registeredUser',
        password: 'WrongPass',
      });
      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Invalid username or password');
    });
  });
  
  describe('Backend: Chat Functionality', () => {
    it('should send a message to the chat', async () => {
      const response = await request(app).post('/api/chat/send').send({
        userId: 'validUserId',
        message: 'Hello there!',
      });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Message sent successfully');
    });
  
    it('should return error if message is empty', async () => {
      const response = await request(app).post('/api/chat/send').send({
        userId: 'validUserId',
        message: '',
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Message cannot be empty');
    });
  });
  
  describe('Backend: Logout Functionality', () => {
    it('should log out a logged-in user', async () => {
      const response = await request(app).post('/api/logout').send({ userId: 'validUserId' });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('User logged out successfully');
    });
  });