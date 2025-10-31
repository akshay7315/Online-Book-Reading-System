// 🌐 Fetch and display Contacts
async function loadContacts() {
  const res = await fetch("http://localhost:8080/api/admin/contacts");
  const data = await res.json();
  const table = document.querySelector("#contactTable tbody");
  table.innerHTML = "";

  data.forEach(contact => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${contact.id}</td>
      <td>${contact.fullName}</td>
      <td>${contact.email}</td>
      <td>${contact.message}</td>
      <td>
        <button onclick="editContact(${contact.id})">Edit</button>
        <button onclick="deleteContact(${contact.id})">Delete</button>
      </td>
    `;
    table.appendChild(row);
  });
}

// 🌐 Fetch and display Users
async function loadUsers() {
  const res = await fetch("http://localhost:8080/api/admin/users");
  const data = await res.json();
  const table = document.querySelector("#userTable tbody");
  table.innerHTML = "";

  data.forEach(user => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.username}</td>
      <td><input type="text" value="${user.email}" id="email-${user.id}" /></td>
      <td><input type="text" value="${user.city}" id="city-${user.id}" /></td>
      <td><input type="text" value="${user.role}" id="role-${user.id}" /></td>
      <td>
        <button onclick="updateUser(${user.id})">Save</button>
        <button onclick="deleteUser(${user.id})">Delete</button>
      </td>
    `;
    table.appendChild(row);
  });
}

// ✏️ Update user
async function updateUser(id) {
  const email = document.getElementById(`email-${id}`).value;
  const city = document.getElementById(`city-${id}`).value;
  const role = document.getElementById(`role-${id}`).value;

  await fetch(`http://localhost:8080/api/admin/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, city, role })
  });

  alert("User updated successfully!");
  loadUsers();
}

// ❌ Delete user
async function deleteUser(id) {
  if (confirm("Delete this user?")) {
    await fetch(`http://localhost:8080/api/admin/users/${id}`, { method: "DELETE" });
    loadUsers();
  }
}

// ✏️ Edit contact
async function editContact(id) {
  const name = prompt("Enter new name:");
  const email = prompt("Enter new email:");
  const message = prompt("Enter new message:");

  if (!name || !email || !message) return;

  await fetch(`http://localhost:8080/api/admin/contacts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullName: name, email, message })
  });

  alert("Contact updated successfully!");
  loadContacts();
}

// ❌ Delete contact
async function deleteContact(id) {
  if (confirm("Delete this contact?")) {
    await fetch(`http://localhost:8080/api/admin/contacts/${id}`, { method: "DELETE" });
    loadContacts();
  }
}

// 🧭 Section toggle
function showSection(section) {
  document.querySelectorAll(".section").forEach(sec => sec.style.display = "none");
  document.getElementById(section).style.display = "block";

  if (section === "contacts") loadContacts();
  else loadUsers();
}

// 🚪 Logout
function logout() {
  if (confirm("Are you sure you want to logout?")) {
    window.location.href = "login.html";
  }
}

// 🏁 Load contacts by default
loadContacts();
