# Booking Platform Prototype

A responsive service-booking platform prototype built with **Laravel 13, React, TypeScript, Inertia.js, and Tailwind CSS**.

## Features
- Responsive landing page
- Service and location filtering
- Interactive date picker
- Provider listings with pricing and availability information
- Provider detail dialogs
- Reusable UI components

## Tech Stack
- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend Framework:** Laravel 13
- **Frontend Integration:** Inertia.js
- **UI Components:** shadcn/ui, Lucide React

## Project Status
Frontend prototype with sample provider data. Database-backed bookings and payment processing are not yet implemented.

## Local Setup
1. Clone the repository.
2. Run `composer install`.
3. Run `npm install --legacy-peer-deps`.
4. Copy `.env.example` to `.env`.
5. Run `php artisan key:generate`.
6. Run `npm run build`.
7. Run `php artisan serve`.

Open `http://127.0.0.1:8000` in your browser.
