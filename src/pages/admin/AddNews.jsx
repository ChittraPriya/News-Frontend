import React, { useEffect, useState } from "react";
import instance from "../../instances/instances";
import { toast } from "react-toastify";

const News = () => {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    link: "",
  });

  const [newsList, setNewsList] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
  try {
    const res = await instance.get(
      "/admin/news",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(
      "News Response:",
      res.data
    );

    // if backend returns array
    if (Array.isArray(res.data)) {
      setNewsList(res.data);
    }

    // if backend returns object
    else if (
      res.data &&
      Array.isArray(res.data.data)
    ) {
      setNewsList(
        res.data.data
      );
    }

    else {
      setNewsList([]);
    }

  } catch (error) {
    console.log(
      "Fetch News Error:",
      error
    );
  }
};
const handleSubmit = async (e) => {
  e.preventDefault();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {

    // UPDATE NEWS
    if (editId) {
      const res = await instance.put(
        `/admin/news/${editId}`,
        form,
        config
      );

      const updated =
        res.data.data ||
        res.data;

      setNewsList((prev) =>
        prev.map((item) =>
          item._id === editId
            ? updated
            : item
        )
      );

      toast.success(
        "Updated Successfully"
      );

      setEditId(null);
    }

    // CREATE NEWS
    else {
      const res = await instance.post(
        "/admin/news",
        form,
        config
      );

      const created =
        res.data.data ||
        res.data.news ||
        res.data;

      setNewsList((prev) => [
        created,
        ...prev,
      ]);

      toast.success(
        "News Published"
      );
    }

    // clear form
    setForm({
      title: "",
      description: "",
      category: "",
      link: "",
    });

  } catch (error) {
    toast.error("Failed");
  }
};
  const handleDelete = async (id) => {
   await instance.delete(`/admin/news/${id}`, {
  headers: { Authorization: `Bearer ${token}` },
});

    setNewsList((prev) =>
      prev.filter((item) => item._id !== id)
    );

    toast.success("Deleted");
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item._id);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-5">
          {editId ? "Edit News" : "Publish News"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Title"
            className="w-full border p-3 rounded-xl"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
          />

          <textarea
            rows="4"
            placeholder="Description"
            className="w-full border p-3 rounded-xl"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Category"
            className="w-full border p-3 rounded-xl"
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="News Link"
            className="w-full border p-3 rounded-xl"
            value={form.link}
            onChange={(e) =>
              setForm({
                ...form,
                link: e.target.value,
              })
            }
          />

          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl">
            {editId ? "Update" : "Publish"}
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">
          News List
        </h2>

        {newsList.map((item) => (
          <div
            key={item._id}
            className="border p-4 rounded-xl mb-3 flex justify-between"
          >
            <div>
              <h3 className="font-bold">{item.title}</h3>
              <p>{item.description}</p>
              <span className="text-blue-600 text-sm">
                {item.category}
              </span>
            </div>

            <div className="space-x-2">
              <button
                onClick={() => handleEdit(item)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  handleDelete(item._id)
                }
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;