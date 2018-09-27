import * as React from 'react';
import Modal from './Components/Modal';
import Heading from './Components/Heading';
import FormGroup from './Components/FormGroup';
import Label from './Components/Label';
import Input from './Components/Input';
import TextButton from './Components/TextButton';
import glamorous from 'glamorous';
import { Header } from './interfaces';
import { connect } from 'react-redux';
import { StoreState } from './store';
import { Dispatch } from 'redux';
import { addHeader, removeHeader, setHeader } from './actions/headers';

interface Props {
  onClose: () => void;
  headers: Header[];
  onAddHeader: () => void;
  onRemoveHeader: (index: number) => void;
  onSetHeader: (index: number, header: Header) => void;
}

const ActionWrapper = glamorous.div({
  display: 'flex',
  justifyContent: 'center',
});

const RemoveHeaderColumn = glamorous.div({
  width: '50px',
  textAlign: 'center',
  cursor: 'pointer',
});

class HeadersModal extends React.Component<Props, {}> {
  public render() {
    const { onClose, headers, onSetHeader, onRemoveHeader, onAddHeader } = this.props;

    return (
      <Modal onClose={onClose}>
        <Heading>Headers</Heading>

        {headers.map((header, i) => (
          <FormGroup inline={true} key={i}>
            <FormGroup child={true}>
              <Label>Header</Label>
              <Input
                value={header.name}
                onChange={e => onSetHeader(i, { ...header, name: e.currentTarget.value })}
              />
            </FormGroup>
            <FormGroup child={true}>
              <Label>Value</Label>
              <Input
                value={header.value}
                onChange={e => onSetHeader(i, { ...header, value: e.currentTarget.value })}
              />
            </FormGroup>
            <RemoveHeaderColumn onClick={() => onRemoveHeader(i)}>
              X
            </RemoveHeaderColumn>
          </FormGroup>
        ))}

        <ActionWrapper>
          <TextButton onClick={onAddHeader}>+ Add Header</TextButton>
        </ActionWrapper>
      </Modal>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return {
    headers: state.headers,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onAddHeader: () => dispatch(addHeader()),
    onRemoveHeader: (index: number) => dispatch(removeHeader(index)),
    onSetHeader: (index: number, header: Header) => dispatch(setHeader(index, header)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeadersModal);
