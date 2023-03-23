const { useEffect, useState } = React;
const { Tabs, Button } = antd;
const { CaretRightOutlined, ClearOutlined } = icons;
const { TabPane } = Tabs;
var runIframe = null,
  runIframeHeight = 0,
  innerStyle = '';
const App = (props) => {
  const [editor, setEditor] = useState();
  const [data, setData] = useState();
  const [activeKey, setActiveKey] = useState("js");
  const [runContainer, setRunContainer] = useState();
  useEffect(() => {
    const domContainer = document.querySelector("#app-runner");
    window.root = ReactDOM.createRoot(domContainer);
    const value = [
      `const { Button } = antd;`,
      `const { CaretRightOutlined } = icons;`,
      `const Index = () => {`,
      `  return <div>`,
      `    <Button type='primary' icon={<CaretRightOutlined />}>click</Button>`,
      `  </div>`,
      `}`,
      ``,
    ].join("\n");
    let data = {
      js: {
        model: null,
        state: null,
      },
      css: {
        model: null,
        state: null,
      },
      html: {
        model: null,
        state: null,
      },
    };
    const jsCache = window.localStorage.getItem('jsCache')
    const cssCache = window.localStorage.getItem('cssCache')
    require.config({ paths: { vs: "https://cdn.bootcdn.net/ajax/libs/monaco-editor/0.34.0/min/vs" } });
    data.js.model = monaco.editor.createModel(jsCache || value, "javascript");
    data.css.model = monaco.editor.createModel(cssCache || "", "css");
    data.html.model = monaco.editor.createModel("", "html");
    setData(data);
    setEditor(
      monaco.editor.create(document.getElementById("code-container"), {
        model: data.js.model,
        automaticLayout: true,
      })
    );
  }, []);
  const tabsOnChange = (val) => {
    setData({
      ...data,
      [activeKey]: {
        ...data[activeKey],
        state: editor.saveViewState(),
      },
    });
    setActiveKey(val);
    editor.setModel(data[val].model);
    editor.restoreViewState(data[val].state);
    editor.focus();
  };
  const run = () => {
    const load = function (js, html, css) {
      if (css) {
        window.localStorage.setItem('cssCache', css)
        var style = document.createElement("style");
        // style.type = "text/css";
        style.innerHTML = css;
        innerStyle.remove&&innerStyle.remove()
        innerStyle = style
        document.body.appendChild(style);
      }
      if (html) {
        // document.body.innerHTML += html;
      }
      if (js) {
        window.localStorage.setItem('jsCache', js)
        js = `${js}
        window.root.render(<Index />);`;
        try {
          eval(Babel.transform(js, { presets: ["es2015", "react"] }).code);
        } catch (err) {
          console.log(err);
          var pre = document.createElement("pre");
          pre.appendChild(document.createTextNode(err));
          document.body.insertBefore(pre, document.body.firstChild);
        }
      }
    };
    var getLang = function (lang) {
      return data[lang].model.getValue();
    };
    load(getLang("js"), getLang("html"), getLang("css"));
  };
  const clearCache = () => {
    window.localStorage.removeItem('jsCache')
    window.localStorage.removeItem('cssCache')

  }
  return (
    <div className="header-choose">
      <Tabs
        defaultActiveKey="1"
        style={{ paddingLeft: 16 }}
        onChange={tabsOnChange}
      >
        <TabPane tab="jsx" key="js"></TabPane>
        <TabPane tab="css" key="css"></TabPane>
        <TabPane tab="html" key="html"></TabPane>
      </Tabs>
      <div>
        <Button icon={<ClearOutlined />} onClick={clearCache} style={{marginRight: 4}}>
          clear
        </Button>
        <Button type="primary" icon={<CaretRightOutlined />} onClick={run}>
          Run
        </Button>
      </div>
    </div>
  );
};

window.onload = () => {
  const domContainer = document.querySelector("#app-editor");
  const root = ReactDOM.createRoot(domContainer);
  root.render(<App />);
};
