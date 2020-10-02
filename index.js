const modal = $.modal({
  title: 'Modal Title',
  closable: true,
  content: `
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aspernatur aut 
    beatae cupiditate deleniti dolorem, doloribus ea eaque error est et ex 
    facilis inventore laboriosam laborum maxime minima modi nemo nihil numquam odio
  `,
  width: '450px',
  footerButtons: [
    {
      text: 'Ok',
      type: 'primary',
      handler() {
        console.log('ok clicked');
      },
    },
    {
      text: 'Cancel',
      type: 'danger',
      handler() {
        modal.close();
      },
    },
  ],
});

