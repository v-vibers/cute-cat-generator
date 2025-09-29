# 🐱 Cute Cat Generator - Quick Start Guide

## Get Running in 60 Seconds

### Step 1: Install Dependencies
```bash
bun install
```

### Step 2: Start Development Server
```bash
bun run dev
```

### Step 3: Open in Browser
Open the URL shown in your terminal (usually `http://localhost:5173`)

That's it! The app runs in **demo mode** by default (no configuration needed).

---

## First Time Using the App?

1. **Click "Sign In"** - Uses Subscribe.dev authentication
2. **Pick a theme** - Click any emoji button (🍫 Chocolate, 🍓 Strawberry, etc.)
3. **Watch it generate** - Takes ~5-10 seconds to create your cat
4. **Download & enjoy!** - Click the download button to save your cat

---

## Want to Use Production Mode?

1. Get your token from https://platform.subscribe.dev
2. Add to `.env`:
   ```
   VITE_SUBSCRIBE_DEV_PROJECT_TOKEN=pub_your_token_here
   ```
3. Restart the dev server

---

## Common Commands

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Run linter
bun run lint
```

---

## Troubleshooting

**Can't install dependencies?**
- Make sure Bun is installed: `curl -fsSL https://bun.sh/install | bash`

**React version errors?**
- Should be fixed automatically (React 18.2.0 in package.json)
- If issues persist: `rm -rf node_modules bun.lockb && bun install`

**Sign-in not working?**
- Demo mode should work out-of-the-box
- Check browser console for errors
- Ensure you're not blocking third-party cookies

**Generation failing?**
- Demo mode has limited credits
- Add a production token for unlimited usage
- Check your internet connection

---

## Features at a Glance

✨ **12 Predefined Themes**: Quick-start themes with emojis
🎨 **Custom Themes**: Enter anything (Cotton Candy, Space, etc.)
💾 **History**: Last 12 generations saved to cloud
📱 **Responsive**: Works on mobile, tablet, desktop
⚡ **Fast**: ~5-10 second generation time
🎁 **Free**: Demo mode included, no credit card needed

---

## Need Help?

- **Full Documentation**: See `IMPLEMENTATION_SUMMARY.md`
- **Subscribe.dev Docs**: https://docs.subscribe.dev
- **Project Guidelines**: See `CLAUDE.md`

---

**Enjoy generating cute themed cats! 🐱✨**