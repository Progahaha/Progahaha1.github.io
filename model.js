
export const model = {
    validatePhone(phone) {
        const regex = /^\+\d{10,13}$/;
        return regex.test(phone);
    }
};


// === AUTH LOGIC ===
const users = JSON.parse(localStorage.getItem("users") || "[]");

model.register = function(email, password) {
    if (users.find(u => u.email === email)) return false;
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    return true;
};

model.login = function(email, password) {
    return users.some(u => u.email === email && u.password === password);
};

model.isLoggedIn = function() {
    return localStorage.getItem("loggedIn") === "true";
};

model.setLoggedIn = function(value) {
    localStorage.setItem("loggedIn", value ? "true" : "false");
};
