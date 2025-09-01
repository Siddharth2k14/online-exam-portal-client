import { useEffect, useState } from "react";
import axios from "axios";

const StudentDetail = ({ name, email, phoneNo, role, studentId }) => {
  const [examHistory, setExamHistory] = useState([]);
  const [studentInfo, setStudentInfo] = useState(null);
  const [totalExamsAttempted, setTotalExamsAttempted] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExamHistory = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use the new detailed history endpoint
        const response = await axios.get(
          `https://online-exam-portal-server.onrender.com/api/submissions/student/${studentId}/history`
        );
        
        console.log("Fetched exam history:", response.data);
        
        setExamHistory(response.data.examHistory || []);
        setStudentInfo(response.data.student);
        setTotalExamsAttempted(response.data.totalExamsAttempted || 0);
      } catch (err) {
        console.error("Error fetching exam history:", err);
        setError("Failed to load exam history. Please try again.");
        
        // Fallback to original endpoint if new one fails
        try {
          const fallbackResponse = await axios.get(
            `https://online-exam-portal-server.onrender.com/api/submissions/student/${studentId}`
          );
          setExamHistory(fallbackResponse.data || []);
          setTotalExamsAttempted(fallbackResponse.data?.length || 0);
        } catch (fallbackErr) {
          console.error("Fallback request also failed:", fallbackErr);
        }
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchExamHistory();
    }
  }, [studentId]);

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending Review':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6 border rounded-lg shadow-md bg-white">
      {/* Student Info Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {name} ({role})
        </h2>
        <div className="text-gray-600 space-y-1">
          <p><span className="font-medium">Email:</span> {email}</p>
          <p><span className="font-medium">Phone:</span> {phoneNo}</p>
        </div>
      </div>

      {/* Exam Statistics */}
      <div className="mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Exam Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalExamsAttempted}</div>
              <div className="text-sm text-gray-600">Total Exams Attempted</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {examHistory.filter(exam => exam.status === 'Completed').length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {examHistory.filter(exam => exam.status === 'Pending Review').length}
              </div>
              <div className="text-sm text-gray-600">Pending Review</div>
            </div>
          </div>
        </div>
      </div>

      {/* Exam History */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Exam History</h3>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading exam history...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <div className="text-red-500 mb-2">⚠️ {error}</div>
          </div>
        ) : examHistory.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <div className="text-gray-400 text-4xl mb-2">📝</div>
            <p className="text-gray-600">No exams attempted yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {examHistory.map((exam, index) => (
              <div key={exam._id || index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800 mb-1">
                      {exam.examName || exam.exam || "Unknown Exam"}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Attempted on: {formatDate(exam.attemptedAt)}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(exam.status)}`}>
                      {exam.status || 'Completed'}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="bg-blue-50 rounded p-3">
                    <div className="font-medium text-blue-800">Total Score</div>
                    <div className="text-xl font-bold text-blue-600">{exam.totalScore || exam.score || 0}</div>
                  </div>
                  
                  {exam.hasObjective && (
                    <div className="bg-green-50 rounded p-3">
                      <div className="font-medium text-green-800">Objective</div>
                      <div className="text-lg font-semibold text-green-600">
                        {exam.objectiveScore || 0}/{exam.totalObjectiveMarks || 0}
                      </div>
                    </div>
                  )}
                  
                  {exam.hasSubjective && (
                    <div className="bg-purple-50 rounded p-3">
                      <div className="font-medium text-purple-800">Subjective</div>
                      <div className="text-lg font-semibold text-purple-600">
                        {exam.subjectiveScore || 0}/{exam.totalSubjectiveMarks || 0}
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-gray-50 rounded p-3">
                    <div className="font-medium text-gray-800">Total Questions</div>
                    <div className="text-lg font-semibold text-gray-600">
                      {exam.totalQuestions || 0}
                    </div>
                  </div>
                </div>
                
                {exam.status === 'Pending Review' && (
                  <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
                    <p className="text-sm text-yellow-800">
                      ℹ️ This exam contains subjective questions that are awaiting teacher review.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetail;
