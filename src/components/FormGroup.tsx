import glamorous from 'glamorous';

interface Props {
  inline?: boolean;
  child?: boolean;
}

const FormGroup = glamorous.div(
  {
    display: 'block',
    marginBottom: '8px',
    flexDirection: 'row',
    alignItems: 'center',
  },
  (props: Props) => ({
    display: props.inline ? 'flex' : 'block',
    flex: props.child ? 1 : 0,
    ':not(:first-child)': {
        marginLeft: props.child ? '20px' : 0
    }
  })
);

export default FormGroup;
