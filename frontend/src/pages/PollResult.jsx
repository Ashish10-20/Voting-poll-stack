import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const PollResult = () => {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const res = await api.get(`/polls/${id}/results`);
        setPoll(res.data.poll);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPoll();
  }, [id]);

  if (!poll) return <p className="p-4">Loading results...</p>;

  const data = poll.options.map((opt) => ({
    name: opt.text,
    votes: opt.votes,
  }));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">{poll.question}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="votes" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PollResult;
