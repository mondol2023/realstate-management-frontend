const API_URL = "http://localhost:5000/api"; 

async function apiRequest(endpoint, method = "GET", data = null) {
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "include" 
  };

  if (data) options.body = JSON.stringify(data);

  const res = await fetch(`${API_URL}${endpoint}`, options);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "API Error");
  }
  return res.json();
}
