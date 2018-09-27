import * as React from 'react';
import glamorous from 'glamorous';
import axios from 'axios';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { ascetic } from 'react-syntax-highlighter/styles/hljs';
import Button from './Components/Button';
import SettingsModal from './SettingsModal';
import HeadersModal from './HeadersModal';
import { connect } from 'react-redux';
import { StoreState } from './store';
import { Header } from './interfaces';

const InputWrapper = glamorous.div();

const Input = glamorous.input({
  width: '100%',
  padding: '20px 18px',
  border: 0,
  borderBottom: '1px solid #eee',
  outline: 'none',
});

const JsonWrapper = glamorous.div(
  {
    position: 'relative',
    height: 'auto',
    flex: 1,
    '& pre': {
      fontFamily: 'Source Code Pro',
      lineHeight: 1.8,
      fontSize: '12px',
      margin: 0,
    },
  },
  (props: any) => ({
    overflow: props.loading ? 'hidden' : 'scroll',
  })
);

const Wrapper = glamorous.div({
  position: 'relative',
  height: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const Loading = glamorous.div({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(255, 255, 255, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const ResponseWrapper = glamorous.div({
  position: 'relative',
  flex: 1,
  overflow: 'scroll',
});

const ActionsWrapper = glamorous.div({
  display: 'flex',
});

const SettingsButton = glamorous(Button)({
  background: '#333',
  flex: 1,
});

const MethodButton = glamorous(SettingsButton)({
  textTransform: 'uppercase',
});

const HeadersButton = glamorous(SettingsButton)({
  background: '#000',
});

// `
// {
//   "name": "Luke Skywalker",
//   "height": "172",
//   "mass": "77",
//   "hair_color": "blond",
//   "skin_color": "fair",
//   "eye_color": "blue",
//   "birth_year": "19BBY",
//   "gender": "male",
//   "homeworld": "https://swapi.co/api/planets/1/",
//   "films": [
//     "https://swapi.co/api/films/2/",
//     "https://swapi.co/api/films/6/",
//     "https://swapi.co/api/films/3/",
//     "https://swapi.co/api/films/1/",
//     "https://swapi.co/api/films/7/"
//   ],
//   "species": [
//     "https://swapi.co/api/species/1/"
//   ],
//   "vehicles": [
//     "https://swapi.co/api/vehicles/14/",
//     "https://swapi.co/api/vehicles/30/"
//   ],
//   "starships": [
//     "https://swapi.co/api/starships/12/",
//     "https://swapi.co/api/starships/22/"
//   ],
//   "created": "2014-12-09T13:50:51.644000Z",
//   "edited": "2014-12-20T21:17:56.891000Z",
//   "url": "https://swapi.co/api/people/1/"
// }
// `;

const METHODS = ['get', 'post', 'put', 'patch', 'delete'];

interface State {
  url: string;
  body: string;
  loading: boolean;
  method: number;
  settingsModalOpen: boolean;
  headersModalOpen: boolean;
}

interface Props {
  headers: Header[];
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      url: 'https://swapi.co/api/people/1',
      body: '',
      loading: false,
      method: 0,
      settingsModalOpen: false,
      headersModalOpen: false,
    };
  }

  private onUrlChange = (e: any) => {
    this.setState({
      url: e.currentTarget.value,
    });
  };

  private submit = async () => {
    this.setState({
      loading: true,
    });

    const { method, url } = this.state;

    const headers = this.props.headers.reduce((curr, header) => {
      if (header.name !== "" && header.value !== "") {
        return (curr[header.name] = header.value);
      }

      return curr;
    }, {});

    try {
      const response = await axios({
        url,
        headers,
        method: METHODS[method],
      });

      this.setState({
        body: response.data,
      });
    } catch (e) {
      this.setState({
        body: e.response.data,
      });
    }

    this.setState({
      loading: false,
    });
  };

  private changeMethod = () => {
    const { method } = this.state;
    this.setState({
      method: method === METHODS.length - 1 ? 0 : method + 1,
    });
  };

  private openSettingsModal = () => {
    this.setState({
      settingsModalOpen: true,
    });
  };

  private closeSettingsModal = () => {
    this.setState({
      settingsModalOpen: false,
    });
  };

  private openHeadersModal = () => {
    this.setState({
      headersModalOpen: true,
    });
  };

  private closeHeadersModal = () => {
    this.setState({
      headersModalOpen: false,
    });
  };

  public render() {
    const {
      url,
      body,
      loading,
      method,
      settingsModalOpen,
      headersModalOpen,
    } = this.state;

    const { headers } = this.props;

    return (
      <Wrapper>
        {settingsModalOpen && (
          <SettingsModal onClose={this.closeSettingsModal} />
        )}
        {headersModalOpen && <HeadersModal onClose={this.closeHeadersModal} />}
        <ActionsWrapper>
          <SettingsButton onClick={this.openSettingsModal}>
            Settings
          </SettingsButton>
          <HeadersButton onClick={this.openHeadersModal}>
            Headers {headers.length === 0 ? null : `(${headers.length})`}
          </HeadersButton>
          <MethodButton onClick={this.changeMethod}>
            {METHODS[method]}
          </MethodButton>
        </ActionsWrapper>
        <InputWrapper>
          <Input value={url} onChange={this.onUrlChange} />
          <Button onClick={this.submit}>Submit</Button>
        </InputWrapper>
        <ResponseWrapper>
          {loading ? (
            <Loading>Loading...</Loading>
          ) : (
            <JsonWrapper loading={loading}>
              <SyntaxHighlighter
                language="javascript"
                style={ascetic}
                codeTagProps={{
                  style: { fontFamily: 'inherit', fontSize: 'inherit' },
                }}
              >
                {JSON.stringify(body, null, 2)}
              </SyntaxHighlighter>
            </JsonWrapper>
          )}
        </ResponseWrapper>
      </Wrapper>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return {
    headers: state.headers,
  };
}

export default connect(mapStateToProps)(App);
