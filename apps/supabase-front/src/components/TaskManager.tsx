import { useEffect, useState, type ChangeEvent } from "react";
import "./TaskManager.css";
import type { Task } from "../types";
import * as Crud from "../superbase-client";

export default function TaskManager({ session }: { session: any }) {
  /**
   *  --------------------- states ---------------------
   */
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>(null);
  const [uploadedFile, setUploadedFiled] = useState<File | null>(null);
  const [editedTask, setEditedTask] = useState<{ title: string; id: number }>(
    null,
  );
  const [open, setOpen] = useState(false);

  /**
   *  --------------------- handlers ---------------------
   */
  const handleFetchTasks = async () => {
    const { data: tasks } = await Crud.getTask();

    return setTasks(tasks);
  };
  const handleImageUrl = async (file: File): Promise<string | null> => {
    const path = `${file.name}-${Date.now()}`;
    const { error } = await Crud.supabase.storage
      .from("task-images")
      .upload(path, file);
    if (error) {
      alert(" there is one probleme in during the uploading the file");
    }
    const imageUrl = await Crud.supabase.storage
      .from("task-images")
      .getPublicUrl(path);

    return imageUrl.data.publicUrl;
  };
  const handleInsertTask = async (e: React.FormEvent) => {
    e.preventDefault();
    // first we need to grab the image_url
    const imageUrl = await handleImageUrl(uploadedFile);
    if (!title.trim()) return;
    const taskStatus = await Crud.insertTask(
      title,
      session?.user?.email,
      imageUrl,
    );
    if (taskStatus.success) {
      await handleFetchTasks();
      setTitle(null);
    } else {
      setTitle(null);
    }
  };

  const handleEditTask = async (task: Task) => {
    const updateStatus = await Crud.updateTask(task.id, task.title);
    if (updateStatus.success) {
      (setOpen(false), setEditedTask(null));
      await handleFetchTasks();
    } else {
      alert("try again");
    }
  };

  const handleDeleteTask = async (id: number) => {
    const updateStatus = await Crud.deleteTask(id);
    if (updateStatus.success) {
      await handleFetchTasks();
    } else {
      alert("try again");
    }
  };
  const handleUploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    // first check if we have file
    if (event.target.files && event.target.files.length > 0) {
      setUploadedFiled(event.target.files[0]);
    }
  };

  /**
   *  --------------------- Side - Effects ---------------------
   */

  useEffect(() => {
    handleFetchTasks();
  }, []);
  useEffect(() => {
    const channnel = Crud.supabase.channel("");
  }, []);

  return (
    <div className="task-container">
      <h2>Task Manager</h2>

      <form onSubmit={handleInsertTask} className="task-form">
        <input
          type="text"
          value={title}
          placeholder="Enter task title..."
          onChange={(e) => setTitle(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={handleUploadFile} />

        {title && <button type="submit">Create Task</button>}
      </form>

      <ul className="task-list">
        {tasks.map((task) => (
          <>
            {task?.id !== editedTask?.id && (
              <li key={task.id} className="task-item">
                <span>{task.title}</span>
                <img src={task?.image_url} width={75} height={100} />

                {
                  <div className="task-actions">
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() => {
                        setOpen(true);
                        setEditedTask((prev) => ({ ...prev, id: task?.id }));
                      }}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                }
              </li>
            )}{" "}
            {open && task?.id == editedTask?.id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditTask({ ...task, title: editedTask.title });
                }}
                className="task-form"
              >
                <input
                  type="text"
                  value={editedTask?.title}
                  placeholder="Enter task title..."
                  onChange={(e) =>
                    setEditedTask({ id: task.id, title: e.target.value })
                  }
                />

                <button disabled={!editedTask} type="submit">
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    (setOpen(false), setEditedTask(null));
                  }}
                >
                  Cancel
                </button>
              </form>
            ) : null}
            ,
          </>
        ))}
      </ul>
    </div>
  );
}
