# 🎬 Video Streaming Platform

A small full-stack video library where you can upload, watch, favorite and
trash videos. Built with **Vue 3 + Vite** on the front end and **Express +
SQLite** on the back end.

Uploaded videos are stored on disk, their metadata (name, duration) is kept in
a SQLite database, and a thumbnail is generated automatically for each one.

---

## ✨ Features

- **Browse & play** – every video streams directly in the browser with native
  playback controls.
- **Auto thumbnails** – a preview image is generated from each video on upload
  (via a bundled `ffmpeg`), shown as the video poster.
- **Favorites** – mark videos with the ♥ button; they appear under the
  *Favorites* tab.
- **Trash (soft delete)** – move videos to the bin, then **restore** them or
  **delete them permanently** (which also removes the file and thumbnail from
  disk).
- **Duration & name** shown on every card, plus friendly empty states.
- **Upload** – add new `.mp4` / `.mov` files straight from the UI.

---

## 🧱 Tech stack

| Layer      | Tools |
|------------|-------|
| Front end  | Vue 3, Vite, TypeScript, Pinia, Vue Router, Tailwind CSS |
| Back end   | Node.js, Express 5, Multer, better-sqlite3 |
| Media      | ffmpeg-static (thumbnails), get-video-duration |
| Database   | SQLite (`db.sqlite`) |

---

## 📁 Project structure

```
Video-streaming-platform/
├── server.js          # Express API (upload, list, favorite, trash, thumbnails)
├── database.js        # SQLite access layer (better-sqlite3)
├── db.sqlite          # SQLite database file
├── Videos/            # Uploaded video files (+ sample clips)
├── thumbnails/        # Auto-generated .jpg thumbnails
└── frontend/          # Vue 3 client
    └── src/
        ├── views/       # Home, Favorites, Trash
        ├── components/  # VideoCard + icons
        ├── stores/      # Pinia store
        └── services/    # API calls
```

---

## 🚀 Getting started

You need **Node.js 20.19+** (or 22.12+).

### 1. Back end (API + video server)

```bash
# from the project root
npm install
npm install ffmpeg-static   # enables automatic thumbnails (optional but recommended)
node server.js
```

The API runs on **http://localhost:3000**.

### 2. Front end (Vue app)

```bash
cd frontend
npm install
npm run dev
```

The app runs on **http://localhost:5173** and talks to the API on port 3000.

Open the app in your browser and you'll see the bundled sample videos.

---

## 🔌 API reference

| Method   | Endpoint            | Description                              |
|----------|---------------------|------------------------------------------|
| `POST`   | `/uploadVideo`      | Upload a video (multipart, field `videofile`) |
| `GET`    | `/filelist`         | All videos (not trashed)                 |
| `GET`    | `/favfilelist`      | Favorited videos                         |
| `GET`    | `/binfilelist`      | Videos in the trash                      |
| `POST`   | `/favorite/:id`     | Toggle favorite on/off                   |
| `POST`   | `/trash/:id`        | Move a video to the trash                |
| `POST`   | `/restore/:id`      | Restore a video from the trash           |
| `DELETE` | `/permanent/:id`    | Permanently delete (row + file + thumb)  |
| `GET`    | `/videos/:name`     | Stream a video file                      |
| `GET`    | `/thumbnails/:name` | Serve a thumbnail image                  |

---

## 🗄️ Database schema

`videofile`

| column   | type    | notes                          |
|----------|---------|--------------------------------|
| id       | INTEGER | primary key                    |
| filename | TEXT    | unique                         |
| duration | TEXT    | length in seconds              |
| is_fav   | INTEGER | 1 = favorited                  |
| is_del   | INTEGER | 1 = in the trash (soft delete) |

---

## 📝 Notes

- `node_modules/` is intentionally **not** committed (see `.gitignore`); run
  `npm install` in both the root and `frontend/` after cloning.
- Thumbnails are generated with the `ffmpeg-static` binary, so no system-wide
  ffmpeg install is required. If the package is missing, the server still runs —
  thumbnails are just skipped.
- A few sample clips ship with the repo so the app isn't empty on first run.
