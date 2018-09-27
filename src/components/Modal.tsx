import * as React from 'react';
import glamorous from 'glamorous';

const Wrapper = glamorous.div({
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  background: 'white',
  zIndex: 9999,
});

const Header = glamorous.div({
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '15px',
  borderBottom: '1px solid black',
  marginBottom: '15px',
});

const CloseButton = glamorous.span({
  cursor: 'pointer',
});

const Content = glamorous.div({
  padding: '15px',
});

interface Props {
  onClose: () => void;
}

export default class Modal extends React.Component<Props, {}> {
  public render() {
    const { onClose, children } = this.props;

    return (
      <Wrapper>
        <Header>
          <CloseButton onClick={onClose}>X</CloseButton>
        </Header>
        <Content>{children}</Content>
      </Wrapper>
    );
  }
}
