import * as React from 'react';
import Modal from './Components/Modal';

interface Props {
  onClose: () => void;
}

export default class SettingsModal extends React.Component<Props, {}> {
  public render() {
    const { onClose } = this.props;

    return <Modal onClose={onClose}>Settings Modal</Modal>;
  }
}
