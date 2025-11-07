import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const registrarUsuario = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validaciones básicas
        if (!name || !email || !password) {
            return res.status(400).json({ msg: "Todos los campos son obligatorios" });
        }

        // Verificar si el usuario ya existe
        const existe = await User.findOne({ email });
        if (existe) {
            return res.status(400).json({ msg: "El correo ya está registrado" });
        }

        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        // Crear usuario
        const nuevoUsuario = new User({ name, email, password: hash });
        await nuevoUsuario.save();

        res.status(201).json({
            msg: "Usuario registrado exitosamente",
            usuario: { id: nuevoUsuario._id, name, email }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error del servidor" });
    }
};
