# ChatGPT Style Chat App

A modern, responsive chat application built with Next.js, TypeScript, and Tailwind CSS, designed to mimic the ChatGPT interface.

## Features

- 🎨 Modern, clean UI similar to ChatGPT
- 🌙 Dark/Light mode support
- 📱 Responsive design
- ⚡ Real-time message rendering
- 🔄 Typing indicators
- 📝 Auto-scrolling to new messages
- ⌨️ Keyboard shortcuts (Enter to send, Shift+Enter for new line)

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository or ensure you're in the project directory
2. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── components/
│   ├── ChatMessage.tsx    # Individual message component
│   └── ChatInput.tsx      # Message input component
├── App.tsx               # Main application component (entry point)
├── page.tsx              # Next.js page component
├── layout.tsx            # Root layout
├── globals.css           # Global styles
└── types.ts              # TypeScript type definitions
```

## Customization

### Adding AI Integration

The app currently uses a mock response generator. To integrate with a real AI service:

1. Replace the `generateResponse` function in `App.tsx`
2. Add your API credentials to environment variables
3. Install the necessary SDK (e.g., OpenAI, Claude, etc.)

### Styling

The app uses Tailwind CSS for styling. You can customize:

- Colors in `tailwind.config.js`
- Global styles in `app/globals.css`
- Component-specific styles in individual components

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Hooks** - State management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License. 