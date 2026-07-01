# 📊 FinTrack Pro

FinTrack Pro is a sleek, modern, and lightweight personal finance tracker and dashboard application built entirely with vanilla web technologies. It allows users to manage their income, track expenses, visualize cash flow, and maintain complete control over their financial health.

## 🚀 Live Demo
Deploy your version on Vercel:
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AnujSisodiya/FinTracker-Pro)

---

## ✨ Features

- **🔐 User Authentication**
  - Clean registration and login interfaces.
  - Client-side validation.
  - Safe user profiles persisted locally.

- **📈 Real-time Dashboard**
  - **Financial Summary Cards:** Real-time calculation of **Current Balance**, **Total Income**, **Total Expense**, and **Total Transactions**.
  - **Interactive Analytics:** Dynamic line charts showing Cash Flow trends using **Chart.js**.

- **💸 Transaction Management**
  - Add new transactions with descriptions, amounts, custom dates, and categories.
  - Edit or delete existing transactions in real-time.
  - **Toolbar Controls:** Instantly filter transactions by type (Income vs. Expense) or search by description, category, or date.

- **⚙️ Preferences & Customization**
  - **Dark Mode Toggle:** Sleek dark UI for late-night budgeting.
  - **Currency Settings:** Support for multiple global currencies (INR ₹, USD $, EUR €, GBP £, JPY ¥).
  - **Data Management:** Instantly clear and reset all data to start fresh.

---

## 🛠️ Tech Stack

- **Structure:** Semantic HTML5
- **Styling:** Vanilla CSS3 (Custom properties/variables, responsive flex/grid layouts, smooth animations)
- **Logic:** Vanilla JavaScript (ES6+, DOM Manipulation, LocalStorage for state persistence)
- **Charts:** Chart.js (via CDN)
- **Icons:** Font Awesome 6

---

## 📂 Project Structure

```bash
FinTracker-Pro/
│
├── assests/            # Project image assets (logos, icons, etc.)
│   ├── fintrack_logo.png
│   ├── dashboard.png
│   ├── settings.png
│   ├── bank.png
│   ├── Income.png
│   ├── expense.png
│   ├── totaltransaction.png
│   ├── search.png
│   └── delete.png
│
├── index.html          # Login Page (Entry point)
├── login.js            # Login handling & validation
│
├── register.html       # User Registration Page
├── register.js         # User registration handling
│
├── dashboard.html      # Main Application Dashboard
├── dashboard.css       # Layout and styles for the dashboard
├── dashboard.js        # Main app logic (transactions, charts, settings)
│
├── style.css           # Global / Auth pages style sheet
└── README.md           # Documentation
```

---

## ⚙️ Local Setup

Follow these simple steps to run the project locally on your machine:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/AnujSisodiya/FinTracker-Pro.git
   cd FinTracker-Pro
   ```

2. **Run Locally:**
   Since this is a static project, you can run it directly:
   * **Option A:** Double-click `index.html` to open it in your browser.
   * **Option B:** Use VS Code's **Live Server** extension (recommended) to run a local dev server at `http://127.0.0.1:5500`.

---

## ☁️ Deploying to Vercel

FinTrack Pro is ready to deploy to **Vercel** with zero configuration required.

### Deploying via GitHub Integration (Recommended)
1. Go to [Vercel](https://vercel.com) and sign in.
2. Click **Add New** > **Project**.
3. Import your GitHub repository `FinTracker-Pro`.
4. Leave all settings at their default values (no build command or output directory is required for this static project).
5. Click **Deploy**.

> [!NOTE]
> If you are working on a feature branch (e.g. `login-register-logout`), Vercel will generate a **Preview Deployment** link for your commits. To view the changes on your production domain, merge the branch into `main` and push.

### Troubleshooting `DEPLOYMENT_NOT_FOUND`
If you deploy to Vercel and see a `DEPLOYMENT_NOT_FOUND` 404 screen:
- Check that your build was successful on the **Vercel Dashboard**.
- Ensure you are visiting the correct URL generated for your active branch deployment rather than an empty production domain.
- Ensure `index.html` is at the root of your project directory.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
