export default function registerValidation(input) {
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~`-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~`-]{8,}$/;
    const telRegex = /^\d{10}$/;

    // Name validation
    if (!input.name) {
        errors.name = "Name is required";
    }
    if (!input.address) {
        errors.address = "Address is required";
    }
    // Email validation
    if (!input.email) {
        errors.email = "Email is required";
    } else if (!emailRegex.test(input.email)) {
        errors.email = "Invalid email address";
    }

    // Phone number validation
    if (!input.phone) {
        errors.phone = "Phone number is required";
    } else if (!telRegex.test(input.phone)) {
        errors.phone = "Phone number must be 10 digits";
    } else if (Number(input.phone)) {
        errors.dni = "The phone number field must be a number";
    }

    // Password validation
    if (!input.password) {
        errors.password = "You must enter a password";
    } else if (!passwordRegex.test(input.password)) {
        errors.password = "Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character";
    }

    if (!input.confirmPassword) {
        errors.confirmPassword = "Repeating the password is required";
    } else if (input.confirmPassword !== input.password) {
        errors.confirmPassword = "Passwords must match";
    }

    return errors;
}
