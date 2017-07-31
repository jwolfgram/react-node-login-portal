export const SHOW_ALERT = 'SHOW_ALERT';
export function showAlert(title, message) {
  return {
    type: SHOW_ALERT,
    payload: {
      title,
      message,
    },
  };
}

export const HIDE_ALERT = 'HIDE_ALERT';
export function hideAlert() {
  return {
    type: HIDE_ALERT,
  };
}
