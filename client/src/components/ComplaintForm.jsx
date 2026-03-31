import { useState } from 'react';

function ComplaintForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Other');
  const [complaint, setComplaint] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (complaint.trim() && !submitting) {
      setSubmitting(true);
      try {
        await onSubmit({ name: name.trim() || 'Anonymous', category, complaint: complaint.trim() });
        setName('');
        setComplaint('');
        setCategory('Other');
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } catch (error) {
        console.error('Error submitting:', error);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-nigeria-green flex items-center gap-2">
        📝 Drop Your Complaint
      </h2>
      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-2">
          ✅ Complaint posted successfully!
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Your Name (Optional)</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Anonymous"
            className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-nigeria-green focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-nigeria-green focus:outline-none transition-colors bg-white"
          >
            <option value="Government">🏛️ Government</option>
            <option value="NEPA/Power">⚡ NEPA/Power</option>
            <option value="Roads">🛣️ Roads</option>
            <option value="Banks">🏦 Banks</option>
            <option value="Telecoms">📱 Telecoms</option>
            <option value="Police">🚔 Police</option>
            <option value="Landlord">🏠 Landlord</option>
            <option value="Market">🛒 Market</option>
            <option value="School">🎓 School</option>
            <option value="Other">❓ Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Your Complaint</label>
          <textarea
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            maxLength={500}
            rows={4}
            placeholder="Wetin dey do you? Spill am here... 🌶️"
            className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-nigeria-green focus:outline-none transition-colors resize-none"
            required
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-500">{complaint.length}/500 characters</p>
            <div className="w-full bg-gray-200 rounded-full h-2 ml-4">
              <div
                className="bg-nigeria-green h-2 rounded-full transition-all duration-300"
                style={{ width: `${(complaint.length / 500) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={submitting || !complaint.trim()}
          className="w-full bg-nigeria-green text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold text-lg flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Posting...
            </>
          ) : (
            <>
              🚀 Drop Complaint
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default ComplaintForm;