# Pictory AI Clone - AI-Powered Content Creation Platform

A comprehensive SaaS platform for AI-powered image and video generation, built with Next.js 14, Firebase, and Stripe. This project replicates and enhances the core functionality of Pictory AI with modern web technologies.

![Pictory AI Clone](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Firebase](https://img.shields.io/badge/Firebase-9-orange?style=for-the-badge&logo=firebase)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan?style=for-the-badge&logo=tailwindcss)

## ✨ Features

### 🎨 AI Content Generation
- **Text-to-Image**: Generate stunning images from text descriptions
- **Text-to-Video**: Create engaging videos from text prompts
- **Image-to-Video**: Animate static images into dynamic videos
- **Style Transfer**: Apply artistic styles to existing images
- **Background Removal**: AI-powered background processing

### 👥 User Management
- **Authentication**: Email/password and Google OAuth
- **User Profiles**: Customizable user profiles with avatars
- **Team Collaboration**: Multi-user project sharing
- **Role-based Access**: Owner, admin, and member permissions

### 💳 Subscription & Billing
- **Freemium Model**: Generous free tier with upgrade options
- **Stripe Integration**: Secure payment processing
- **Usage Tracking**: Real-time usage monitoring
- **Plan Management**: Easy subscription upgrades/downgrades

### 🎯 Brand Consistency
- **Brand Kits**: Custom color palettes and fonts
- **Template System**: Reusable design templates
- **Asset Organization**: Structured project management
- **Version Control**: Track asset iterations

### 📊 Analytics & Insights
- **Usage Analytics**: Detailed usage statistics
- **Performance Metrics**: Content engagement tracking
- **Export Options**: Multiple format downloads
- **API Access**: Programmatic content generation

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icon library
- **React Query** - Data fetching and caching

### Backend & Services
- **Firebase** - Complete backend solution
  - Authentication (Auth)
  - Database (Firestore)
  - Storage (Cloud Storage)
  - Functions (Cloud Functions)
- **Stripe** - Payment processing and subscriptions
- **AI Services** - Multiple AI provider integrations
  - Replicate API (Stable Diffusion)
  - OpenAI (DALL-E)
  - RunwayML (Video generation)

### State Management
- **Zustand** - Lightweight state management
- **React Query** - Server state management

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **Prettier** - Code formatting (recommended)

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn** package manager
- **Firebase account** with a new project
- **Stripe account** for payment processing
- **AI service accounts** (Replicate, OpenAI, etc.)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd pictory-ai-clone
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Fill in your environment variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin (Server-side)
FIREBASE_ADMIN_PRIVATE_KEY="your_private_key"
FIREBASE_ADMIN_CLIENT_EMAIL=your_service_account@your_project.iam.gserviceaccount.com
FIREBASE_ADMIN_PROJECT_ID=your_project_id

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# AI Services Configuration
REPLICATE_API_TOKEN=your_replicate_api_token
OPENAI_API_KEY=your_openai_api_key
RUNWAYML_API_KEY=your_runwayml_api_key
PIKA_API_KEY=your_pika_api_key

# Application Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

### 4. Firebase Setup

1. **Create Firebase Project**: Go to [Firebase Console](https://console.firebase.google.com/)
2. **Enable Authentication**: Enable Email/Password and Google providers
3. **Create Firestore Database**: Set up in production mode
4. **Enable Storage**: Set up Firebase Storage
5. **Generate Service Account**: Download the service account key

### 5. Stripe Setup

1. **Create Stripe Account**: Sign up at [Stripe](https://stripe.com/)
2. **Get API Keys**: Copy your publishable and secret keys
3. **Create Products**: Set up your subscription products
4. **Configure Webhooks**: Set up webhook endpoints for subscription events

### 6. AI Services Setup

#### Replicate (Stable Diffusion)
1. Sign up at [Replicate](https://replicate.com/)
2. Get your API token from the dashboard

#### OpenAI (DALL-E)
1. Sign up at [OpenAI](https://openai.com/)
2. Get your API key from the dashboard

#### RunwayML (Video Generation)
1. Sign up at [RunwayML](https://runwayml.com/)
2. Get your API key for video generation

### 7. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
pictory-ai-clone/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── auth/               # Authentication pages
│   │   ├── dashboard/          # Dashboard pages
│   │   ├── generate/           # Content generation pages
│   │   ├── gallery/            # Asset gallery pages
│   │   ├── pricing/            # Pricing pages
│   │   └── settings/           # Settings pages
│   ├── components/             # Reusable React components
│   │   ├── auth/               # Authentication components
│   │   ├── dashboard/          # Dashboard components
│   │   ├── generation/         # Generation components
│   │   ├── layout/             # Layout components
│   │   └── ui/                 # UI components
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility libraries
│   │   ├── firebase/           # Firebase configuration
│   │   ├── stripe/             # Stripe utilities
│   │   └── utils/              # General utilities
│   ├── stores/                 # Zustand stores
│   └── types/                  # TypeScript type definitions
├── public/                     # Static assets
├── .env.example               # Environment variables template
├── .env.local                 # Local environment variables (create this)
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── README.md                  # Project documentation
```

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type checking
npm run type-check
```

### Code Style

- Use TypeScript for all new files
- Follow the existing component structure
- Use Tailwind CSS for styling
- Implement proper error handling
- Add JSDoc comments for complex functions

### Git Workflow

1. Create feature branches from `main`
2. Use conventional commit messages
3. Submit pull requests for review
4. Ensure all tests pass before merging

## 🚢 Deployment

### Vercel (Recommended)

1. **Connect Repository**: Import your project to Vercel
2. **Environment Variables**: Add all environment variables
3. **Deploy**: Automatic deployment on push to main

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Google Cloud Platform
- Railway

## 📊 Subscription Plans

### Free Tier
- 10 images per month
- 3 videos per month
- 1 GB storage
- Basic templates

### Pro Plan ($29/month)
- 500 images per month
- 50 videos per month
- 25 GB storage
- Priority processing
- API access
- Commercial rights

### Enterprise Plan ($99/month)
- 2,000 images per month
- 200 videos per month
- 100 GB storage
- Team collaboration
- Custom branding
- Priority support

## 🛡️ Security

- All user data is encrypted at rest and in transit
- Firebase Security Rules protect database access
- Stripe handles secure payment processing
- Environment variables secure API keys
- Input validation prevents injection attacks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you need help with setup or have questions:

1. Check the [Issues](../../issues) page
2. Review the documentation
3. Contact the development team

## 🎯 Roadmap

### Phase 1 (MVP) ✅
- [x] User authentication
- [x] Basic UI/UX
- [x] Firebase integration
- [x] Stripe payment setup
- [x] Project structure

### Phase 2 (Core Features)
- [ ] AI image generation
- [ ] AI video generation
- [ ] Asset management
- [ ] Brand kit system
- [ ] Usage tracking

### Phase 3 (Advanced Features)
- [ ] Team collaboration
- [ ] Advanced AI models
- [ ] API development
- [ ] Mobile app
- [ ] Analytics dashboard

### Phase 4 (Scale & Growth)
- [ ] Enterprise features
- [ ] Third-party integrations
- [ ] Marketplace
- [ ] International expansion

---

**Built with ❤️ using Next.js, Firebase, and cutting-edge AI technology.**
