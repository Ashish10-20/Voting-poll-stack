import { useState, useEffect, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const AdminPanel = () => {
  const { token } = useContext(AuthContext);
  const [polls, setPolls] = useState([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [closingTime, setClosingTime] = useState("");

  const fetchPolls = async () => {
    try {
      const res = await api.get("/polls", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPolls(res.data.polls || []);
    } catch (err) {
      console.error("Error fetching polls:", err);
    }
  };

  const createPoll = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        "/polls",
        { question, options, closesAt: closingTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setQuestion("");
      setOptions(["", ""]);
      setClosingTime("");
      fetchPolls();
      alert("✅ Poll created successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "❌ Failed to create poll");
    }
  };

  const deletePoll = async (id) => {
    try {
      await api.delete(`/polls/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPolls();
      alert("🗑️ Poll deleted!");
    } catch (err) {
      console.error(err);
    }
  };

 useEffect(() => {
  fetchPolls();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-indigo-600 text-center">
          Admin Panel
        </h2>

        {/* Poll Form */}
        <form
          onSubmit={createPoll}
          className="mb-6 border p-4 rounded-lg bg-gray-50 shadow-sm"
        >
          <input
            type="text"
            placeholder="Poll Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="block w-full p-2 mb-3 border rounded focus:ring-2 focus:ring-indigo-300 outline-none"
            required
          />
          {options.map((opt, idx) => (
            <input
              key={idx}
              type="text"
              placeholder={`Option ${idx + 1}`}
              value={opt}
              onChange={(e) => {
                const newOpts = [...options];
                newOpts[idx] = e.target.value;
                setOptions(newOpts);
              }}
              className="block w-full p-2 mb-3 border rounded focus:ring-2 focus:ring-indigo-300 outline-none"
              required
            />
          ))}
          <button
            type="button"
            onClick={() => setOptions([...options, ""])}
            className="bg-gray-600 text-white py-1 px-3 rounded hover:bg-gray-700 transition mb-3"
          >
            + Add Option
          </button>
          <input
            type="datetime-local"
            value={closingTime}
            onChange={(e) => setClosingTime(e.target.value)}
            className="block w-full p-2 mb-4 border rounded focus:ring-2 focus:ring-indigo-300 outline-none"
            required
          />
          <button className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition w-full">
            Create Poll
          </button>
        </form>

        {/* Polls List */}
        <h3 className="text-xl font-semibold text-gray-700 mb-3">All Polls</h3>
        {polls.length === 0 ? (
          <p className="text-gray-500">No polls created yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {polls.map((poll) => (
              <div
                key={poll._id}
                className="border rounded-lg p-4 shadow-md bg-gradient-to-br from-white to-indigo-50"
              >
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {poll.question}
                </h4>
                <button
                  onClick={() => deletePoll(poll._id)}
                  className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
