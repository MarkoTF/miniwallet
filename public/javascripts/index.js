const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  tooltipTriggerEl.addEventListener('click', (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(tooltipTriggerEl.textContent).then(() => {
      tooltipTriggerEl.classList.remove('text-muted');
      tooltipTriggerEl.classList.add('text-success');
      setTimeout(() => {
        tooltipTriggerEl.classList.add('text-muted');
        tooltipTriggerEl.classList.remove('text-success');
      }, 1000);
    })
    .catch(err => {
      code.classList.add('text-danger');
    });
  });

  return new bootstrap.Tooltip(tooltipTriggerEl);
})

// Toast
const toastLiveExample = document.querySelector('#liveToast');
const toastLiveBody = document.querySelector('#liveToast .toast-body');
const toastLiveHeader = document.querySelector('#liveToast .toast-header');
const toastLiveTitle = document.querySelector('#liveToast strong');
const toastLiveSmall = document.querySelector('#liveToast small');
const showToast = async (message='...', title='Notificación', small='...', headerClasses='') => {
  toastLiveBody.innerHTML = message;
  toastLiveTitle.innerHTML = title;
  toastLiveSmall.innerHTML = small;
  toastLiveHeader.className = `toast-header ${headerClasses}`;
  console.log(toastLiveExample);
  const toast = new bootstrap.Toast(toastLiveExample)
  toast.show()
}

const removeKey = async (id, name) => {
  const inputPassword = document.querySelector(`#password-to-delete-${id}`)
  const keyCard = document.querySelector(`#keyCard-${id}`)

  try {
    if (!inputPassword.value) throw new Error('Error');
    const result = await fetch(`/ajax/removekey`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyId: id,
        password: inputPassword.value,
      }),
    });

    if (!result.ok) throw new Error('Error');

    const resultData = result.json();
    keyCard.remove();
    showToast(`La llave ${name} se ha eliminado con éxito`, 'Hecho',  'Hace menos de 1 minuto', 'bg-success bg-opacity-25');
  } catch(err) {
    showToast(`No se pudo eliminar la llave ${name}`, 'Error',  'Hace menos de 1 minuto', 'bg-danger bg-opacity-25');
  }
}
