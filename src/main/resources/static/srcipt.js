// ===== Real Book Data =====
const books = [
	{
		title: "Wings Of Fire",
		author: "A.P.J. Abdul Kalam",
		price: 249,
		file: "books/Wings of fire (1).pdf",
		image: "images/abj.png"
	},
	{
		title: "Sardar Patel",
		author: "Vallabhbhai Patel",
		price: 0,
		file: "books/sardarpatel.pdf",
		image: "images/sardarpatel.jpg"
	},
	{
		title: "Shivaji Maharaj",
		author: "Purandar",
		price: 299,
		file: "books/who-was-shivaji_.pdf",
		image: "images/shivaji m.jpg"
	},
	{
		title: "Safalata",
		author: "Anonymous",
		price: 0,
		file: "books/safalata.Pdf",
		image: "images/safalta.png"
	},
	{
		title: "Shiksha",
		author: "Anonymous",
		price: 0,
		file: "books/Shiksha.pdf",
		image: "images/Shiksha.png"
	},
	{
		title: "Lakshya Goals Hindi",
		author: "Unknown",
		price: 99,
		file: "books/लक्ष्य Lakshya Goals Hindi.pdf",
		image: "images/lakshaaa.jpg"
	},
	{
		title: "Wings Of Fire",
		author: "A.P.J. Abdul Kalam",
		price: 249,
		file: "books/Wings of fire (1).pdf",
		image: "images/abj.png"
	},
	{
		title: "Sardar Patel",
		author: "Vallabhbhai Patel",
		price: 0,
		file: "books/sardarpatel.pdf",
		image: "images/sardarpatel.jpg"
	},
	{
		title: "Shivaji Maharaj",
		author: "Purandar",
		price: 299,
		file: "books/who-was-shivaji_.pdf",
		image: "images/shivaji m.jpg"
	},
	{
		title: "Safalata",
		author: "Anonymous",
		price: 0,
		file: "books/safalata.Pdf",
		image: "images/safalta.png"
	},
	{
		title: "Shiksha",
		author: "Anonymous",
		price: 0,
		file: "books/Shiksha.pdf",
		image: "images/Shiksha.png"
	},
	{
		title: "Lakshya Goals Hindi",
		author: "Unknown",
		price: 99,
		file: "books/लक्ष्य Lakshya Goals Hindi.pdf",
		image: "images/lakshaaa.jpg"
	},
	{
		title: "Five Point Someone",
		author: "Chetan Bhagat",
		price: 199,
		file: "books/five_point_someone-the.pdf",
		image: "images/Five-Point.jpg"
	},
	{
		title: "Spring Boot Guide",
		author: "Jane Smith",
		price: 299,
		file: "books/spring_boot_guide.pdf",
		image: "images/spring_boot_guide.jpg"
	},
	{
		title: "JavaScript Essentials",
		author: "Tom Hardy",
		price: 249,
		file: "books/javascript_essentials.pdf",
		image: "images/javascript_essentials.jpg"
	},
	{
		title: "HTML & CSS",
		author: "Alice Ray",
		price: 0,
		file: "books/html_css.pdf",
		image: "images/html_css.jpg"
	}
];

// ===== Pagination & Display =====
let currentPage = 1;
const booksPerPage = 10;
const bookContainer = document.getElementById("bookContainer");
const pageNumbers = document.getElementById("pageNumbers");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function displayBooks() {
	bookContainer.innerHTML = "";
	const totalPages = Math.ceil(books.length / booksPerPage);
	const start = (currentPage - 1) * booksPerPage;
	const end = Math.min(start + booksPerPage, books.length);
	const pageBooks = books.slice(start, end);

	pageBooks.forEach(book => {
		const bookCard = document.createElement("div");
		bookCard.classList.add("book-card", "fade-up");
		bookCard.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <div class="book-buttons">
                ${book.price === 0 ?
				`<button class="small-btn btn" onclick="downloadBook('${book.file}')">Download</button>` :
				`<button class="small-btn btn" onclick="buyBook('${book.title}', ${book.price}, '${book.file}')">Purchase ₹${book.price}</button>`
			}
            </div>
        `;
		bookContainer.appendChild(bookCard);
	});

	// Pagination
	pageNumbers.innerHTML = "";
	for (let i = 1; i <= totalPages; i++) {
		const page = document.createElement("span");
		page.classList.add("page-number");
		page.textContent = i;
		if (i === currentPage) page.classList.add("active");
		page.addEventListener("click", () => { currentPage = i; displayBooks(); });
		pageNumbers.appendChild(page);
	}

	prevBtn.disabled = currentPage === 1;
	nextBtn.disabled = currentPage === totalPages;
}

prevBtn.addEventListener("click", () => {
	if (currentPage > 1) {
		currentPage--;
		displayBooks();
	}
});
nextBtn.addEventListener("click", () => {
	if (currentPage < Math.ceil(books.length / booksPerPage)) {
		currentPage++;
		displayBooks();
	}
});

// ===== Scroll Animation =====
function fadeUpAnimation() {
	document.querySelectorAll('.fade-up').forEach(el => {
		const rect = el.getBoundingClientRect();
		if (rect.top < window.innerHeight - 100) el.classList.add('show');
	});
}
window.addEventListener('scroll', fadeUpAnimation);

// ===== Download Book =====
function downloadBook(file) {
	const link = document.createElement("a");
	link.href = file;
	link.download = file.split("/").pop();
	link.click();
}

// ===== Buy Book using Razorpay =====
function buyBook(title, price, file) {
	const userEmail = prompt("Enter your email for purchase:");
	if (!userEmail) return alert("Email is required!");

	const options = {
		key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay key
		amount: price * 100,
		currency: "INR",
		name: "BookVerse",
		description: title,
		handler: async function(response) {
			alert(`✅ Payment successful! Payment ID: ${response.razorpay_payment_id}`);

			// Save purchase in backend
			await fetch(`http://localhost:8080/api/downloads/add?email=${encodeURIComponent(userEmail)}&bookTitle=${encodeURIComponent(title)}&file=${encodeURIComponent(file)}`, {
				method: "POST"
			});

			// ✅ Automatically open purchased book
			window.open(file, "_blank");
		},
		prefill: { email: userEmail },
		theme: { color: "#ffb400" }
	};
	const rzp = new Razorpay(options);
	rzp.open();
}

// ===== Show User Downloads =====
async function showUserDownloads() {
	const userEmail = prompt("Enter your email:");
	if (!userEmail) return;

	const response = await fetch(`http://localhost:8080/api/downloads?email=${encodeURIComponent(userEmail)}`);
	const downloads = await response.json();

	const container = document.getElementById("downloadContainer");
	container.innerHTML = "";

	if (downloads.length === 0) {
		container.textContent = "You have not downloaded any books yet.";
		return;
	}

	downloads.forEach(d => {
		const div = document.createElement("div");
		div.innerHTML = `
            <h4>${d.bookTitle}</h4>
            <button onclick="downloadBook('${d.filePath}')">Download Again</button>
        `;
		container.appendChild(div);
	});
}

// ===== Contact Form =====
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	const formData = {
		fullName: document.getElementById("name").value,
		email: document.getElementById("email").value,
		message: document.getElementById("message").value
	};

	try {
		const response = await fetch("http://localhost:8080/api/contact", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData)
		});

		const result = await response.text();
		formStatus.textContent = result;
		formStatus.style.color = "green";
		contactForm.reset();
	} catch (err) {
		formStatus.textContent = "Error sending message. Try again.";
		formStatus.style.color = "red";
		console.error(err);
	}
});

// ===== Initialize =====
displayBooks();

// ===== Lenis Smooth Scroll Integration =====
const lenis = new Lenis({
	duration: 1.2,
	easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
	smoothWheel: true,
	smoothTouch: false,
});

lenis.on('scroll', fadeUpAnimation);

function raf(time) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
