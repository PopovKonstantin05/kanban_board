import "./styles.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  useNavigate,
} from "react-router-dom";

const columns = [
  { name: "Бэклог", key: "backlog" },
  { name: "Готово", key: "ready" },
  { name: "В процессе", key: "inProgress" },
  { name: "Завершено", key: "done" },
];

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<KanbanBoard />} />
        <Route path="/task/:taskId" element={<TaskModal />} />
      </Routes>
    </Router>
  );
}

/*function Modal({ onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg">
        {children}
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white p-2 rounded"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}

function TaskModal() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("kanbanTasks"));
    if (savedTasks) {
      for (const column of Object.values(savedTasks)) {
        const foundTask = column.find((t) => t.id === taskId);
        if (foundTask) {
          setTask(foundTask);
          setDescription(foundTask.description || "");
          break;
        }
      }
    }
  }, [taskId]);

  const saveDescription = () => {
    const savedTasks = JSON.parse(localStorage.getItem("kanbanTasks"));
    if (savedTasks) {
      const updatedTasks = {};
      for (const [columnKey, tasks] of Object.entries(savedTasks)) {
        updatedTasks[columnKey] = tasks.map((t) =>
          t.id === taskId ? { ...t, description } : t
        );
      }
      localStorage.setItem("kanbanTasks", JSON.stringify(updatedTasks));
    }
  };

  const closeModal = () => {
    saveDescription();
    navigate(`/`);
  };

  if (!task) return null;

  return (
    <Modal onClose={closeModal}>
      <h2 className="text-xl font-bold mb-4">Задача: {task.text}</h2>
      <div className="mb-4">
        <label className="block mb-2">Описание задачи:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full h-40 p-2 border rounded"
          placeholder="Введите описание задачи..."
        />
      </div>
    </Modal>
  );
}*/

function KanbanBoard() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("kanbanTasks");
    return savedTasks
      ? JSON.parse(savedTasks)
      : {
          backlog: [],
          ready: [],
          inProgress: [],
          done: [],
        };
  });
  const [newTask, setNewTask] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedTasks = localStorage.getItem("kanbanTasks");
    console.log("Loaded tasks:", savedTasks);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    console.log("Saving tasks:", tasks);
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      const taskId = Date.now().toString();
      setTasks((prev) => ({
        ...prev,
        backlog: [...prev.backlog, { id: taskId, text: newTask.trim() }],
      }));
      setNewTask("");
    }
  };

  const moveTask = (taskId, from, to) => {
    if (taskId) {
      setTasks((prev) => {
        const task = prev[from].find((t) => t.id === taskId);
        return {
          ...prev,
          [from]: prev[from].filter((t) => t.id !== taskId),
          [to]: [...prev[to], task],
        };
      });
    }
  };

  const openTaskModal = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  return (
    <div className="flex gap-4 p-4">
      {columns.map((column, index) => (
        <div key={column.key} className="w-64 border p-4 rounded">
          <div className="font-bold">{column.name}</div>
          <div className="mt-2">
            {column.key === "backlog" ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Новая задача"
                  className="border p-2 w-full rounded"
                />
                <button
                  onClick={addTask}
                  class="text-2xl w-full bg-blue-500 text-white p-2 rounded"
                  disabled={newTask.length === 0}
                >
                  {newTask.length === 0 ? "Add card" : "Submit"}
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <select
                  onChange={(e) =>
                    moveTask(e.target.value, columns[index - 1].key, column.key)
                  }
                  className="w-full p-2 border rounded"
                  value=""
                >
                  <option value="">Выберите задачу</option>
                  {tasks[columns[index - 1].key].map((task) => (
                    <option key={task.id} value={task.id}>
                      {task.text}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <ul className="mt-4 space-y-2">
              {tasks[column.key].map((task) => (
                <li
                  key={task.id}
                  className="bg-gray-100 p-2 rounded cursor-pointer hover:bg-gray-200"
                  onClick={() => openTaskModal(task.id)}
                >
                  {task.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
