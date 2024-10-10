function showModal() {
  document.getElementById('operationModal').style.display = 'block';
}

function openModal(button) {
  const modal = document.getElementById("operationModal");
  const modalMessage = document.getElementById("modalMessage");
  const operationType = document.getElementById("operationType");
  const userId = document.getElementById("userId");

  modalMessage.innerText = button.getAttribute("data-message");
  operationType.value = button.getAttribute("data-operation");
  userId.value = button.getAttribute("data-userid");

  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("operationModal");
  modal.style.display = "none";
}

function confirmDelete(username, userId) {
  document.getElementById('modalMessage').innerText = 'Czy na pewno chcesz usunąć użytkownika ' + username + '?';
  document.getElementById('operationForm').action = '/account/admin/delete-user/' + userId + '/';
  document.getElementById('operationType').value = 'delete';
  document.getElementById('userId').value = userId;
  showModal();
}

function confirmChangePermissions(button) {
  const userId = button.getAttribute("data-userid");
  document.getElementById('modalMessage').innerText = button.getAttribute("data-message");
  document.getElementById('operationForm').action = '/account/admin/change-user-permissions/'+ userId +'/';
  document.getElementById('operationType').value = 'change_permissions';
  document.getElementById('userId').value = userId;

  showModal();
}

document.addEventListener('DOMContentLoaded', function () {
  const deleteButtons = document.querySelectorAll('.delete-button');
  deleteButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const username = this.getAttribute('data-username');
      const userId = this.getAttribute('data-userid');
      confirmDelete(username, userId);
    });
  });

  const changePermissionButtons = document.querySelectorAll('.set-admin-user-button, .set-user-admin-button');
  changePermissionButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      confirmChangePermissions(this);
    });
  });
});

