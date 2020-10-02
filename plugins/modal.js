function _createModal(options) {
  const modal = document.createElement('div');
  modal.classList.add('vmodal');
  modal.insertAdjacentHTML('beforeend', `
    <div data-close class="modal-overlay">
      <div class="modal-window" style="width: ${options.width || '600px'}">
        <div class="modal-header">
          <span class="modal-title">${options.title || 'Modal Title'}</span>
          ${options.closable ? `<span data-close class="modal-close">&times;</span>` : ''}
        </div>
        <div class="modal-body">
          ${options.content || ''}
        </div>
        <div class="modal-footer">
          <button>ok</button>
          <button>cancel</button>
        </div>
      </div>
    </div>
  `);

  document.body.appendChild(modal);
  return modal;
}

$.modal = function(options) {
  const $modal = _createModal(options);
  const animationSpeed = 200;
  let closing = false;

  const modal = {
    open() {
      if (closing) return;

      $modal.classList.add('open');
    },
    close() {
      closing = true;
      $modal.classList.remove('open');
      $modal.classList.add('hide');

      setTimeout(() => {
        $modal.classList.remove('hide');
        closing = false;
      }, animationSpeed);
    },
  }

  $modal.addEventListener('click', (event) => {
    if ('close' in event.target.dataset) {
      modal.close();
    }
  })

  return modal;
};
