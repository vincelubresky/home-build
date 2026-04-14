# Deploying Your Home Build Dashboard

## What was built

A web dashboard at `/home/vince/home-build` with six sections:
- **Budget** — track spending by category, log expenses
- **Materials** — track items needed → ordered → delivered → installed
- **Timeline** — build phases and milestones with status tracking
- **Contractors** — contact info + running notes per contractor
- **Loan & Draws** — construction loan details and draw schedule
- **Plans & Permits** — permits, inspections, certificates, with file links

---

## Step 1: Push to GitHub

1. Go to https://github.com/new and create a new private repo called `home-build`
2. In your terminal, run:
   ```
   cd /home/vince/home-build
   git remote add origin https://github.com/YOUR_USERNAME/home-build.git
   git add .
   git commit -m "Initial home build dashboard"
   git push -u origin main
   ```

---

## Step 2: Deploy to Render

1. Go to https://render.com and sign in (or create a free account)
2. Click **New** → **Blueprint**
3. Connect your GitHub account and select the `home-build` repo
4. Render will detect the `render.yaml` file and automatically create:
   - A **web service** for the dashboard
   - A **PostgreSQL database** (free tier)
5. Click **Apply** — Render builds and deploys automatically
6. Once done, Render gives you a URL like `https://home-build-dashboard.onrender.com`

> **Note:** The free Render database will spin down after 90 days of inactivity. Upgrade to a paid plan ($7/mo) for always-on database.

---

## Step 3: Run Database Migrations

After first deploy, open the Render dashboard → your web service → **Shell** tab, and run:
```
npx prisma migrate dev --name init
```
This creates all the database tables.

---

## Step 4: Set Up Linear

Linear is for tracking tasks — what needs to be decided, ordered, scheduled, or followed up on.

1. Go to https://linear.app and create a free account
2. Create a new **Team** called `Home Build`
3. Create these **Projects** inside that team:

| Project | Purpose |
|---------|---------|
| 🏗 Site & Foundation | Lot prep, excavation, footings, foundation |
| 🪵 Framing & Structure | Framing, roofing, windows, doors |
| ⚡ MEP (Mechanical/Electrical/Plumbing) | HVAC, electrical rough-in, plumbing rough-in |
| 🏠 Exterior | Siding, roofing, garage, driveway |
| 🛁 Interior Finishes | Drywall, flooring, cabinets, fixtures |
| 📋 Permits & Inspections | All permit applications and inspection scheduling |
| 💰 Budget & Loan | Budget decisions, draw requests, lender follow-ups |
| 👷 Contractors | Bids to get, contracts to sign, follow-ups |

4. For each Project, add **Issues** for things you need to action — e.g.:
   - "Get 3 bids for electrical work"
   - "Submit building permit application"
   - "Request Draw #2 from lender"
   - "Confirm framing inspection date"

Linear is for **action items**. The dashboard is for **tracking current state**.

---

## Running locally (for testing)

You need PostgreSQL installed locally. Then:
```bash
# Create a local database
createdb homebuild

# Update .env with your local connection
DATABASE_URL="postgresql://localhost/homebuild"

# Run migrations
npx prisma migrate dev --name init

# Start the app
npm run dev
```

Open http://localhost:3000

---

## Areas you might want to add later
- **Insurance** — builder's risk, homeowner's
- **Punch list** — final walkthrough items to fix before move-in
- **Warranty tracking** — appliances, roof, HVAC warranty dates
- **Change orders** — contractor scope changes and cost impacts
- **Photo log** — progress photos by phase
