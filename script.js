const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const enquiryForm = document.getElementById("enquiryForm");
const formNote = document.getElementById("formNote");

if (enquiryForm) {
  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!enquiryForm.reportValidity()) return;

    const formData = new FormData(enquiryForm);
    const name = formData.get("name").trim();
    const organization = formData.get("organization").trim();
    const email = formData.get("email").trim();
    const message = formData.get("message").trim();

    const subject = encodeURIComponent(`Website enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\n` +
      `Business / Organization: ${organization || "Not provided"}\n` +
      `Email: ${email}\n\n` +
      `Message:\n${message}`
    );

    if (formNote) {
      formNote.textContent = "Opening your email app with the enquiry details…";
    }

    window.location.href =
      `mailto:divyadeepmlr@gmail.com?subject=${subject}&body=${body}`;
  });
}