
import { controller } from "./controller.js";
import { view } from "./view.js";
import { model } from "./model.js";

window.addEventListener("DOMContentLoaded", () => {
    controller.init();

    // Пошук
    controller.searchInput.addEventListener("input", (e) => {
        const value = e.target.value.trim().toLowerCase();
        view.filterTable(value);
    });

    // Додавання контакту
    controller.addContactBtn.addEventListener("click", () => {
        view.openAddModal();
    });

    controller.exitAddModal.addEventListener("click", () => {
        view.clearAddModal();
        view.closeAddModal();
    });

    controller.buttonAddModal.addEventListener("click", (e) => {
        e.preventDefault();
        const name = controller.nameAddModal.value.trim();
        const phone = controller.phoneAddModal.value.trim();

        if (!model.validatePhone(phone) && name.length === 0) {
            controller.errorMessage.innerHTML = "Некоректний формат імені та номеру";
        } else if (!model.validatePhone(phone)) {
            controller.errorMessage.innerHTML = "Некоректний формат номеру (наприклад, +380501234567)";
        } else if (name.length === 0) {
            controller.errorMessage.innerHTML = "Некоректний формат імені";
        } else {
            view.addContact(name, phone);
            view.clearAddModal();
            view.closeAddModal();
        }
    });

    // Видалення контактів
    controller.deleteContactBtn.addEventListener("click", () => {
        if (controller.selectedContacts.size > 0) {
            Array.from(controller.selectedContacts).forEach((id) => {
                view.deleteContact(id);
            });
            controller.selectedContacts.clear();
            controller.getContacts();
            controller.deleteContactBtn.classList.add("button-disabled");
            controller.deleteContactBtn.disabled = true;
            controller.editContactBtn.classList.add("button-disabled");
            controller.editContactBtn.disabled = true;
        }
    });

    // Редагування
    controller.editContactBtn.addEventListener("click", () => {
        if (controller.selectedContacts.size === 1) {
            view.openEditModal();
        }
    });

    controller.exitEditModal.addEventListener("click", () => {
        view.clearEditModal();
        view.closeEditModal();
    });

    controller.buttonEditModal.addEventListener("click", (e) => {
        e.preventDefault();
        const name = controller.nameEditModal.value.trim();
        const phone = controller.phoneEditModal.value.trim();

        if (name === "" && phone === "") {
            controller.editErrorMessage.innerHTML = "Введіть хоча б одне поле для редагування";
        } else if (phone !== "" && !model.validatePhone(phone)) {
            controller.editErrorMessage.innerHTML = "Некоректний формат номеру";
        } else {
            view.editContact(name, phone);
            view.clearEditModal();
            view.closeEditModal();
            controller.selectedContacts.clear();
            controller.getContacts();
            controller.editContactBtn.disabled = true;
            controller.editContactBtn.classList.add("button-disabled");
            controller.deleteContactBtn.disabled = true;
            controller.deleteContactBtn.classList.add("button-disabled");
        }
    });
});


import { bindLoginForm, bindRegisterForm } from "./view.js";
import { handleLogin, handleRegister } from "./controller.js";

document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;

    if (path.includes("signin.html")) {
        bindLoginForm(handleLogin);
    } else if (path.includes("signup.html")) {
        bindRegisterForm(handleRegister);
    } else if (path.includes("index.html")) {
        if (!model.isLoggedIn()) {
            window.location.href = "signin.html";
        }
    }
});
