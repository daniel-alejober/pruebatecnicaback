import mongoose from "mongoose";

const RegistroSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "El nombre de la compañía es requerido."],
    },
    contact: {
      type: String,
      required: [true, "El nombre del contacto es requerido."],
      validate: {
        validator: function (value) {
          return /^[a-zA-ZÀ-ÿ\s]+$/.test(value);
        },
        message: (props) =>
          `${props.value} no es un nombre valido.El nombre del contacto solo puede contener letras.`,
      },
    },
    email: {
      type: String,
      required: [true, "El email es requerido."],
      unique: true,
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        },
        message: (props) => `${props.value} no es un correo valido.`,
      },
    },
    tel: {
      type: Number,
      required: [true, "El teléfono es requerido."],
      validate: {
        validator: function (value) {
          return /^\d{10}$/.test(value);
        },
        message: (props) => `${props.value} no es un telefono valido.`,
      },
    },
    activo: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Registro = mongoose.model("registro", RegistroSchema);

export default Registro;
