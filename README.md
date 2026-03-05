# ⚡️ DeyLight

Because "Is there light in your area?" is the most asked question in Nigeria. DeyLight is a high-performance, Svelte 5-powered, real-time status tracker for the Nigerian power grid. It turns the frustration of "Low Current" and "No Light" into beautiful, actionable data.

## 🛠 The Stack (The "Holy Trinity")

**Svelte 5**: For that buttery-smooth "Up Nepa" UI feedback.

**Supabase**: The backend that doesn't sleep (even when the grid does).

**Iconify and UnoCss**: For beautiful and fast loading icons.

## 🏗 Database Sorcery

We don't just update rows; we protect them. The database is hardened with PostgreSQL Triggers that:

Auto-Timestamp: last_updated is handled by the DB. We don't trust the client's clock.

Ironclad RLS: Only the status can be changed. You can't rename "Opebi 11kV" to "Elon Musk's Backyard" even if you tried.

## 🔦 Features

**Smart Search**: Use power-user prefixes like disco:eko or unit:oshodi to filter through the noise.

**Optimistic UI**: The buttons react instantly. We show the "Available" green before the packet even leaves your phone.

**Static Power**: Designed to be hosted on GitHub Pages. No server. No overhead. Just vibes and APIs.

## 🚀 Installation for Devs

If you want to run this locally and you actually have light:
```bash
# Clone the madness:
git clone https://github.com/donny-c-1/deylight.git

# Install dependencies:
npm install
```
**Environment Variables:**

Create a .env file and plug in your Supabase credentials:

```env
PUBLIC_SUPABASE_URL=your_url_here
PUBLIC_SUPABASE_ANON_KEY=your_key_here
```
Ignite:

```bash
npm run dev
```


## 📜 The "Up Nepa" Protocol (Contributing)

No Tailwind: If you bring utility classes in here, the transformer will blow.

Respect the Band: Band A users and Band E users are equal in the eyes of the neighbourhoods table.

⚖️ License
MIT. Use it, change it, just don't use it to hike the electricity tariffs.

"The grid may be unstable, but our UI is solid." — The DeyLight **Team**