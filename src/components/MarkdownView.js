import * as React from 'react';
import MarkdownView from 'react-markdown';
import gfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Tex from '@matejmazur/react-katex';
import math from 'remark-math';
import 'katex/dist/katex.min.css';



const renderers = {
  code: ({ language, value }) => {
    return <SyntaxHighlighter style={dark} language={language} children={value} />
  },
  inlineMath: ({ value }) => <Tex math={value} />,
  math: ({ value }) => <Tex block math={value} />,
}


class WrapedMarkdownView extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <MarkdownView
        plugins={[math, [gfm, { singleTilde: false }]]}
        renderers={renderers}
        allowDangerousHtml
        children={children}
      />
    );
  }
}

export default WrapedMarkdownView;