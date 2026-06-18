# 🩺 HealthAware SL

> **Digital Health Awareness Platform for Sierra Leone**

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![SDG 3](https://img.shields.io/badge/SDG-3%20Good%20Health-4C9F38)](https://sdgs.un.org/goals/goal3)
[![SDG 2](https://img.shields.io/badge/SDG-2%20Zero%20Hunger-DDA63A)](https://sdgs.un.org/goals/goal2)
[![SDG 6](https://img.shields.io/badge/SDG-6%20Clean%20Water-26BDE2)](https://sdgs.un.org/goals/goal6)
[![DPG Standard](https://img.shields.io/badge/Digital%20Public%20Good-DPG%20Standard-0099FF)](https://digitalpublicgoods.net/standard/)
[![React](https://img.shields.io/badge/Built%20with-React-61DAFB?logo=react)](https://react.dev/)
[![Claude AI](https://img.shields.io/badge/Powered%20by-Claude%20AI-7B61FF)](https://www.anthropic.com/)

HealthAware SL is a free, open-source web-based health information and alert system tailored to the specific needs of Sierra Leone. It combines a curated health library, real-time outbreak alerts, anonymous community reporting, and an AI-powered health assistant into a single accessible platform — available to anyone, at no cost.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [SDG Alignment](#sdg-alignment)
- [Getting Started](#getting-started)
- [Usage Guide](#usage-guide)
- [Data Schema](#data-schema)
- [AI Integration](#ai-integration)
- [Privacy & Legal](#privacy--legal)
- [Contributing](#contributing)
- [Team](#team)
- [License](#license)

---

## Overview

Access to reliable health information remains one of the most pressing challenges facing communities in Sierra Leone. Millions of Sierra Leoneans continue to face barriers to essential health knowledge — from disease prevention and maternal care to mental health awareness and nutrition guidance.

HealthAware SL was built to bridge that gap. The platform is a **Digital Public Good (DPG)** licensed under the MIT License, ensuring it is freely available, reusable, and modifiable by governments, NGOs, developers, and community organisations.

---

## Features

🏠 **Home Dashboard** — Key statistics, latest outbreak alert, and quick navigation to all platform sections.

📚 **Health Information Library** — Six peer-reviewed health articles covering Sierra Leone's most critical public health topics. Fully searchable and filterable by category (Prevention, Maternal Health, Hygiene, Mental Health, Nutrition). Each article is tagged by SDG alignment and attributed to its health authority source.

🔔 **Alert System** — Real-time health notifications across three severity tiers:
- 🚨 High — Outbreak alerts (red)
- 📢 Medium — Public notices (amber)
- ℹ️ Info — Informational announcements (blue)

Includes an email subscription option for ongoing alert delivery.

📝 **Community Health Reporting** — An anonymous form for users to submit health concerns observed in their district. No personally identifiable information is required. Submissions support community-level disease surveillance.

🤖 **AI Health Assistant** — Powered by Anthropic's Claude API, contextualised for Sierra Leone and West Africa. Users can ask any health question in plain English and receive evidence-informed, actionable guidance. Every response concludes with a recommendation to consult a qualified health worker for personal medical matters.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React (JSX) |
| Styling | Inline CSS with CSS variables / External stylesheet (HTML version) |
| AI Backend | Anthropic Claude API (`claude-sonnet-4-20250514`) |
| Fonts | Google Fonts — Inter, DM Serif Display, JetBrains Mono |
| Hosting | Static deployment (GitHub Pages, Vercel, Netlify, or any web server) |
| License | MIT |

---

## SDG Alignment

| SDG | How HealthAware SL Contributes |
|---|---|
| **SDG 3 — Good Health and Well-Being** | Articles on malaria prevention, maternal and child health, mental health awareness, and HIV/AIDS prevention. AI assistant for health queries. |
| **SDG 2 — Zero Hunger** | Article on childhood nutrition, addressing malnutrition in children under five in Sierra Leone. |
| **SDG 6 — Clean Water and Sanitation** | Article on clean water and sanitation, addressing cholera and typhoid prevention. |

---

## Getting Started

### Option 1 — React App (JSX)

**Prerequisites:** Node.js 18+ and npm

```bash
# 1. Clone the repository
git clone https://github.com/your-username/healthaware-sl.git
cd healthaware-sl

# 2. Install dependencies
npm install

# 3. Add your Anthropic API key
# Create a .env file in the root directory:
echo "VITE_ANTHROPIC_API_KEY=your_api_key_here" > .env

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Option 2 — Static HTML Version

No build step required. Simply open `healthaware.html` in any modern browser, or serve the folder with any static web server:

```bash
# Using Python
python3 -m http.server 8080

# Using Node.js (npx)
npx serve .
```

> **Note:** The AI Health Assistant requires a valid Anthropic API key. Without it, the assistant will show an unavailability message. All other platform features work without an API key.

---

## Usage Guide

### Home Dashboard
The home tab provides an at-a-glance overview of the platform: total article count, active alert count, SDGs covered, and the latest high-priority health alert. Use the action buttons to navigate to the Health Library or Alert System.

### Health Information Library
- Use the **search bar** to find articles by keyword (title or summary).
- Use the **category filter** to browse by topic: All, Prevention, Maternal Health, Hygiene, Mental Health, or Nutrition.
- Click any article card to open the full article detail view, including prevention tips and the source authority.

### Alert System
Browse active health alerts sorted by severity. Subscribe to email notifications by entering your email address. A privacy notice confirms that your email will be used only for alert delivery.

### Community Health Reporting
Fill in your district/location and a brief description of the health concern you have observed. Submissions are anonymous — no name, phone number, or personal identifier is required. A confirmation screen will appear after submission.

### AI Health Assistant
Type any health question in plain English. The assistant is configured to focus on health topics relevant to Sierra Leone and West Africa, emphasise prevention, and recommend professional care for personal medical decisions.

---

## Data Schema

Health articles are stored in a structured JSON format within `HEALTH_DATA`:

```json
{
  "id": 1,
  "title": "Malaria Prevention in Sierra Leone",
  "category": "Prevention",
  "sdg": "SDG 3",
  "summary": "Malaria remains one of the leading causes of death in Sierra Leone...",
  "tips": [
    "Sleep under treated mosquito nets",
    "Remove stagnant water around your home",
    "Wear long sleeves at dusk and dawn",
    "Visit a clinic immediately if you feel feverish"
  ],
  "author": "Ministry of Health, SL",
  "date": "2026-03-01"
}
```

Health alerts follow this schema:

```json
{
  "id": 1,
  "type": "outbreak",
  "title": "Cholera Alert – Western Area",
  "message": "Cases of cholera have been reported in parts of Freetown...",
  "date": "2026-06-08",
  "severity": "high"
}
```

**Severity values:** `"high"` | `"medium"` | `"info"`

**Article categories:** `Prevention` | `Maternal Health` | `Hygiene` | `Mental Health` | `Nutrition`

---

## AI Integration

The AI Health Assistant uses the Anthropic Claude API with a custom system prompt:

```
You are a public health assistant for Sierra Leone. You give clear, accurate,
plain-English answers about health topics relevant to Sierra Leone and West Africa.
Focus on prevention, when to seek care, and local context. Always end by recommending
users consult a qualified health worker for personal medical advice.
Keep answers under 200 words.
```

**API endpoint:** `https://api.anthropic.com/v1/messages`  
**Model:** `claude-sonnet-4-20250514`  
**Max tokens:** `1000`

All API calls are made over HTTPS. No user query content is stored by the platform.

---

## Privacy & Legal

HealthAware SL was designed with **privacy by default**:

- **Email addresses** (alert subscription) are collected with explicit user consent, used only for alert delivery.
- **Community health reports** are submitted anonymously — no personally identifiable information is required or stored.
- **No sensitive health data** is stored client-side or transmitted to insecure endpoints.
- The platform complies with the **ECOWAS Supplementary Act on Personal Data Protection** (A/SA.1/01/10).

All health content is either original or attributed to public health authorities (WHO, UNICEF, Ministry of Health SL, WFP) and presented as summarised guidance.

---

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request.

Please ensure any health content additions are attributed to a recognised health authority (WHO, UNICEF, Ministry of Health SL, or equivalent). Accuracy and source credibility are essential for a public health platform.

Areas where contributions are especially welcome:
- Krio, Temne, and Mende language translations
- Progressive Web App (PWA) offline support
- Additional health articles (with proper sourcing)
- District-level map integration for community reports

---

## Team

Developed by a collaborative team of student developers from Sierra Leone:

| Role | Contributor |
|---|---|
| Project Manager & Documentation Lead | Moses Kargbo |
| Content & Research | All team members |
| Legal & Compliance Lead | Team |
| Frontend Development | Team |

---

## License

```
MIT License

Copyright (c) 2026 HealthAware SL Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

---

*HealthAware SL is a Digital Public Good aligned with the [DPG Standard](https://digitalpublicgoods.net/standard/) and UNICEF's open-source principles. Built with ❤️ for Sierra Leone.*
