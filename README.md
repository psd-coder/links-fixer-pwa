# Link Fixer

PWA that fixes broken URLs copied from mobile terminals. Terminals often insert invisible characters (null bytes, zero-width spaces) at line-wrap points when copying long URLs, making them unusable. This app strips those characters, joins wrapped lines, copies the fixed URL to clipboard, and opens it in a new tab.

## Usage

Paste a broken link into the textarea. The app will automatically fix it, copy to clipboard, and open in a new tab.

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

Output goes to `dist/`. Deployed to GitHub Pages on push to `main`.
