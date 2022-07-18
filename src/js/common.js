export function toggleButtonEnabledState(bttn) {
  bttn.hasAttribute('disabled')
    ? bttn.removeAttribute('disabled')
    : bttn.setAttribute('disabled', '');
}

export function setButtonEnabledState(bttn, enabled = false) {
  enabled
    ? bttn.removeAttribute('disabled')
    : bttn.setAttribute('disabled', '');
}
