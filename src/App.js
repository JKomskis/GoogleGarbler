import React, { Component } from 'react';
import './App.css';
var request = require('request');
var languages=["en","es","de","zh-CN"];
var translatedText="test";
var inputText;
var outputText;
var ISOLang = new Map([
  ["af", "Afrikaans"],["ga", "Irish"],["sq", "Albanian"],["it", "Italian"],["ar", "Arabic"],["ja", "Japanese"],["az", "Azerbaijani"],["kn", "Kannada"],["eu", "Basque"],["ko", "Korean"],["bn", "Bengali"],["la", "Latin"],["be", "Belarusian"],["lv", "Latvian"],["bg", "Bulgarian"],["lt", "Lithuanian"],["ca", "Catalan"],["mk", "Macedonian"],["zh-CN", "Chinese Simplified"],["ms", "Malay"],["zh-TW", "Chinese Traditional"],["mt", "Maltese"],["hr", "Croatian"],["no", "Norwegian"],["cs", "Czech"],["fa", "Persian"],["da", "Danish"],["pl", "Polish"],["nl", "Dutch"],["pt", "Portuguese"],["en", "English"],["ro", "Romanian"],["eo", "Esperanto"],["ru", "Russian"],["et", "Estonian"],["sr", "Serbian"],["tl", "Filipino"],["sk", "Slovak"],["fi", "Finnish"],["sl", "Slovenian"],["fr", "French"],["es", "Spanish"],["gl", "Galician"],["sw", "Swahili"],["ka", "Georgian"],["sv", "Swedish"],["de", "German"],["ta", "Tamil"],["el", "Greek"],["te", "Telugu"],["gu", "Gujarati"],["th", "Thai"],["ht", "Haitian Creole"],["tr", "Turkish"],["iw", "Hebrew"],["uk", "Ukrainian"],["hi", "Hindi"],["ur", "Urdu"],["hu", "Hungarian"],["vi", "Vietnamese"],["is", "Icelandic"],["cy", "Welsh"],["id", "Indonesian"],["yi", "Yiddish"]
]);

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Google Garbler</h2>
        </div>
        <div className="App-intro">
          <InputText/>
        </div>
        <div>
          Language Selection Here
          <LangList />
        </div>
        <div>
          <button onClick={TranslateHandler}>Translate</button>
        </div>
        <div>
          <OutputText/>
        </div>
      </div>
    );
  }
}

class InputText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {inputValue: ''};

    this.handleChange = this.handleChange.bind(this);
    inputText=this;
  }

  handleChange(event) {
    this.setState({inputValue: event.target.value});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <textarea value={this.state.inputValue} onChange={this.handleChange} className="textArea" rows="5"/>
      </form>
    );
  }
}

class OutputText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {outputValue: ''};

    this.handleChange = this.handleChange.bind(this);
    outputText=this;
  }

  handleChange(event) {
    this.setState({outputValue: event.target.value});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <textarea readOnly value={this.state.outputValue} onChange={this.handleChange} className="textArea" rows="5"/>
      </form>
    );
  }
}

function LangList(props){
  var langList = languages.map((language,index)=>{
    return <p className="langbox" key={index}>{ISOToLang(language)}</p>;
    }
  );
  return(
    <div id="langlist">{langList}</div>
  );
}

function ISOToLang(iso){
  return ISOLang.get(iso);
}

function TranslateHandler(props){
  var loop = function(i){
    return new Promise((resolve,reject)=>{
      //console.log(i + " " + props.sourceText + " " + props.sourceLang + " " + props.targetLang);
      resolve(Translate(props));
    }).then(translatedText=>{
      if(i===languages.length-2){
        return new Promise((resolve,reject)=>{resolve(translatedText);});
      }
      i++;
      props = {sourceLang:languages[i], targetLang:languages[i+1], sourceText:translatedText};
      return loop(i);
    })
  }

  var sourceText = inputText.state.inputValue;
  var i = 0;
  props = {sourceLang:languages[i], targetLang:languages[i+1], sourceText:sourceText};
  loop(i).then(translatedText=>{
    outputText.setState({outputValue:translatedText});
  })
}

function Translate(props){
  var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="
            + props.sourceLang + "&tl=" + props.targetLang + "&dt=t&q=" + encodeURI(props.sourceText);
  return new Promise((resolve, reject)=>{
    request(url, (error,response,body)=>{
      if (!error && response.statusCode === 200)
        resolve(body);
      else
        reject(error);
    })
  }).then(body=>{
    var i = 0;
    while(i<body.length){
      if(body.charAt(i)===','&&body.charAt(i+1)===','){
        body=body.slice(0,i+1)+body.slice(i+2);
        i--;
      }
      i++;
    }
    var result=JSON.parse(body);
    var translatedText = result[0][0][0];
    return new Promise((resolve,reject)=>{
      resolve(translatedText);
    })
  })
}

export default App;
