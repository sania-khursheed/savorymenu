import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, "db.json");

// Initialize DB if not exists
async function initDB() {
  try {
    await fs.access(DB_PATH);
  } catch {
    const initialData = {
      menu: [
        {
          id: "1",
          name: "Signature Burger",
          price: 15.99,
          category: "Entree",
          image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600",
          description: "Juicy beef patty with secret sauce, cheddar cheese, and fresh greens."
        },
        {
          id: "2",
          name: "Truffle Fries",
          price: 8.50,
          category: "Sides",
          image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=600",
          description: "Golden fries drizzled with truffle oil and sprinkled with parmesan."
        }
      ],
      users: [
        {
          id: "admin-1",
          name: "Admin User",
          email: "admin@example.com",
          password: "password123"
        }
      ]
    };
    await fs.writeFile(DB_PATH, JSON.stringify(initialData, null, 2));
  }
}

async function getDB() {
  const data = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(data);
}

async function saveDB(data: any) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

async function startServer() {
  await initDB();
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/menu", async (req, res) => {
    const db = await getDB();
    res.json(db.menu);
  });

  app.post("/api/menu", async (req, res) => {
    const db = await getDB();
    const newItem = { ...req.body, id: Date.now().toString() };
    db.menu.push(newItem);
    await saveDB(db);
    res.status(201).json(newItem);
  });

  app.put("/api/menu/:id", async (req, res) => {
    const db = await getDB();
    const index = db.menu.findIndex((m: any) => m.id === req.params.id);
    if (index === -1) return res.status(404).send("Not found");
    db.menu[index] = { ...db.menu[index], ...req.body };
    await saveDB(db);
    res.json(db.menu[index]);
  });

  app.delete("/api/menu/:id", async (req, res) => {
    const db = await getDB();
    db.menu = db.menu.filter((m: any) => m.id !== req.params.id);
    await saveDB(db);
    res.status(204).send();
  });

  // Simple Auth Routes
  app.post("/api/auth/signup", async (req, res) => {
    const { email, password, name } = req.body;
    const db = await getDB();
    if (db.users.find((u: any) => u.email === email)) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = { id: Date.now().toString(), email, password, name };
    db.users.push(newUser);
    await saveDB(db);
    res.status(201).json({ id: newUser.id, email: newUser.email, name: newUser.name });
  });

  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const db = await getDB();
    const user = db.users.find((u: any) => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json({ id: user.id, email: user.email, name: user.name });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
