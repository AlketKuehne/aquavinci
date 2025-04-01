# 🌊 AquaVinci

AquaVinci is a modern shipment management platform designed to streamline the process of creating, managing, and tracking shipments. Built with [Next.js](https://nextjs.org), AquaVinci offers a user-friendly interface and robust features to handle both Full Container Load (FCL) and Less Container Load (LCL) shipments.

![Next.js](https://img.shields.io/badge/Next.js-13.4-blue?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue?style=flat-square&logo=typescript)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=flat-square&logo=javascript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-blue?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 🚀 Features

- **Dynamic Shipment Creation**: Easily create shipments with detailed information for consignors and consignees.
- **FCL & LCL Support**: Handle both Full Container Load and Less Container Load shipments with tailored options.
- **Real-Time Validation**: Ensure all required fields are filled with real-time form validation.
- **Date Constraints**: Automatically calculate valid shipping and arrival dates based on origin and destination.
- **Interactive UI**: Smooth navigation with scroll-based animations and responsive design.
- **Dangerous Goods Handling**: Mark shipments as dangerous goods for additional safety measures.
- **Cancel Confirmation**: Popup confirmation for canceling shipment creation to prevent accidental data loss.

---

## 📂 Project Structure

```
aquavinci/
├── app/
│   ├── create-shipment/
│   │   ├── page.tsx         # Main shipment creation page
│   │   ├── details/
│   │   │   ├── page.tsx     # Shipment details page
│   ├── page.tsx             # Landing page
├── public/
│   ├── logoname.png         # Project logo
├── styles/
│   ├── globals.css          # Global styles
├── README.md                # Project documentation
```

---

## 🛠️ Technologies Used

- **Framework**: [Next.js](https://nextjs.org)
- **Styling**: [TailwindCSS](https://tailwindcss.com)
- **Languages**:
  - [TypeScript](https://www.typescriptlang.org)
  - [JavaScript (ES6+)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- **Icons & Images**: [Next/Image](https://nextjs.org/docs/api-reference/next/image)
- **State Management**: React `useState` and `useEffect`

---

## 📖 How to Use

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/aquavinci.git
cd aquavinci
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Run the Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## 📋 Features Overview

### Shipment Creation
- Fill in consignor and consignee details, including name, address, and contact information.
- Select shipment type (FCL or LCL) and provide additional details like container type or package type.

### Date Management
- Automatically calculate valid shipping and arrival dates based on origin and destination.
- Real-time validation ensures shipping dates are before arrival dates.

### Fragile Items
- Mark items as fragile and specify categories and subcategories.
- Option to request additional protection for fragile items.

### Dynamic Navigation
- Smooth scroll-based navigation with a responsive design.

---

## 📸 Screenshots

### Home Page
https://aquavinci.vercel.app/

### Create Shipment
https://aquavinci.vercel.app/create-shipment

---

## 🛳️ Supported Countries and Ports

AquaVinci supports a wide range of countries and ports for shipment management. Check the full list in the codebase under `citiesWithPorts`.

---

## 🧑‍💻 Contributing

We welcome contributions! To get started:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

---

## 🌐 Links

- **GitHub Repository**: [AquaVinci](https://github.com/AlketKuehne/aquavinci)
- **Documentation**: [Next.js Docs](https://nextjs.org/docs)

---

## 🙌 Acknowledgements

- [Next.js](https://nextjs.org) for the amazing framework.
- [TailwindCSS](https://tailwindcss.com) for the beautiful styling.
- [Vercel](https://vercel.com) for deployment.

---

Made by [AlketKuehne](https://github.com/AlketKuehne)
