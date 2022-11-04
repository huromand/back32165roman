const express = require("express");
const ejs = require("ejs")
const app = express();

app.set("view engine", "ejs");

const Contenedor = require("./utils/contenedor");
const contenedor1 = new Contenedor("productos.json", "utf-8");

const PORT = 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("page/formulario")
});

// GET "/api/productos" -> devuelve todos los productos
app.get("/api/productos", (req, res) => {
    res.render("page/tabla", contenedor1.getAll() );
});

//POST "/api/productos" -> agrega un producto
 app.post("/api/productos", (req, res) => {
    contenedor1.save(req.body);
    res.render("page/tabla", contenedor1.getAll() );
 });

app.listen(PORT, () => {
   console.log(`Servidor escuchando en puerto ${PORT}`);
});