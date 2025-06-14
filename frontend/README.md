# SPT Redesign Website

## Project Description

This project is a Next.js web application for SPT (likely a Superannuation or Pension Trust). It provides a comprehensive online platform with various features including informational pages about the organization and its schemes, forms for enrollment and claims, a member portal for registered users, a pension calculator, and sections for news/media like a blog and events, as well as testimonials.

## Features

Based on the project structure, the website includes the following key features:

*   **Informational Sections:** About Us, Contact, Testimonials, and detailed pages for various Pension Schemes (DOSH Pension, Employer Sponsored, Master Trust, Personal Pension, Provident Fund).
*   **Forms:** Various forms for Employee Enrollment, Employer Enrollment, Personal Pension Claims, Tier 2 Beneficiary/Benefit Claims, and Tier 3 Beneficiary/Benefit Claims.
*   **Member Portal:** A dedicated area for member login and setup.
*   **Pension Calculator:** A tool to help users calculate pension-related figures.
*   **Media & News:** Sections for a Blog and Events, likely with individual pages for each entry.
*   **Services:** Information and tools related to Enrollment, FAQs, a Self-Service Center, and Survey Feedback.
*   **Reusable UI Components:** A library of shared UI elements for consistency.
*   **Theme Toggling:** Support for different color themes.
*   **Social Integration:** Share buttons and a WhatsApp contact button.

## Technologies Used

The project is built using the following main technologies and libraries:

*   Next.js
*   React
*   TypeScript
*   Tailwind CSS
*   Radix UI (for various components like Accordion, Dialog, Dropdown Menu, etc.)
*   React Hook Form & Zod (for form handling and validation)
*   Framer Motion (for animations)
*   Date-fns (for date manipulation)
*   Other libraries for specific UI components (Embla Carousel, cmdk, recharts, sonner, vaul, etc.)

## Installation

To set up the project locally, follow these steps:

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2.  Navigate to the project directory:

    ```bash
    cd spt-redesign-website
    ```

3.  Install dependencies using npm:

    ```bash
    npm install
    ```

## Usage

To run the project locally in development mode:

```bash
npm run dev
```

Open your browser and visit `http://localhost:3000` to see the website.

To build the project for production:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

To lint the code:

```bash
npm run lint
```

## Project Structure

```
spt-redesign-website/
├── app/                 # Application routes and pages
│   ├── about/
│   ├── contact/
│   ├── forms/           # Various forms
│   ├── media/           # Blog and Events
│   ├── member-portal/
│   ├── pension-calculator/
│   ├── schemes/         # Pension scheme details
│   ├── services/
│   └── testimonials/
├── components/          # Reusable React components
│   ├── events/
│   ├── layout/
│   ├── survey/
│   └── ui/              # Shared UI components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and schemas
├── public/              # Static assets
├── styles/              # Global styles
├── .gitignore
├── package.json
├── next.config.js
└── tsconfig.json
# ... other files and directories
```

## Contributing

[Optional: Add contributing guidelines here]

## License

[Optional: Add license information here]

## Contact

[Optional: Add contact information or links here] 