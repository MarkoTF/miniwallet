const copyButton = document.getElementById('copy');
const codeField = document.getElementById('code');

copyButton.addEventListener('click', (e) => {
  e.preventDefault();
  navigator.clipboard.writeText(code.value).then(() => {
    code.classList.add('text-success');
  })
  .catch(err => {
    code.classList.add('text-danger');
  });
})
