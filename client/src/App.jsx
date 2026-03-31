import { useState, useEffect } from 'react';
import ComplaintForm from './components/ComplaintForm';
import ComplaintFeed from './components/ComplaintFeed';

function App() {
  const [complaints, setComplaints] = useState([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category !== 'All') params.append('category', category);
    if (search) params.append('search', search);
    const response = await fetch(`/api/complaints?${params}`);
    const data = await response.json();
    setComplaints(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchComplaints();
  }, [category, search]);

  const addComplaint = async (newComplaint) => {
    await fetch('/api/complaints', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newComplaint),
    });
    fetchComplaints();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <header className="bg-gradient-to-r from-nigeria-green to-green-600 text-white py-6 px-4 shadow-lg">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-center mb-2">🇳🇬 Naija Complaints</h1>
          <p className="text-center text-lg opacity-90">Wetin dey do you? Drop your pepper here! 🌶️</p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <ComplaintForm onSubmit={addComplaint} />
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="🔍 Search complaints..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-full px-4 py-3 focus:border-nigeria-green focus:outline-none transition-colors"
                />
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border-2 border-gray-200 rounded-full px-4 py-3 focus:border-nigeria-green focus:outline-none transition-colors bg-white"
              >
                <option value="All">📂 All Categories</option>
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
          </div>
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nigeria-green mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading complaints...</p>
            </div>
          ) : (
            <ComplaintFeed complaints={complaints} onReact={fetchComplaints} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;