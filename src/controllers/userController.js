import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const registrarUsuario = async (req, res) => {
    try {
        const { nombre, correo, contraseña } = req.body;

        // Validaciones básicas
        if (!nombre || !correo || !contraseña) {
            return res.status(400).json({ msg: "Todos los campos son obligatorios" });
        }

        // Verificar si el usuario ya existe
        const existe = await User.findOne({ correo });
        if (existe) {
            return res.status(400).json({ msg: "El correo ya está registrado" });
        }

        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(contraseña, salt);

        // Crear usuario
        const nuevoUsuario = new User({ nombre, correo, contraseña: hash });
        await nuevoUsuario.save();

        res.status(201).json({
            msg: "Usuario registrado exitosamente",
            usuario: { id: nuevoUsuario._id, nombre, correo }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error del servidor" });
    }
};
