
import { controller } from "./controller.js";

export const view = {
    addContact(name, phone) {
        const newId = controller.currentContacts + 1;
        const newContact = document.createElement("tr");
        newContact.setAttribute("data-id", newId);
        newContact.innerHTML = `
            <td class="table-main__data_1">${newId}</td>
            <td class="table-main__data_2">${name}</td>
            <td class="table-main__data_3">${phone}</td>
        `;
        const tbody = controller.contactsTable.querySelector("tbody");
        tbody.appendChild(newContact);
        newContact.addEventListener("click", controller.handleRowClick); // одразу підвʼязати
        controller.getContacts(); // оновити список
    },

    closeAddModal() {
        controller.addModal.classList.remove("add-modal_active");
    },

    openAddModal() {
        controller.addModal.classList.add("add-modal_active");
    },

    clearAddModal() {
        controller.nameAddModal.value = "";
        controller.phoneAddModal.value = "";
        controller.errorMessage.innerHTML = "";
    },

    updateTable() {
        controller.contacts.forEach((row, i) => {
            row.querySelector(".table-main__data_1").innerHTML = i + 1;
            row.setAttribute("data-id", i + 1);
        });
        controller.getContacts();
    },

    deleteContact(id) {
        const row = controller.contactsTable.querySelector(`tr[data-id="${id}"]`);
        if (row) {
            row.remove();
            controller.currentContacts--;
            this.updateTable();
        }
    },

    closeEditModal() {
        controller.editModal.classList.remove("edit-modal_active");
    },

    openEditModal() {
        controller.editModal.classList.add("edit-modal_active");
    },

    clearEditModal() {
        controller.nameEditModal.value = "";
        controller.phoneEditModal.value = "";
        controller.editErrorMessage.innerHTML = "";
    },

    editContact(name, phone) {
        const selectedContactId = Array.from(controller.selectedContacts)[0];
        const row = controller.contactsTable.querySelector(`tr[data-id="${selectedContactId}"]`);
        if (row) {
            if (name !== "") {
                row.querySelector(".table-main__data_2").innerHTML = name;
            }
            if (phone !== "") {
                row.querySelector(".table-main__data_3").innerHTML = phone;
            }
            controller.getContacts();
        }
    },

    filterTable(searchTerm) {
        searchTerm = searchTerm.toLowerCase();
        controller.contacts.forEach((row) => {
            const name = row.querySelector(".table-main__data_2").textContent.toLowerCase();
            const phone = row.querySelector(".table-main__data_3").textContent.toLowerCase();
            const match = name.includes(searchTerm) || phone.includes(searchTerm);
            row.style.display = match ? "" : "none";
        });
    }
};


// === AUTH VIEW ===
export function showError(msg) {
    const el = document.querySelector(".error-message");
    if (el) el.textContent = msg;
}

export function bindLoginForm(handler) {
    const form = document.querySelector("form");
    if (form && form.classList.contains("login-form")) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.querySelector("#email").value.trim();
            const password = document.querySelector("#password").value.trim();
            handler(email, password);
        });
    }
}

export function bindRegisterForm(handler) {
    const form = document.querySelector("form");
    if (form && form.classList.contains("register-form")) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.querySelector("#email").value.trim();
            const password = document.querySelector("#password").value.trim();
            const confirm = document.querySelector("#confirm-password").value.trim();
            handler(email, password, confirm);
        });
    }
}
