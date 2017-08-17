export function blocks_filter(text) {
  return {
    type: 'BLOCKS_FILTER',
    payload: {
      text,
    },
  };
}
