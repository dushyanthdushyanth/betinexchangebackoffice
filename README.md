# BetinExchange Backoffice

A professional backoffice management system for betting exchange platforms, built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15, React 19, TypeScript
- **Professional UI**: Tailwind CSS with responsive design
- **Type Safety**: Full TypeScript coverage
- **Scalable Architecture**: Modular component structure
- **Industry Standards**: Best practices and conventions

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.6
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **React**: 19.1.0
- **Fonts**: Geist (Google Fonts)

## 📁 Project Structure

```
src/
├── app/                 # Next.js app router
├── components/          # Reusable components
│   ├── ui/             # Basic UI components
│   └── layout/         # Layout components
├── lib/                 # Third-party libraries
├── types/               # TypeScript type definitions
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── services/            # API services
└── constants/           # Application constants
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd betinexchangebackoffice
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file based on `env.example`:

- `NEXT_PUBLIC_API_URL` - Your API base URL
- `NEXTAUTH_SECRET` - Authentication secret key
- `DATABASE_URL` - Database connection string

## 🏗️ Architecture

### Component Structure
- **UI Components**: Reusable, styled components
- **Layout Components**: Page structure and navigation
- **Page Components**: Route-specific components

### State Management
- React hooks for local state
- Context API for global state (when needed)
- Local storage utilities for persistence

### API Integration
- Centralized API endpoints configuration
- Type-safe API responses
- Error handling and loading states

## 🎨 Styling

- **Tailwind CSS 4**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Automatic theme switching
- **Custom Components**: Consistent design system

## 📱 Responsive Design

- Mobile-first approach
- Breakpoint system: sm, md, lg, xl
- Touch-friendly interactions
- Optimized for all screen sizes

## 🔒 Security

- Environment variable protection
- Type-safe API calls
- Input validation utilities
- Secure authentication patterns

## 🧪 Development

### Code Quality
- ESLint configuration
- TypeScript strict mode
- Prettier formatting (recommended)
- Git hooks (recommended)

### Best Practices
- Component composition
- Type safety
- Performance optimization
- Accessibility standards

## 📊 Performance

- Next.js automatic optimization
- Image optimization
- Code splitting
- Lazy loading

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Configure environment variables
3. Deploy automatically on push

### Other Platforms
- Build: `npm run build`
- Start: `npm run start`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Roadmap

- [ ] User authentication system
- [ ] Dashboard components
- [ ] Data management tables
- [ ] Reporting system
- [ ] Admin panel
- [ ] API integration
- [ ] Testing suite
- [ ] CI/CD pipeline

---

**Built with ❤️ using Next.js and modern web technologies**
