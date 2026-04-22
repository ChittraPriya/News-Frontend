import { useEffect, useState } from "react";
import instance from "../instances/instances";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Settings = () => {
  const [settings, setSettings] = useState({
  frequency: "instant",
  notifications: {
    email: true,
    push: true
  }
});
const navigate = useNavigate();
const [email, setEmail] = useState("");

const [emailLoading, setEmailLoading] = useState(false);
const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
  try {
    const res = await instance.get("/preferences");

    const pref = res.data.preference;

    if (pref) {
      setSettings({
        frequency: pref.frequency || "instant",
        notifications: {
          email: pref.notifications?.email ?? true,
          push: pref.notifications?.push ?? true,
        },
      });

      setEmail(pref.email || "");
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to load settings");
  }
};

  const handleChange = (e) => {
    setSettings({
      ...settings,
      frequency: e.target.value
    });
  };

  const toggleNotification = (type) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [type]: !settings.notifications[type]
      }
    });
  };
  const updateEmail = async () => {
  try {
    setEmailLoading(true);

    await instance.put("/auth/update-email", {
      email,
    });

    toast.success("Email updated successfully!");
  } catch (err) {
    console.log(err);
    toast.error("Failed to update email");
  } finally {
    setEmailLoading(false);
  }
};
const saveSettings = async () => {
    try {
      setLoading(true);

      await instance.put("/preferences", settings);

      toast.success("Settings saved!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);

    } catch (err) {
      toast.error("Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto mt-10 bg-white rounded-3xl shadow-xl p-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Notification Settings
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Manage your news interests and notifications
        </p>

      {/* EMAIL TOGGLE */}
      <div className="flex justify-between items-center mb-5">
  <span className="font-medium">Email Notifications</span>

  <button
    onClick={() => toggleNotification("email")}
    className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
      settings?.notifications?.email
        ? "bg-blue-600"
        : "bg-gray-300"
    }`}
  >
    <div
      className={`w-5 h-5 bg-white rounded-full shadow-md transform transition ${
        settings?.notifications?.email
          ? "translate-x-7"
          : "translate-x-0"
      }`}
    />
  </button>
</div>

      {/* PUSH TOGGLE */}
      <div className="flex justify-between items-center mb-5">
  <span className="font-medium">Push Notifications</span>

  <button
    onClick={() => toggleNotification("push")}
    className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
      settings?.notifications?.push
        ? "bg-green-600"
        : "bg-gray-300"
    }`}
  >
    <div
      className={`w-5 h-5 bg-white rounded-full shadow-md transform transition ${
        settings?.notifications?.push
          ? "translate-x-7"
          : "translate-x-0"
      }`}
    />
  </button>
</div>

      {/* FREQUENCY */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">
          Notification Frequency
        </label>

        <select
          value={settings.frequency}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="instant">Instant</option>
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
        </select>
      </div>

      <div className="mt-6 p-4 border rounded-xl bg-gray-50">

  <h3 className="font-semibold mb-3">
    Email Address
  </h3>

  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Enter your email"
    className="w-full border p-2 rounded"
  />

  <button
    onClick={updateEmail}
    disabled={emailLoading}
    className="mt-3 bg-green-600 text-white px-4 py-2 rounded w-full"
  >
    {emailLoading ? "Updating..." : "Update Email"}
  </button>

</div>

      {/* SAVE BUTTON */}
      <button
        onClick={saveSettings}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-5"
      >
        Save Settings
      </button>

    </div>
    </div>
  );
};

export default Settings;