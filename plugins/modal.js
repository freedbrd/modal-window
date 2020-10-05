Element.prototype.appendAfter = function(el) {
  el.parentNode.insertBefore(this, el.nextSibling);
};

function noop() {}

function _createModalFooter(buttons = []) {
  if (!buttons.length) {
    return document.createElement('div');
  }

  const wrap = document.createElement('div');
  wrap.classList.add('modal-footer');

  buttons.forEach(button => {
    const btn = document.createElement('button');
    btn.textContent = button.text;
    btn.classList.add('btn');
    btn.classList.add(`btn-${button.type || 'secondary'}`);
    btn.onclick = button.handler || noop;

    wrap.appendChild(btn);
  });

  return wrap;
}

function _createModal(options) {
  const modal = document.createElement('div');

  modal.classList.add('vmodal');
  modal.insertAdjacentHTML('beforeend', `
    <div data-close class="modal-overlay">
      <div class="modal-window" style="width: ${options.width || '600px'}">
        <div class="modal-header">
          <span class="modal-title">${options.title || 'Modal Title'}</span>
          ${options.closable
            ? `<span data-close class="modal-close">&times;</span>`
            : ''}
        </div>
        <div class="modal-body" data-content>
          ${options.content || ''}
        </div>
      </div>
    </div>
  `);

  const footer = _createModalFooter(options.footerButtons);
  footer.appendAfter(modal.querySelector('[data-content]'));

  document.body.appendChild(modal);
  return modal;
}

$.modal = function(options) {
  const $modal = _createModal(options);
  const animationSpeed = 200;
  let closing = false;
  let destroyed = false;

  const listener = (event) => {
    if ('close' in event.target.dataset) {
      modal.close();
    }
  };

  const modal = {
    open() {
      if (closing || destroyed) return;

      $modal.classList.add('open');
    },
    close() {
      closing = true;
      $modal.classList.remove('open');
      $modal.classList.add('hide');

      setTimeout(() => {
        $modal.classList.remove('hide');
        closing = false;

        if(typeof options.onClose === 'function') {
          options.onClose();
        }
      }, animationSpeed);
    },
  };

  $modal.addEventListener('click', listener);

  return {
    ...modal,
    destroy() {
      $modal.parentNode.removeChild($modal);
      $modal.removeEventListener('click', listener);
      destroyed = true;
    },

    setContent(html) {
      $modal.querySelector('[data-content]').innerHTML = html;
    },
  };
};
