import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { token, user } = useContext(AuthContext);
  const [polls, setPolls] = useState([]);
  const [message, setMessage] = useState("");

  const fetchPolls = async () => {
    try {
      const res = await api.get("/polls?status=open");
      setPolls(res.data.polls);
    } catch (err) {
      console.error(err);
    }
  };

  const handleVote = async (pollId, optionId) => {
    try {
      await api.post(
        `/polls/${pollId}/vote`,
        { optionId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("? Vote submitted successfully!");
      fetchPolls(); // refresh list
    } catch (err) {
      setMessage(err.response?.data?.message || "? Failed to vote");
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Welcome, {user?.name || "Guest"}
      </h1>
      {message && <p className="mb-4 text-green-600">{message}</p>}

      {polls.length === 0 ? (
        <p>No open polls right now.</p>
      ) : (
        polls.map((poll) => (
          <div
            key={poll._id}
            className="border rounded p-4 mb-4 shadow-sm bg-gray-50"
          >
            <h3 className="text-xl font-medium mb-2">{poll.question}</h3>
            {poll.options.map((opt) => (
              <button
                key={opt._id}
                onClick={() => handleVote(poll._id, opt._id)}
                className="bg-blue-500 text-white py-1 px-3 rounded mr-2 hover:bg-blue-600"
              >
                {opt.text}
              </button>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
