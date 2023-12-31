const express = require("express");
const path = require("path");

const taskRouter = require("./src/routes/tasks");
const checklistRouter = require("./src/routes/checklist");

const rootRouter = require("./src/routes/Index");
const methodOverride = require("method-override");

require("./config/database");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

// Codigo atualizado para compatibilidade
// app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "src/views/"));
app.set("view engine", "ejs");

app.use("/", rootRouter);
app.use("/checklists", checklistRouter);
app.use("/checklists", taskRouter.checklistDependent);
app.use("tasks", taskRouter.simple);

app.listen(3000, () => {
  console.log("Servidor iniciado");
});
