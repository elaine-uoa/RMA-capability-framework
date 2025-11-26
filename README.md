# RMA Capability Framework Self-Assessment Tool

An interactive web application for Research Management & Administration (RMA) staff at the University of Auckland to complete self-assessments across 10 key capabilities.

![RMA Framework](https://img.shields.io/badge/Version-1.5-blue) ![Next.js](https://img.shields.io/badge/Next.js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## 🎯 Purpose

This tool enables RMA staff to:
- **Explore** capabilities in a beautiful, intuitive interface inspired by Untools and Laws of UX
- **Understand** each capability through four progressive levels with Māori alignment statements
- **Assess** their current capabilities with an interactive tabbed interface
- **Plan** their professional development with personalized growth recommendations
- **Export** their development summary as a PDF report

**Note:** This is a professional development tool, not a performance management system.

## ✨ Key Features

### 🎨 Beautiful, Modern Design
- Clean, minimal aesthetic inspired by [Untools](https://untools.co) and [Laws of UX](https://lawsofux.com)
- Soft color gradients and smooth animations
- Responsive design that works on all devices
- Accessible and print-friendly

### 📊 Interactive Assessment
- **Tabbed Interface**: Switch between Foundation, Intermediate, Advanced, and Exemplar levels
- **One-Click Selection**: Select your current level directly from the level details
- **Auto-Save**: Your progress is automatically saved to local storage
- **Visual Indicators**: See your current level at a glance with badges

### 🎯 Smart Navigation
- **Quick Jump**: Dropdown selector to jump to any capability
- **Progress Tracking**: Visual indicators show assessment completion
- **Smooth Transitions**: Navigate between capabilities with elegant prev/next buttons
- **Growth Recommendations**: Personalized suggestions based on your target levels

### 📈 Development Summary
- **Overview Dashboard**: See your progress across all capabilities
- **Growth Opportunities**: Detailed recommendations for skill development
- **Export Options**: Print or save as PDF for development discussions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Run the development server:**
```bash
npm run dev
```

3. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page with capability grid
│   ├── assess/            # Assessment interface
│   │   └── page.tsx       # Interactive tabbed assessment
│   ├── summary/           # Summary and reporting
│   │   └── page.tsx       # Development summary with growth recommendations
│   ├── layout.tsx         # Root layout with providers
│   └── globals.css        # Global styles and custom CSS
├── components/            # Reusable React components
│   ├── CapabilityNavigation.tsx  # Next/Previous navigation with visual cards
│   └── CapabilitySelector.tsx     # Quick-jump dropdown menu
├── contexts/              # React Context providers
│   └── AssessmentContext.tsx     # State management & localStorage persistence
├── data/                  # Data models
│   └── capabilities.ts    # All 10 capabilities with 4 levels each
├── types/                 # TypeScript type definitions
│   └── index.ts          # Type interfaces and models
└── README.md
```

## 🎨 Design Philosophy

The UI/UX is inspired by:

### [Untools](https://untools.co)
- Clean, minimal design with plenty of white space
- Card-based layout with hover effects
- Soft color palette with gradients
- Elegant typography and visual hierarchy

### [Laws of UX](https://lawsofux.com)
- **Hick's Law**: Simplified choices with tabbed interface
- **Miller's Law**: Information chunked into digestible pieces
- **Fitts's Law**: Large, easy-to-click interactive elements
- **Progressive Disclosure**: Details revealed as needed

### Key Design Principles
- **Visual Clarity**: Clean layouts with consistent spacing
- **Smooth Interactions**: Subtle animations and transitions
- **Color Coding**: Each capability has a unique gradient color
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile

## 📊 The 10 Capabilities

1. **Research-related Engagement** - Engage interest-holders to build research impact
2. **Maximising Impact** - Identify, evaluate, and enhance research impact
3. **Researcher Development** - Support development through effective programmes
4. **Environment and Culture** - Support and advance research culture
5. **Funding Opportunities** - Identify and disseminate funding opportunities
6. **Proposal Support** - Support and develop research proposals
7. **Initiation** - Negotiate, agree, and set up research projects
8. **Projects and Initiatives** - Manage research projects and initiatives
9. **Monitoring and Reporting** - Fulfill statutory and compliance requirements
10. **Policy and Strategy** - Contribute to research-related policies

## 📝 Assessment Levels

Each capability has four progressive levels:

- **Foundation** - Technical understanding and foundational skills
- **Intermediate** - Independent execution of complex tasks
- **Advanced** - Deep expertise and autonomous problem-solving
- **Exemplar** - Excellence, strategic thinking, and leadership

Each level includes:
- Detailed bullet points describing expected behaviors
- Māori alignment statements honoring Te Tiriti o Waitangi
- Cultural context and values (Te Ao Māori principles)

## 🔧 Updating Capabilities

To update capability data:

1. Edit `/data/capabilities.ts`
2. Follow the existing structure:

```typescript
{
  id: "capability-id",
  name: "Capability Name",
  description: "Brief description",
  levels: [
    {
      level: "FOUNDATION",
      bulletPoints: ["Indicator 1", "Indicator 2", ...],
      alignmentStatement: "Māori alignment text..."
    },
    // ... other levels
  ]
}
```

## 🔮 Future Enhancements

### Currently Implemented ✅
- All 10 capabilities with 4 levels each
- Interactive tabbed assessment interface
- Auto-save functionality
- Keyword-based search
- Progress tracking
- Summary report with growth recommendations
- Print/PDF export

### Planned Features ⏳
- **Role-Based Filtering**: Filter capabilities by job title
- **Recommended Levels**: Suggested levels based on role
- **Development Pathways**: Role-specific learning paths
- **Peer Comparison**: Anonymous benchmarking (opt-in)
- **Evidence Upload**: Attach supporting documents
- **Manager Review**: Collaborative development planning

**Note:** Role-based recommendations will be available once the University finalizes the role-mapping dataset.

## 🌏 Cultural Considerations

All Māori terms and alignment statements are preserved exactly as written in the framework document. The app respects:

- **Te Tiriti o Waitangi** principles
- **Te Ao Māori** values and worldviews
- **Kaupapa Māori** approaches to research
- Cultural protocols and terminology (Manaakitanga, Whanaungatanga, Kaitiakitanga, etc.)

Each capability level includes specific alignment statements explaining how that level embodies these principles in practice.

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router) with Turbopack
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Icons**: Heroicons
- **Fonts**: Inter (Google Fonts)
- **State Management**: React Context API + localStorage
- **Deployment**: Vercel-ready (or any Node.js hosting)

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Issue: Changes not saving
- Check browser console for localStorage errors
- Ensure cookies/storage are enabled
- Try clearing browser cache

### Issue: Styling looks broken
- Clear `.next` cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Rebuild: `npm run build`

### Issue: Navigation not working
- Ensure JavaScript is enabled
- Check for console errors
- Try a hard refresh (Cmd+Shift+R / Ctrl+F5)

## 📄 License

Developed for the University of Auckland Research Hub.

## 👥 Credits

- **Framework Development**: The Skills Group (David Penney) & University of Auckland
- **Working Group Leads**: Julia Mouatt, Victoria Louise Smith, Louise Brand
- **Working Group**: 16 members from across RMA, especially Hine Busby, Rangimaarie Painting, and Sheye Semple

**Version 1.5** | November 2025

---

## 🎯 Quick Start Guide

1. **Start the app**: `npm run dev`
2. **Explore capabilities** on the home page grid
3. **Click any capability** to begin assessment
4. **Switch between tabs** to view different levels
5. **Click "Select as Current"** to mark your level
6. **Add notes** for reflection and evidence
7. **Navigate** using prev/next buttons
8. **View summary** to see your progress and growth recommendations
9. **Print or save PDF** for development discussions

---

For support or questions, contact the University of Auckland RMA Working Group.
