import glamorous from "glamorous";

const Button = glamorous.button({
  width: '100%',
  padding: '10px 9px',
  border: 0,
  background: '#000',
  color: 'white',
  outline: 'none',
  cursor: 'pointer',

  ':active': {
    background: 'rgba(0, 0, 0, 0.8)',
  },
});

export default Button;
