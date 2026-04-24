import React, { useEffect, useState } from "react";
import instance from "../../instances/instances";
import { toast } from "react-toastify";
import logo1 from "../../assets/logos/bbc.png";
import logo2 from "../../assets/logos/theHindu.png";
import logo6 from "../../assets/logos/TechCrunch.jpg";
import logo3 from "../../assets/logos/ndtv.jpg";
import logo5 from "../../assets/logos/Forbes.jpg";
import logo4 from "../../assets/logos/CNBC.jpg";
import logo7 from "../../assets/logos/apple.jpg";
import { useRef } from "react";
import { FolderIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";

const News = () => {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    link: "",
    image: null,
    desc1: "",
    desc2: "",
    desc3: "",
    desc4: "",
    desc5: "",
    desc6: "",
    desc7: "",
  });

  const [newsList, setNewsList] = useState([]);
  const [editId, setEditId] = useState(null);
  const fileRef = useRef();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await instance.get("/admin/news", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // if backend returns array
      if (Array.isArray(res.data)) {
        setNewsList(res.data);
      }

      // if backend returns object
      else if (res.data && Array.isArray(res.data.data)) {
        setNewsList(res.data.data);
      } else {
        setNewsList([]);
      }
    } catch (error) {
      console.log("Fetch News Error:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

     const requiredFields = [
    "title",
    "description",
    "category",
    "link",
    "desc1",
    "desc2",
    "desc3",
    "desc4",
    "desc5",
    "desc6",
    "desc7",
  ];

  for (let field of requiredFields) {
    if (!form[field] || form[field].toString().trim() === "") {
      toast.error(`${field} field is required`);
      return;
    }
  }

  if (!form.image && !editId) {
    toast.error("Image field is required");
    return;
  }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("link", form.link);

    formData.append("desc1", form.desc1 || "");
    formData.append("desc2", form.desc2 || "");
    formData.append("desc3", form.desc3 || "");
    formData.append("desc4", form.desc4 || "");
    formData.append("desc5", form.desc5 || "");
    formData.append("desc6", form.desc6 || "");
    formData.append("desc7", form.desc7 || "");

    if (form.image) {
      formData.append("image", form.image);
    }

    for (let pair of formData.entries()) {
      console.log("FORMDATA:", pair[0], pair[1]);
    }

    try {
      if (editId) {
        await instance.put(`/admin/news/${editId}`, formData, config);
        toast.success("Updated Successfully");
        setEditId(null);
      } else {
        await instance.post("/admin/news", formData, config);
        toast.success("News Published");
      }

      //RESET FORM PROPERLY
      setForm({
        title: "",
        description: "",
        category: "",
        link: "",
        image: null,

        desc1: "",
        desc2: "",
        desc3: "",
        desc4: "",
        desc5: "",
        desc6: "",
        desc7: "",
      });

      fetchNews();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed");
    }
  };
  const handleDelete = async (id) => {
    await instance.delete(`/admin/news/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setNewsList((prev) => prev.filter((item) => item._id !== id));

    toast.success("Deleted");
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title || "",
      description: item.description || "",
      category: item.category || "",
      link: item.link || "",
      image: null,

      desc1: item.desc1 || "",
      desc2: item.desc2 || "",
      desc3: item.desc3 || "",
      desc4: item.desc4 || "",
      desc5: item.desc5 || "",
      desc6: item.desc6 || "",
      desc7: item.desc7 || "",
    });

    setEditId(item._id);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-5">
          {editId ? "Edit News" : "Publish News"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
          <div className="border p-4 rounded-xl flex items-center justify-between bg-gray-50">
            <div className="flex items-center gap-3 text-gray-700">
              <FolderIcon className="w-6 h-6 text-blue-500" />

              <span className="text-sm">
                {form.image ? form.image.name : "No file selected"}
              </span>
            </div>

            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <ArrowUpTrayIcon className="w-5 h-5" />
              Upload
            </button>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
              onChange={(e) =>
                setForm({
                  ...form,
                  image: e.target.files[0],
                })
              }
            />
          </div>

          {/* COVERAGE SECTION */}
          <h3 className="text-xl font-bold mt-6">Other Sources Coverage</h3>

          {/* BBC */}
          <div className="flex items-center gap-3 border p-3 rounded-xl">
            <img src={logo1} className="h-8" />
            <span className="font-semibold">BBC</span>
          </div>
          <textarea
            rows="3"
            placeholder="BBC Description"
            className="w-full border p-3 rounded-xl"
            value={form.desc1}
            onChange={(e) => setForm({ ...form, desc1: e.target.value })}
          />
          {/* The Hindu */}
          <div className="flex items-center gap-3 border p-3 rounded-xl">
            <img src={logo2} className="h-8" />
            <span className="font-semibold">The Hindu</span>
          </div>

          <textarea
            rows="3"
            placeholder="The Hindu Description"
            className="w-full border p-3 rounded-xl"
            value={form.desc2}
            onChange={(e) => setForm({ ...form, desc2: e.target.value })}
          />

          {/* NDTV */}
          <div className="flex items-center gap-3 border p-3 rounded-xl">
            <img src={logo3} className="h-8" />
            <span className="font-semibold">NDTV</span>
          </div>

          <textarea
            rows="3"
            placeholder="NDTV Description"
            className="w-full border p-3 rounded-xl"
            value={form.desc3}
            onChange={(e) => setForm({ ...form, desc3: e.target.value })}
          />
          {/* CNBC */}
          <div className="flex items-center gap-3 border p-3 rounded-xl">
            <img src={logo4} className="h-8" />
            <span className="font-semibold">CNBC</span>
          </div>

          <textarea
            rows="3"
            placeholder="CNBC Description"
            className="w-full border p-3 rounded-xl"
            value={form.desc4}
            onChange={(e) => setForm({ ...form, desc4: e.target.value })}
          />

          {/* Forbes */}
          <div className="flex items-center gap-3 border p-3 rounded-xl">
            <img src={logo5} className="h-8" />
            <span className="font-semibold">Forbes</span>
          </div>

          <textarea
            rows="3"
            placeholder="Forbes Description"
            className="w-full border p-3 rounded-xl"
            value={form.desc5}
            onChange={(e) => setForm({ ...form, desc5: e.target.value })}
          />

          {/* TechCrunch */}
          <div className="flex items-center gap-3 border p-3 rounded-xl">
            <img src={logo6} className="h-8" />
            <span className="font-semibold">Tech Crunch</span>
          </div>

          <textarea
            rows="3"
            placeholder="TechCrunch Description"
            className="w-full border p-3 rounded-xl"
            value={form.desc6}
            onChange={(e) => setForm({ ...form, desc6: e.target.value })}
          />

          {/* Apple */}
          <div className="flex items-center gap-3 border p-3 rounded-xl">
            <img src={logo7} className="h-8" />
            <span className="font-semibold">Apple</span>
          </div>

          <textarea
            rows="3"
            placeholder="Apple Description"
            className="w-full border p-3 rounded-xl"
            value={form.desc7}
            onChange={(e) => setForm({ ...form, desc7: e.target.value })}
          />

          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl">
            {editId ? "Update" : "Publish"}
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">News List</h2>

        {newsList.map((item) => {
          return (
            <div
              key={item._id}
              className="border p-4 rounded-xl mb-3 flex justify-between"
            >
              <div>
                <h3 className="font-bold">{item.title}</h3>
                <p>{item.description}</p>
                <span className="text-blue-600 text-sm">{item.category}</span>
              </div>

              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default News;
