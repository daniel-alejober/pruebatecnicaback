import Registro from "../models/Registro.js";

const traerRegistros = async (req, res) => {
  try {
    const registros = await Registro.find({ activo: true });
    res.status(200).json(registros);
  } catch (error) {
    res.status(500).json({
      message: "Ocurrió un error al traer los registros.",
      error: error.message,
    });
  }
};

const crearRegistro = async (req, res) => {
  try {
    const { email } = req.body;

    const registroExistente = await Registro.findOne({ email });
    if (registroExistente) {
      return res
        .status(400)
        .json({ errores: ["El correo ya está registrado."] });
    }

    const registro = await Registro.create(req.body);

    res.status(200).json({
      success: true,
      registro: {
        company: registro.company,
        contact: registro.contact,
        email: registro.email,
        tel: registro.tel,
      },
    });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      const mensajes = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ errores: mensajes });
    }
    return res
      .status(500)
      .json({ errores: ["Error del servidor: " + error.message] });
  }
};

const editarRegistro = async (req, res) => {
  try {
    const { id } = req.params;
    const registroActualizado = await Registro.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!registroActualizado) {
      return res.status(404).json({ errores: ["Registro no encontrado."] });
    }

    res.status(200).json({
      success: true,
      registro: {
        company: registroActualizado.company,
        contact: registroActualizado.contact,
        email: registroActualizado.email,
        tel: registroActualizado.tel,
      },
    });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      const mensajes = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ errores: mensajes });
    }
    return res
      .status(500)
      .json({ errores: ["Error del servidor: " + error.message] });
  }
};

const borrarRegistro = async (req, res) => {
  try {
    const { id } = req.params;
    const registroActualizado = await Registro.findByIdAndUpdate(
      id,
      { $set: { activo: false } },
      {
        new: true,
      }
    );

    if (!registroActualizado) {
      return res.status(404).json({ errores: ["Registro no encontrado."] });
    }

    res.status(200).json({ success: true, registro: registroActualizado });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ errores: ["Error del servidor: " + error.message] });
  }
};

export { traerRegistros, crearRegistro, editarRegistro, borrarRegistro };
