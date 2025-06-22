import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    education: "",
    experience: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // 1. Save resume data to backend
      const res = await fetch("http://localhost:5000/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Resume save failed");
  
      // 2. 🔥 Get AI suggestions from OpenAI
      const aiRes = await fetch("http://localhost:5000/api/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skills: formData.skills,
          experience: formData.experience,
        }),
      });
  
      const aiData = await aiRes.json();
      console.log("AI Suggestions:", aiData.suggestions);
  
      // 3. Navigate to the preview page with suggestions
      navigate("/preview", {
        state: {
          ...formData,
          suggestions: aiData.suggestions,
        },
      });
    } catch (err) {
      console.error("Error:", err);
      alert("Server is busy. Please try again later.");
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-4xl bg-white p-10 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-10">
          Smart Resume Builder
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <input
            className="input"
            name="name"
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
          <input
            className="input"
            name="email"
            onChange={handleChange}
            placeholder="Email Address"
            required
          />
          <input
            className="input"
            name="phone"
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
          <input
            className="input"
            name="skills"
            onChange={handleChange}
            placeholder="Skills (e.g. Java, React)"
          />
          <input
            className="input"
            name="education"
            onChange={handleChange}
            placeholder="Education (e.g. B.Tech - CSE)"
          />
          <textarea
            className="input col-span-1 md:col-span-2 h-28 resize-none"
            name="experience"
            onChange={handleChange}
            placeholder="Experience (Optional)"
          />

          <div className="col-span-1 md:col-span-2 text-center mt-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold px-8 py-3 rounded-full hover:scale-105 transition-transform"
            >
              Save & Generate Resume
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
