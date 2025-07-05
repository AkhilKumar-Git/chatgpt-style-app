// here's the education-
// This is a simple login page. In a real app, you would connect this form to your authentication logic.
// For now, it just shows how to make a form and handle input in React/Next.js.

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  // State to hold form values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  // This function runs when the form is submitted
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send email and password to your backend here
    setMessage('Login submitted! Redirecting to homepage...');
    setTimeout(() => {
      router.push('/');
    }, 1000); // 1 second delay so user sees the message
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-black dark:text-white"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-black dark:text-white"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition-colors"
          >
            Login
          </button>
        </form>
        {message && <div className="mt-4 text-green-600 dark:text-green-400">{message}</div>}
      </div>
    </div>
  );
} 