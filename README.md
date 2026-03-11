# CineSeat Movie Booking UI

Production-oriented static frontend for a movie ticket booking flow built with HTML and modular CSS. The project is structured for enterprise review, maintainability, accessibility, and future migration to component-based frameworks.

## Project Overview

The UI models a real-world movie booking journey similar to BookMyShow:

Home -> City Selection -> Movies -> Theatre Selection -> Seat Selection -> Booking Summary -> Payment -> Confirmation

This version intentionally avoids JavaScript so the focus stays on information architecture, layout systems, semantic markup, reusable visual patterns, and future extensibility.

## Architecture

- `index.html` acts as the landing and discovery page.
- `pages/` contains the complete booking flow.
- `components/` stores reusable markup references for navbar, footer, movie card, theatre card, seat grid, and ticket snippets.
- `css/base.css` defines reset rules, tokens, typography, and global foundations.
- `css/layout.css` defines containers, grids, section spacing, and page composition helpers.
- `css/components.css` contains all reusable UI modules such as navbar, cards, buttons, theatre cards, seat map, payment options, and ticket summary.
- `css/utilities.css` provides small helper classes for spacing and text alignment.
- `css/responsive.css` adapts layouts for desktop, tablet, and mobile breakpoints.

## Folder Structure

```text
movie-booking-ui
|- index.html
|- pages
|  |- city.html
|  |- movies.html
|  |- theatres.html
|  |- seats.html
|  |- booking-summary.html
|  |- payment.html
|  `- confirmation.html
|- components
|  |- navbar.html
|  |- footer.html
|  |- movie-card.html
|  |- theatre-card.html
|  |- seat-grid.html
|  `- ticket.html
|- css
|  |- base.css
|  |- layout.css
|  |- components.css
|  |- utilities.css
|  `- responsive.css
|- assets
|  |- fonts
|  |- icons
|  |- images
|  `- hollywood
`- README.md
```

## Page Flow

1. `index.html`: landing page with booking overview and featured titles.
2. `pages/city.html`: city selection and search interface.
3. `pages/movies.html`: movie listing with consistent card patterns.
4. `pages/theatres.html`: theatre comparison with show time CTAs.
5. `pages/seats.html`: cinema-style seat map with legend and seat states.
6. `pages/booking-summary.html`: ticket-like booking summary and pricing.
7. `pages/payment.html`: accessible payment method selection.
8. `pages/confirmation.html`: final confirmation ticket and booking reference.

## Accessibility Notes

- Semantic landmarks: `header`, `nav`, `main`, `section`, `aside`, `footer`
- Meaningful `alt` text on posters
- Form labels and accessible radio inputs
- Seat buttons use `aria-label` values for state and class
- Visible focus-ready button and navigation styles

## Screenshots

Add screenshots here after local preview:

- Landing page
- Movies listing
- Theatre selection
- Seat map
- Booking summary
- Confirmation ticket

## How To Run Locally

1. Clone or download the project.
2. Open the project root in your editor.
3. Launch `index.html` directly in a browser, or use a simple static server.

Example with VS Code Live Server or any local static host is sufficient because the project has no build step.

## Future Enhancements

- Convert reusable markup into React components
- Connect movie, theatre, and seat inventory to APIs
- Add dynamic seat selection and availability updates
- Add login, profile, and booking history flows
- Integrate payment gateways and validation
- Generate QR ticket, downloadable invoice, and email confirmation

## Extension Readiness

The project is prepared for future enterprise implementation because:

- design tokens are centralized through CSS variables
- layout and components are separated
- page sections map cleanly to future React components
- static booking data is isolated in predictable markup blocks
- accessible semantics reduce rework during framework migration
