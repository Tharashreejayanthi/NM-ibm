Here is the updated `README.md` file tailored specifically for your **Music Playlist Application**.

You can copy this code, replace the content in your current `README.md` file, save it, and then I will show you how to push the changes.

### **1. Copy this Code for `README.md**`

```markdown
# 🎵 Music Playlist Management API

![Node.js](https://img.shields.io/badge/Node.js-green) ![Express.js](https://img.shields.io/badge/Express.js-black) ![Status](https://img.shields.io/badge/Status-Active-brightgreen)

A simple **CRUD API** for managing a music playlist, built with **Node.js**, **Express**, and **JSON file storage**.

This project allows you to:

* **Create**: Add new songs to the playlist.
* **Read**: Retrieve the full playlist or find a specific song by ID.
* **Update**: Update song details (PUT).
* **Delete**: Remove a song from the playlist.

---

## 🗂 Folder Structure

```text
Music Playlist App/
│── app.js                # Entry point
│── package.json          # Dependencies
│── node_modules/
│
├── Controllers/
│   └── musicController.js # Logic for handling requests
│
├── Routes/
│   └── musicRoutes.js     # API Route definitions
│
├── data/
│   └── songs.json         # JSON Database
│
└── screenshots/          # Images for documentation
    ├── get-request.png
    ├── post-request.png
    ├── put-request.png
    └── delete-request.png

```

---

## 🚀 Getting Started

1. Install dependencies:

```bash
npm init -y
npm install express
```

2. Run the API:

```bash
node app.js
```

The API will run on `http://localhost:3000`.

---
## 📌 API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| **GET** | `/songs` | Get all songs |
| **GET** | `/songs/:id` | Get song by ID |
| **POST** | `/songs` | Add a new song |
| **PUT** | `/songs/:id` | Update song details |
| **DELETE** | `/songs/:id` | Delete a song |

---

# 🖼 Screenshots

Here are the results from testing the API in Postman:
### GET Request Result
![GET Request](screenshots/get-request.png)
### PUT Request Result
![PUT Request](screenshots/put-request.png)
### POST Request Result
![POST Request](screenshots/post-request.png)
### DELETE Request Result
![DELETE Request](screenshots/delete-request.png)

---