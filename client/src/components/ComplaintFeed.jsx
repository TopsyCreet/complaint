import ComplaintCard from './ComplaintCard';

function ComplaintFeed({ complaints, onReact }) {
  if (complaints.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No complaints found</h3>
        <p className="text-gray-500">Na only you waka come? Be the first to drop your pepper! 🌶️</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {complaints.map((complaint) => (
        <ComplaintCard key={complaint.id} complaint={complaint} onReact={onReact} />
      ))}
    </div>
  );
}

export default ComplaintFeed;