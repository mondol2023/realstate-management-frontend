document.addEventListener("DOMContentLoaded", () => {
  const listingsContainer = document.getElementById("listings");
  const searchForm = document.getElementById("search-form");

  async function loadListings(query = "") {
    try {
      const res = await apiRequest(`/listings${query ? `?q=${query}` : ""}`);
      listingsContainer.innerHTML = "";
      res.forEach(listing => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="${listing.images?.[0] || 'https://via.placeholder.com/300'}" alt="${listing.title}" />
          <div class="card-body">
            <h3>${listing.title}</h3>
            <p>${listing.location}</p>
            <p><strong>$${listing.price}/night</strong></p>
            <a href="listing.html?id=${listing._id}">View</a>
          </div>
        `;
        listingsContainer.appendChild(card);
      });
    } catch (err) {
      listingsContainer.innerHTML = `<p>Error loading listings: ${err.message}</p>`;
    }
  }

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = document.getElementById("search-input").value;
    loadListings(query);
  });

  loadListings();
});
