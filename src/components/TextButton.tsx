import glamorous from "glamorous";

const TextButton = glamorous.button({
  padding: '4px',
  border: 0,
  background: 'transparent',
  color: 'black',
  outline: 'none',
  cursor: 'pointer',

  ':active': {
    color: 'rgba(0, 0, 0, 0.8)',
  },

  ':hover': {
    color: 'rgba(0, 0, 0, 0.8)',
  },
});

export default TextButton;
