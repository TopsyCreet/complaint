const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'complaints.json');

// Load data from JSON file
function loadData() {
  if (fs.existsSync(dbPath)) {
    return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  }
  return [];
}

// Save data to JSON file
function saveData(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// Initialize with sample data if empty
let complaints = loadData();
if (complaints.length === 0) {
  complaints = [
    {
      id: 1,
      name: 'Chike',
      category: 'NEPA/Power',
      complaint: 'NEPA don turn light off for 3 days straight! Wetin dey happen na? My generator don tire o!',
      vex_count: 0,
      cry_count: 0,
      laugh_count: 0,
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      name: 'Ada',
      category: 'Banks',
      complaint: 'Bank queue too long! I stand for 2 hours just to withdraw my own money. Naija banks no get sense!',
      vex_count: 0,
      cry_count: 0,
      laugh_count: 0,
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      name: 'Anonymous',
      category: 'Roads',
      complaint: 'Roads for Lagos bad pass bad! Potholes everywhere, my car tire don burst twice this week.',
      vex_count: 0,
      cry_count: 0,
      laugh_count: 0,
      created_at: new Date().toISOString()
    },
    {
      id: 4,
      name: 'Emeka',
      category: 'Telecoms',
      complaint: 'MTN network slow like tortoise! I no fit even load WhatsApp. Change network or wetin?',
      vex_count: 0,
      cry_count: 0,
      laugh_count: 0,
      created_at: new Date().toISOString()
    },
    {
      id: 5,
      name: 'Ngozi',
      category: 'Police',
      complaint: 'Police stop and search me for no reason. Dem say na checkpoint, but na extortion center!',
      vex_count: 0,
      cry_count: 0,
      laugh_count: 0,
      created_at: new Date().toISOString()
    }
  ];
  saveData(complaints);
}

module.exports = {
  getAll: (category, search) => {
    let filtered = complaints;
    if (category && category !== 'All') {
      filtered = filtered.filter(c => c.category === category);
    }
    if (search) {
      filtered = filtered.filter(c => c.complaint.toLowerCase().includes(search.toLowerCase()));
    }
    return filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },
  add: (complaint) => {
    const newId = Math.max(...complaints.map(c => c.id), 0) + 1;
    const newComplaint = {
      id: newId,
      ...complaint,
      vex_count: 0,
      cry_count: 0,
      laugh_count: 0,
      created_at: new Date().toISOString()
    };
    complaints.push(newComplaint);
    saveData(complaints);
    return newId;
  },
  react: (id, reaction) => {
    const complaint = complaints.find(c => c.id == id);
    if (complaint) {
      complaint[`${reaction}_count`]++;
      saveData(complaints);
      return true;
    }
    return false;
  }
};