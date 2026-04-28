import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import instance from "../instances/instances";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Preferences = () => {
  const [selected, setSelected] = useState([]);
  const [frequency, setFrequency] = useState(null);
  const [time, setTime] = useState(null);
  const [hasPreference, setHasPreference] = useState(false);
  const navigate = useNavigate();

  const categories = [
    "technology",
    "sports",
    "business",
    "health",
    "science",
    "entertainment",
    "politics",
    "world",
  ];

  useEffect(() => {
    fetchPreference();
  }, []);

  // FETCH PREFERENCE
  const fetchPreference = async () => {
  try {
    const response = await instance.get("/preferences");

    const data = response.data.preference;

    console.log("Fetched preference:", data);

    if (data) {
      setSelected(data.categories ?? []);
      setFrequency(data.frequency ?? null);
      setTime(data.time);
      setHasPreference(true);
    } else {
      setHasPreference(false);
    }
  } catch (error) {
    setHasPreference(false);
  }
};

  // TOGGLE CATEGORY
  const toggleCategory = (item) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((cat) => cat !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  // SAVE / UPDATE
  const handleSave = async () => {
    try {
      if (selected.length === 0) {
        toast.error("Select at least one category");
        return;
      }

      const data = {
        categories: selected,
        frequency,
        time,
      };

      if (hasPreference) {
        await instance.put("/preferences", data);
        toast.success("Preferences Updated");
      } else {
        await instance.post("/preferences/add", data);
        toast.success("Preferences Saved");
      }

      await fetchPreference();

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to Save Preferences"
      );
    }
  };

  // DELETE CATEGORY
  const handleDeleteCategory = async (item) => {
    try {
      await instance.delete("/preferences/category", {
        data: { category: item },
      });

      setSelected(selected.filter((cat) => cat !== item));

      toast.success("Category Deleted");
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  // DELETE ALL
  const handleDeleteAll = async () => {
    try {
      await instance.delete("/preferences");

      setSelected([]);
      setFrequency("daily");
      setTime("08:00");
      setHasPreference(false);

      toast.success("Preferences Deleted");
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto mt-10 bg-white rounded-3xl shadow-xl p-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-center text-gray-800">
          Preferences
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Manage your news interests and notifications
        </p>

        {/* Categories */}
        <h2 className="text-lg font-semibold mb-4">Select Categories</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {categories.map((item, index) => (
            <div key={index} className="relative">
              <button
                onClick={() => toggleCategory(item)}
                className={`w-full py-3 rounded-xl border capitalize transition ${
                  selected.includes(item)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 hover:bg-blue-50"
                }`}
              >
                {item}
              </button>

              {selected.includes(item) && (
                <button
                  onClick={() => handleDeleteCategory(item)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Selected Categories */}
        {selected.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">
              Selected Categories
            </h2>

            <div className="flex flex-wrap gap-3">
              {selected.map((item, index) => (
                <div
                  key={index}
                  className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full capitalize font-medium"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Frequency */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Notification Frequency
          </label>

          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
          >
            <option value="instant">Instant</option>
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
          </select>
        </div>

        {/* Time */}
        {frequency === "daily" && (
          <div className="mb-8">
            <label className="block font-semibold mb-2">
              Preferred Time
            </label>

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
          >
            {hasPreference ? "Update Preferences" : "Save Preferences"}
          </button>

          {hasPreference && (
            <button
              onClick={handleDeleteAll}
              className="flex-1 bg-red-500 text-white py-3 rounded-xl hover:bg-red-600"
            >
              Delete All
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Preferences;