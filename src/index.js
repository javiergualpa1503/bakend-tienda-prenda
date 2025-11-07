import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

const allowedOrigins = [
    "http://localhost:5173", // local
    "https://tu-frontend.vercel.app" // tu dominio real en producción
];

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
}));

// Middlewares
app.use(express.json());

// Conexión a DB
connectDB();

// Rutas
app.use("/api/usuarios", userRoutes);

// Ruta base
app.get("/", (req, res) => res.send("API de usuarios funcionando ✅"));

// Puerto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
