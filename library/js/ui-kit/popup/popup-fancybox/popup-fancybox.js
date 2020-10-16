import { PopupFancybox, defaultOptions } from './popup-fancybox.class';

$(document).ready(() => {
  $('[data-ui-kit--popup-open-button]').on('click', (ev) => {
    ev.preventDefault();

    const $popupOpenButton = $(ev.currentTarget);
    const popupName = $popupOpenButton.data('ui-kit--popup-open-button');
    const options = $popupOpenButton.data('ui-kit--popup-open-options');
    const $popup = $(`[data-ui-kit--popup-name=${popupName}]`);

    const popup = new PopupFancybox(
      $popup,
      { ...defaultOptions, ...options },
    );

    popup.open();
  });
});
