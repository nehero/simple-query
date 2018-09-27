import * as React from 'react';
import glamorous from 'glamorous';

const fontSizes = {
  h1: '42px',
  h2: '34px',
  h3: '24px',
  h4: '18px',
};

const Wrapper = glamorous.h1({
    marginTop: 0,
}, (props: any) => ({
  fontSize: fontSizes[props.size],
}));

export default class Heading extends React.Component<any, any> {
  public static defaultProps = {
    size: 'h1',
  };

  public render() {
    return <Wrapper {...this.props}>{this.props.children}</Wrapper>;
  }
}
