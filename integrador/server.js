const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(MONGODB_URI)
// Definir el esquema y modelo de tarea en mongoose
const taskSchema = new mongoose.Schema({
  id: Number,
  name: String,
  completed: Boolean,
});

const Task = mongoose.model('Task', taskSchema);

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());

// Rutas
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/tasks', async (req, res) => {
  const { name, completed } = req.body;

  try {
    const task = new Task({ name, completed });
    const savedTask = await task.save();
    res.json(savedTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/tasks/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const { name, completed } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, { name, completed }, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/tasks/:taskId', async (req, res) => {
  const { taskId } = req.params;

  try {
    await Task.findByIdAndDelete(taskId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Manejo de errores para rutas no definidas
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
