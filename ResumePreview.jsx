import { useLocation } from "react-router-dom";

function ResumePreview() {
  const { state: data } = useLocation();
  if (!data) return <p className="text-center mt-20 text-red-500">No data found</p>;

  const downloadResume = () => {
    const resumeContent = `
                ${data.name.toUpperCase()}
       ${data.email} | ${data.phone}

Education:
    ${data.education}

Skills:
    ${data.skills}

Experience:
    ${data.experience}
    `;
    const blob = new Blob([resumeContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "resume.txt";
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-10">
        <h1 className="text-3xl font-bold text-center mb-2 text-purple-800">
          {data.name.toUpperCase()}
        </h1>
        <p className="text-center text-gray-700 mb-6">
          {data.email} | {data.phone}
        </p>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-purple-700 mb-1">Education</h2>
          <p>{data.education}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-purple-700 mb-1">Skills</h2>
          <p>{data.skills}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-purple-700 mb-1">Experience</h2>
          <p>{data.experience}</p>
        </div>

        {data.suggestions?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-purple-700 mb-1">AI Resume Suggestions</h2>
            <ul className="list-disc pl-6 text-gray-800">
              {data.suggestions.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={downloadResume}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-2 rounded-full hover:scale-105 transition-transform"
          >
            Download Resume
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResumePreview;
