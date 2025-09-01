import { useEffect, useState } from "react";
import axios from "axios";

const StudentDetail = ({ name, email, phoneNo, role, studentId }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(
          `https://online-exam-portal-server.onrender.com/api/submissions/student/${studentId}`
        );
        console.log("Fetched submissions:", response.data);
        setSubmissions(response.data);
      } catch (err) {
        console.error("Error fetching submissions:", err);
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchSubmissions();
    }
  }, [studentId]);

  return (
    <div className="p-4 border rounded-md shadow-md">
      <h2 className="text-xl font-semibold">
        {name} ({role})
      </h2>
      <p>Email: {email}</p>
      <p>Phone: {phoneNo}</p>

      <h3 className="mt-4 text-lg font-medium">Exam Attempts</h3>

      {loading ? (
        <p>Loading...</p>
      ) : submissions.length === 0 ? (
        <p>No exams attempted yet.</p>
      ) : (
        submissions.map((sub) => (
          <div key={sub._id} className="mt-2 p-2 border rounded">
            <p>
              <strong>Exam:</strong>{sub.exam}
              {sub.exam?.title || sub.exam || "Unknown Exam"}
            </p>
            <p>
              <strong>Score:</strong> {sub.score}
            </p>
            <p>
              <strong>Attempted At:</strong>{" "}
              {new Date(sub.attemptedAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default StudentDetail;
