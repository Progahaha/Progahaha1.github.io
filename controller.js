
class Contact {
    constructor(index, row) {
        this.index = index + 1;
        this.name = row.querySelector(".table-main__data_2").innerHTML;
        this.phone = row.querySelector(".table-main__data_3").innerHTML;
    }
}

export const controller = {
    contacts: [],
    currentContacts: 0,
    contactsArray: [],
    selectedContacts: new Set(),
    contactsTable: null,

    searchInput: null,

    addContactBtn: null,
    addModal: null,
    exitAddModal: null,
    nameAddModal: null,
    phoneAddModal: null,
    buttonAddModal: null,
    errorMessage: null,

    deleteContactBtn: null,

    editContactBtn: null,
    editModal: null,
    exitEditModal: null,
    nameEditModal: null,
    phoneEditModal: null,
    buttonEditModal: null,
    editErrorMessage: null,

    handleRowClick: (e) => {
        const row = e.currentTarget;
        const rowId = row.getAttribute("data-id");

        if (controller.selectedContacts.has(rowId)) {
            controller.selectedContacts.delete(rowId);
            row.classList.remove("selected");
        } else {
            controller.selectedContacts.add(rowId);
            row.classList.add("selected");
        }

        controller.editContactBtn.disabled = controller.selectedContacts.size !== 1;
        controller.editContactBtn.classList.toggle("button-disabled", controller.selectedContacts.size !== 1);

        controller.deleteContactBtn.disabled = controller.selectedContacts.size === 0;
        controller.deleteContactBtn.classList.toggle("button-disabled", controller.selectedContacts.size === 0);
    },

    getContacts() {
        const rows = document.querySelectorAll(".table-main tbody tr");
        this.contacts = Array.from(rows);
        this.currentContacts = this.contacts.length;
        this.contactsArray = [];
        this.contacts.forEach((row, i) => {
            row.setAttribute("data-id", i + 1);
            row.removeEventListener("click", controller.handleRowClick);
            row.addEventListener("click", controller.handleRowClick);
            this.contactsArray.push(new Contact(i, row));
        });
    },

    init() {
        this.contactsTable = document.querySelector(".table-main");
        this.searchInput = document.querySelector(".search-container input");

        this.addContactBtn = document.querySelector(".button-add");
        this.addModal = document.querySelector(".add-modal");
        this.exitAddModal = document.querySelector(".add-modal__close");
        this.nameAddModal = document.querySelector(".add-modal__name");
        this.phoneAddModal = document.querySelector(".add-modal__phone");
        this.buttonAddModal = document.querySelector(".add-modal__button");
        this.errorMessage = document.querySelector("#addErrorMessage");

        this.deleteContactBtn = document.querySelector(".button-delete");
        this.deleteContactBtn.classList.add("button-disabled");
        this.deleteContactBtn.disabled = true;

        this.editContactBtn = document.querySelector(".button-edit");
        this.editModal = document.querySelector(".edit-modal");
        this.exitEditModal = document.querySelector(".edit-modal__close");
        this.nameEditModal = document.querySelector(".edit-modal__name");
        this.phoneEditModal = document.querySelector(".edit-modal__phone");
        this.buttonEditModal = document.querySelector(".edit-modal__button");
        this.editErrorMessage = document.querySelector("#editErrorMessage");
        this.editContactBtn.classList.add("button-disabled");
        this.editContactBtn.disabled = true;

        this.getContacts();
    }
};



export function handleLogin(email, password) {
    if (model.login(email, password)) {
        model.setLoggedIn(true);
        window.location.href = "index.html";
    } else {
        view.showError("Невірна пошта або пароль");
    }
}

export function handleRegister(email, password, confirm) {
    if (password !== confirm) {
        view.showError("Паролі не співпадають");
        return;
    }
    if (!model.register(email, password)) {
        view.showError("Користувач вже існує");
    } else {
        window.location.href = "signin.html";
    }
}
