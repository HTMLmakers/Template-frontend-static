export const defaultOptions = {
  closeExisting: true,
  smallBtn: false,
  toolbar: false,
  touch: false,
};

export class PopupFancybox {
  constructor($popup, options) {
    this.$popup = $popup;
    this.$popupCloseButton = this.$popup.find('[data-ui-kit--popup-close-button]');
    this.fancybox = $.fancybox;
    this.options = options;

    this.$popupCloseButton.on('click', () => {
      this.close();
    });
  }

  open() {
    this.fancybox.open(
      this.$popup,
      { ...defaultOptions, ...this.options },
    );
  }

  close() {
    this.fancybox.close();
  }
}
