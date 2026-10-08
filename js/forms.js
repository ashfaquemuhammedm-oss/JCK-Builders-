export function mountForm(form) {
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let valid = true;
    form.querySelectorAll("[required]").forEach((field) => {
      const error = field.closest(".field").querySelector(".field-error");
      const message = field.validity.valueMissing
        ? "This field is required."
        : field.validity.typeMismatch
          ? "Enter a valid email address."
          : "";
      error.textContent = message;
      field.setAttribute("aria-invalid", Boolean(message));
      valid &&= !message;
    });
    if (valid) {
      form.querySelector(".form-status").textContent =
        "Your details are ready to send. Connect this form to your preferred enquiry endpoint to receive submissions.";
      form.reset();
    }
  });
}
