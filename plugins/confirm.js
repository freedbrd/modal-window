$.confirm = (options) => {
  return new Promise((resolve, reject) => {
    const modal = $.modal({
      title: options.title,
      width: '400px',
      content: options.content,
      closable: false,
      onClose() {
        modal.destroy();
      },
      footerButtons: [
        {
          text: 'Confirm',
          type: 'danger',
          handler() {
            resolve()
            modal.close();
          }
        },
        {
          text: 'Cancel',
          type: 'secondary',
          handler() {
            reject();
            modal.close();
          }
        }
      ]
    })

    setTimeout(modal.open, 0)
  })
}
