export default function toggleButtonEnabledState(bttn) {
  bttn.hasAttribute('disabled')
    ? bttn.removeAttribute('disabled')
    : bttn.setAttribute('disabled', '');
}

// export { toggleButtonEnabledState };
