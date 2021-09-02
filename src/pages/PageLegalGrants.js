import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Container, Segment } from 'semantic-ui-react';
import Page from '../components/Page';
import MarkdownView from '../components/MarkdownView';
import MdText from '../markdowns/grants';



class PageLegalGrants extends React.Component {
  render() {
    return (
      <Page
        title='Grant Program Terms - CosmoMasks'
      >
        <Segment as='section' vertical basic>
          <Container>
            <MarkdownView
              children={MdText}
            />
          </Container>
        </Segment>
      </Page>
    );
  }
}

export default hot(module)(PageLegalGrants);
