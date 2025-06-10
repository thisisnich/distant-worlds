# Distant Worlds - Next.js Project

This is the Next.js conversion of the original Distant Worlds procedural planet collection website.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
distant-worlds-next/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with fonts and metadata
│   │   ├── page.tsx            # Main homepage component
│   │   └── globals.css         # Global styles and animations
│   ├── components/
│   │   ├── PlanetCard.tsx      # Individual planet card component
│   │   ├── ClaimModal.tsx      # Modal for claiming planets
│   │   ├── StarField.tsx       # Animated background component
│   │   └── Notification.tsx    # Toast notification component
│   ├── types/
│   │   └── planet.ts           # TypeScript interfaces
│   └── utils/
│       └── parseMarkdown.ts    # Utility for parsing planet data
├── public/
│   ├── world_001_aetheris.md   # Planet data files
│   ├── world_002_solithar.md
│   └── world_003_calyx_vehl.md
└── tailwind.config.js          # Tailwind CSS configuration
```

## ✨ Features Converted

- ✅ **Responsive Design**: Fully responsive layout using Tailwind CSS
- ✅ **Animated Star Field**: Canvas-based star field background
- ✅ **Planet Cards**: Interactive planet cards with hover effects
- ✅ **Claim Modal**: Functional modal for claiming planets
- ✅ **Notifications**: Toast notifications for user feedback
- ✅ **TypeScript**: Full TypeScript support for type safety
- ✅ **Custom Fonts**: Orbitron and Inter fonts loaded via Google Fonts
- ✅ **Markdown Parsing**: Dynamic loading of planet data from markdown files

## 🎨 Styling

The project uses:
- **Tailwind CSS** for utility-first styling
- **Custom animations** for smooth transitions
- **Space-themed color palette** with gradients
- **Responsive grid layout** for planet cards

## 📧 Email Integration

The claim functionality is set up but needs email service integration. You can:

1. **Use FormSubmit**: Uncomment and configure the FormSubmit endpoint in `sendClaimNotification`
2. **Use EmailJS**: Install and configure EmailJS for client-side email sending
3. **Use Resend**: Add Resend API for server-side email handling
4. **Custom API**: Create your own API endpoint for email handling

## 🔧 Customization

### Adding New Planets
1. Create a new markdown file in `/public/` following the format: `world_XXX_planetname.md`
2. Add the filename to the `planetFiles` array in `src/app/page.tsx`

### Styling Changes
- Modify `src/app/globals.css` for global styles
- Update `tailwind.config.js` for theme customization
- Edit component styles directly in the TSX files

### Email Configuration
Update the `sendClaimNotification` function in `src/app/page.tsx` with your preferred email service.

## 🆚 Original vs Next.js

| Feature | Original | Next.js |
|---------|----------|---------|
| Framework | Vanilla HTML/CSS/JS | Next.js + React + TypeScript |
| Styling | Custom CSS | Tailwind CSS |
| State Management | DOM manipulation | React state |
| Type Safety | None | Full TypeScript |
| Performance | Basic | Optimized with Next.js |
| SEO | Basic | Enhanced with Next.js |
| Development | Live Server | Hot reload + dev tools |

## 🚀 Deployment

The project can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **GitHub Pages** (with static export)
- Any hosting service supporting Node.js

For static export (if needed):
```bash
npm run build
npm run export  # Add this script to package.json if needed
```

## 🛠️ Technologies Used

- **Next.js 15** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Google Fonts** - Orbitron and Inter fonts
- **Canvas API** - Star field animation 