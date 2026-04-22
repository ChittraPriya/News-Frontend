import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import instance from "../instances/instances";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

import logo1 from "../assets/logos/bbc.png";
import logo2 from "../assets/logos/theHindu.png";
import logo3 from "../assets/logos/ndtv.jpg";
import logo4 from "../assets/logos/Forbes.jpg";
import logo5 from "../assets/logos/CNBC.jpg";
import logo6 from "../assets/logos/TechCrunch.jpg";
import logo7 from "../assets/logos/apple.jpg";

const NewsDetails = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await instance.get(`/news/${id}`);
      setNews(res.data.news);
      console.log("NEWS LIST:", res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!news) return <h1>Loading...</h1>;

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto p-4">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/dashboard")} // change route if needed
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          ← Back to Dashboard
        </button>
        {/* IMAGE FIXED */}
        {news?.image ? (
          <img
            src={`${import.meta.env.VITE_API_URL}/uploads/${news.image}`}
            className="w-full h-[400px] object-cover"
            alt={news.title}
          />
        ) : (
          <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center">
            No Image Available
          </div>
        )}

        <h1 className="text-3xl font-bold mt-4">{news.title}</h1>

        <p className="text-gray-600">{news.category}</p>

        <p className="mt-4">{news.description}</p>

        <h2 className="text-xl font-bold mt-6">Other Sources</h2>

        <Channel logo={logo1} text={news.desc1} name="BBC" />
        <Channel logo={logo2} text={news.desc2} name="The Hindu" />
        <Channel logo={logo3} text={news.desc3} name="NDTV" />
        <Channel logo={logo4} text={news.desc4} name="Forbes" />
        <Channel logo={logo5} text={news.desc5} name="CNBC" />
        <Channel logo={logo6} text={news.desc6} name="TechCrunch" />
        <Channel logo={logo7} text={news.desc7} name="Apple" />
      </div>
    </div>
  );
};

const Channel = ({ logo, text, name }) => {
  return (
    <div className="border p-4 mt-3 rounded-xl bg-gray-50">
      <div className="flex items-center gap-4 mb-2">
        {/* FIXED LOGO SIZE */}
        <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full overflow-hidden border">
          <img src={logo} className="w-full h-full object-contain" alt={name} />
        </div>

        <h3 className="font-bold text-lg">{name}</h3>
      </div>

      <p className="text-gray-700 leading-7">
        {text || "No coverage available"}
      </p>
    </div>
  );
};
export default NewsDetails;
