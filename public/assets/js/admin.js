/* ============================================
   ULTIMATE2SURE ADMIN PANEL
============================================ */

const ADMIN_PASSWORD = "Ultimate2sure@@@";

/* LOGIN */
function adminLogin() {
  const pass = document.getElementById("adminPassword").value;
  if (pass === ADMIN_PASSWORD) {
    localStorage.setItem("adminAuth", "true");
    window.location.href = "dashboard.html";
  } else {
    alert("Wrong Password");
  }
}

/* PROTECT PAGES */
if (window.location.pathname.includes("/admin/") &&
    !window.location.pathname.includes("index.html")) {
  if (!localStorage.getItem("adminAuth")) {
    window.location.href = "index.html";
  }
}

/* LOGOUT */
function adminLogout() {
  localStorage.removeItem("adminAuth");
  window.location.href = "index.html";
}

/* CAMPAIGNS STORAGE */
function getCampaigns() {
  return JSON.parse(localStorage.getItem("campaigns") || "[]");
}

function saveCampaigns(data) {
  localStorage.setItem("campaigns", JSON.stringify(data));
}

/* CREATE CAMPAIGN */
function createCampaign() {
  const title = document.getElementById("title").value;
  const link = document.getElementById("link").value;

  let campaigns = getCampaigns();

  campaigns.push({
    id: Date.now(),
    title,
    link,
    visits: 0,
    completions: 0
  });

  saveCampaigns(campaigns);
  alert("Campaign Created");
  window.location.href = "campaigns.html";
}

/* LOAD CAMPAIGNS */
function loadCampaigns() {
  const table = document.getElementById("campaignTable");
  if (!table) return;

  let campaigns = getCampaigns();
  table.innerHTML = "";

  campaigns.forEach(c => {
    table.innerHTML += `
      <tr>
        <td>${c.title}</td>
        <td>${c.visits}</td>
        <td>${c.completions}</td>
        <td>
          <button onclick="deleteCampaign(${c.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function deleteCampaign(id) {
  let campaigns = getCampaigns();
  campaigns = campaigns.filter(c => c.id !== id);
  saveCampaigns(campaigns);
  loadCampaigns();
}

document.addEventListener("DOMContentLoaded", loadCampaigns);
