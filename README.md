# Scientific Calculator App

A stunning, professional-grade scientific calculator built with **Next.js 16** and modern web technologies. Features a premium glassmorphic dark theme with smooth animations and comprehensive mathematical functions.

![Scientific Calculator](/.gemini/antigravity/brain/f2eb0d9b-2176-4900-98f9-9e611181b352/calculator_ui_1768286460044.png)

## ✨ Features

### 🧮 Mathematical Functions
- **Basic Operations**: Addition, subtraction, multiplication, division
- **Trigonometric**: sin, cos, tan, asin, acos, atan (with RAD/DEG toggle)
- **Hyperbolic**: sinh, cosh, tanh
- **Logarithmic**: ln (natural log), log (base 10), log2
- **Powers & Roots**: x², x³, xʸ, √, ∛
- **Advanced**: Factorial, absolute value, modulo, reciprocal, exponential
- **Constants**: π (pi), e (Euler's number), φ (golden ratio)

### 💾 Memory Functions
- **MC**: Memory Clear
- **MR**: Memory Recall
- **M+**: Memory Add
- **M-**: Memory Subtract
- **MS**: Memory Store

### 📊 User Experience
- **Calculation History**: Track up to 10 recent calculations
- **Click-to-Reuse**: Click any history item to load its result
- **Keyboard Support**: Full keyboard shortcuts for faster input
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **Smooth Animations**: Glassmorphic effects and micro-interactions

### ⌨️ Keyboard Shortcuts
| Action | Key |
|--------|-----|
| Numbers | 0-9 |
| Decimal Point | . |
| Add | + |
| Subtract | - |
| Multiply | * |
| Divide | / |
| Calculate | Enter or = |
| Clear All | Esc |
| Backspace | Backspace |
| Percent | % |

## 🎨 Design Features

- **Glassmorphism**: Semi-transparent glass-like UI elements
- **Dark Theme**: Easy on the eyes with a modern dark aesthetic
- **Gradient Accents**: Beautiful blue-to-purple gradients
- **Animated Background**: Subtle moving grid pattern
- **Smooth Transitions**: Every interaction feels polished
- **Premium Typography**: Using Google's Inter font family

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone or download this repository

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Custom CSS Variables
- **Language**: JavaScript (ES6+)
- **Font**: [Inter](https://fonts.google.com/specimen/Inter) from Google Fonts
- **Icons**: Unicode/Emoji for lightweight rendering

## 📁 Project Structure

```
test/
├── app/
│   ├── layout.js          # Root layout with metadata
│   ├── page.js            # Home page
│   └── globals.css        # Global styles and design system
├── components/
│   └── Calculator.js      # Main calculator component
├── public/
│   ├── next.svg
│   └── vercel.svg
└── README.md
```

## 🎯 Component Architecture

### Calculator Component
- **State Management**: React useState hooks for all calculator states
- **Event Handlers**: useCallback for optimized re-renders
- **Keyboard Events**: useEffect for global keyboard listener
- **Button Component**: Reusable button with multiple variants

### Design System
All design tokens are defined as CSS custom properties in `globals.css`:
- Color palette
- Glassmorphic effects
- Shadow definitions
- Animation keyframes

## 🌟 Highlights

1. **No External Calculator Libraries**: Pure JavaScript implementation
2. **Type-Safe Calculations**: Proper handling of edge cases and errors
3. **Accessible**: Keyboard-first design with proper focus management
4. **Performant**: Optimized React rendering with useCallback
5. **SEO Optimized**: Proper metadata and semantic HTML

## 🔧 Customization

### Changing Colors
Edit the CSS variables in `app/globals.css`:
```css
:root {
  --accent-primary: #6366f1;  /* Change to your preferred color */
  --accent-secondary: #8b5cf6;
  --accent-tertiary: #ec4899;
}
```

### Adding New Functions
1. Add a new case in the `handleScientific` function
2. Create a corresponding button in the button grid
3. Update history if needed

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📄 License

This project is open source and available for personal and commercial use.

## 🎓 Perfect For

- Students learning mathematics
- Engineers and scientists
- Web developers looking for calculator UI inspiration
- Anyone needing a beautiful, functional calculator

---

Built with ❤️ using Next.js and modern web technologies.
