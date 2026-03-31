import { useState } from 'react';

function ComplaintCard({ complaint, onReact }) {
  const [reacting, setReacting] = useState(false);
  const [animatingReaction, setAnimatingReaction] = useState(null);

  const handleReact = async (reaction) => {
    if (reacting) return;
    setReacting(true);
    setAnimatingReaction(reaction);
    try {
      await fetch(`/api/complaints/${complaint.id}/react`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reaction }),
      });
      onReact();
      setTimeout(() => setAnimatingReaction(null), 500);
    } catch (error) {
      console.error('Error reacting:', error);
      setAnimatingReaction(null);
    } finally {
      setReacting(false);
    }
  };

  const timeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'now';
  };

  const getInitials = (name) => {
    return name === 'Anonymous' ? 'A' : name.charAt(0).toUpperCase();
  };

  const getCategoryEmoji = (category) => {
    const emojis = {
      'Government': '🏛️',
      'NEPA/Power': '⚡',
      'Roads': '🛣️',
      'Banks': '🏦',
      'Telecoms': '📱',
      'Police': '🚔',
      'Landlord': '🏠',
      'Market': '🛒',
      'School': '🎓',
      'Other': '❓'
    };
    return emojis[category] || '❓';
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-4 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-nigeria-green to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {getInitials(complaint.name)}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-gray-900">{complaint.name}</span>
            <span className="text-xs bg-nigeria-green text-white px-2 py-1 rounded-full flex items-center gap-1">
              {getCategoryEmoji(complaint.category)} {complaint.category}
            </span>
          </div>
          <span className="text-xs text-gray-500">{timeAgo(complaint.created_at)}</span>
        </div>
      </div>
      <p className="text-gray-800 mb-4 leading-relaxed">{complaint.complaint}</p>
      <div className="flex gap-6 pt-4 border-t border-gray-100">
        <button
          onClick={() => handleReact('vex')}
          disabled={reacting}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
            animatingReaction === 'vex' ? 'scale-110 bg-red-50' : 'hover:bg-red-50'
          }`}
        >
          <span className={`text-2xl ${animatingReaction === 'vex' ? 'animate-bounce' : ''}`}>😤</span>
          <span className="font-medium text-gray-700">{complaint.vex_count}</span>
        </button>
        <button
          onClick={() => handleReact('cry')}
          disabled={reacting}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
            animatingReaction === 'cry' ? 'scale-110 bg-blue-50' : 'hover:bg-blue-50'
          }`}
        >
          <span className={`text-2xl ${animatingReaction === 'cry' ? 'animate-bounce' : ''}`}>😭</span>
          <span className="font-medium text-gray-700">{complaint.cry_count}</span>
        </button>
        <button
          onClick={() => handleReact('laugh')}
          disabled={reacting}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
            animatingReaction === 'laugh' ? 'scale-110 bg-yellow-50' : 'hover:bg-yellow-50'
          }`}
        >
          <span className={`text-2xl ${animatingReaction === 'laugh' ? 'animate-bounce' : ''}`}>😂</span>
          <span className="font-medium text-gray-700">{complaint.laugh_count}</span>
        </button>
      </div>
    </div>
  );
}

export default ComplaintCard;