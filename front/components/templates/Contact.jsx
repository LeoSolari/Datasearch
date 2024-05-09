"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { styles } from "@/app/styles";
import { EarthCanvas } from "../canvas";
import { fadeIn, slideIn, zoomIn } from "@/utils/motion";
import { SectionWrapper } from "@/hoc";
import Button from "../UI/Button";

const Contact = () => {
  const formRef = useRef();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    emailjs
      .send(
        "service_sc8l1oj",
        "template_fpekyto",
        {
          from_name: form.name,
          to_name: "DataBats",
          from_email: form.email,
          to_email: "leosolari9@gmail.com",
          message: form.message,
        },
        "SEmMOlnRNX1UZjFRR"
      )
      .then(
        (res) => {
          setLoading(false);
          alert("Gracias, te responderemos a la brevedad.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);

          console.log(error);

          alert("Algo salio mal, prueba mas tarde!");
        }
      );
  };

  // template : template_fpekyto
  // service : service_sc8l1oj
  // public key: SEmMOlnRNX1UZjFRR

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={fadeIn("left", "tween", 0.4, 1)}
        className="flex-[0.75] bg-blue-900 p-8 rounded-2xl text-white"
      >
        <p className={styles.sectionSubText}>Envianos un mensaje</p>
        <h1 className={styles.sectionHeadText}>Contactanos.</h1>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Como es tu nombre"
              className="mt-4 py-4 px-6 bg-black rounded-lg outline-none border-none"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Como es tu Mail"
              className="mt-4 py-4 px-6 bg-black rounded-lg outline-none border-none"
            />
            <textarea
              rows={6}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Que queres decir?"
              className="mt-4 py-4 px-6 bg-black rounded-lg outline-none border-none"
            />
          </label>
          <Button type="submit">{loading ? "Enviando. . ." : "Enviar"}</Button>
        </form>
      </motion.div>
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px] "
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact);
