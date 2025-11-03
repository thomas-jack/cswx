self.addEventListener('message', (event) => {
  const { type, payload, id } = event.data;

  try {
    let result;

    switch (type) {
      case 'reverse':
        result = payload.text.split('').reverse().join('');
        break;

      case 'uppercase':
        result = payload.text.toUpperCase();
        break;

      case 'lowercase':
        result = payload.text.toLowerCase();
        break;

      case 'process':
        result = processHeavyOperation(payload);
        break;

      default:
        throw new Error(`Unknown operation type: ${type}`);
    }

    self.postMessage({
      id,
      type: 'success',
      result,
    });
  } catch (error) {
    self.postMessage({
      id,
      type: 'error',
      error: error.message,
    });
  }
});

function processHeavyOperation(payload) {
  return payload.text;
}
