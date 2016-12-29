import React, { Component } from 'react';
import './App.css';
import {FormControl,Grid,Col,Glyphicon,Button,ButtonGroup,Jumbotron,Panel,Breadcrumb} from 'react-bootstrap';
import {Header} from './header.js';
var request = require('request');
var async = require('async');
var langlistInstance;
var translateButtonInstance;
var inputText;
var outputText;
var ISOLang = new Map([
  ["af", "Afrikaans"],["ga", "Irish"],["sq", "Albanian"],["it", "Italian"],["ar", "Arabic"],["ja", "Japanese"],["az", "Azerbaijani"],["kn", "Kannada"],["eu", "Basque"],["ko", "Korean"],["bn", "Bengali"],["la", "Latin"],["be", "Belarusian"],["lv", "Latvian"],["bg", "Bulgarian"],["lt", "Lithuanian"],["ca", "Catalan"],["mk", "Macedonian"],["zh-CN", "Chinese Simplified"],["ms", "Malay"],["zh-TW", "Chinese Traditional"],["mt", "Maltese"],["hr", "Croatian"],["no", "Norwegian"],["cs", "Czech"],["fa", "Persian"],["da", "Danish"],["pl", "Polish"],["nl", "Dutch"],["pt", "Portuguese"],["en", "English"],["ro", "Romanian"],["eo", "Esperanto"],["ru", "Russian"],["et", "Estonian"],["sr", "Serbian"],["tl", "Filipino"],["sk", "Slovak"],["fi", "Finnish"],["sl", "Slovenian"],["fr", "French"],["es", "Spanish"],["gl", "Galician"],["sw", "Swahili"],["ka", "Georgian"],["sv", "Swedish"],["de", "German"],["ta", "Tamil"],["el", "Greek"],["te", "Telugu"],["gu", "Gujarati"],["th", "Thai"],["ht", "Haitian Creole"],["tr", "Turkish"],["iw", "Hebrew"],["uk", "Ukrainian"],["hi", "Hindi"],["ur", "Urdu"],["hu", "Hungarian"],["vi", "Vietnamese"],["is", "Icelandic"],["cy", "Welsh"],["id", "Indonesian"],["yi", "Yiddish"]
]);

class App extends Component {
  render() {
    return (
      <Grid className="App">
      <Header/>
        <row>
          <Jumbotron className="intro">
          <h2><strong>Google Garbler</strong></h2>
          <p>Google Garbler uses the Google Translate API to pass text through multiple languages at a time. Simply enter text in the "input text" box, adjust the translation path as desired,
          and click "Translate".</p>
          </Jumbotron>
        </row>
        <row>
          <Col xs={12}>
            <h4><strong>Translation Path:</strong></h4>
          </Col>
        </row>
        <row>
          <Col id="langlist" xs={11}>
            <LangList/>
          </Col>
          <Col xs={1}>
            <AddLangBoxButton/>
          </Col>
        </row>
        <row>
          <Col xs={12}>
            <TranslateButton/>
          </Col>
        </row>
        <hr className="hr"/>
        <row>
          <Col xs={12} sm={6} className="textBox">
            <p>Input Text:</p>
            <InputText/>
          </Col>
          <Col xs={12} sm={6} className="textBox">
            <p>Output Text:</p>
            <OutputText/>
          </Col>
        </row>
        <row>
          <Col xs={12}>
            <Breadcrumb className="footer">
              <Breadcrumb.Item href="https://jkomskis.github.io/">Home</Breadcrumb.Item>
              <Breadcrumb.Item>Web Projects</Breadcrumb.Item>
              <Breadcrumb.Item active>GoogleGarbler</Breadcrumb.Item>
              <a href="https://github.com/JKomskis/GoogleGarbler" id="sourceCode">Github Repo</a>
            </Breadcrumb>
          </Col>
        </row>
      </Grid>
    );
  }
}

class TranslateButton extends React.Component {
  constructor(props){
    super(props);
    this.state={isLoading:false};
    translateButtonInstance=this;
  }
  handleClick(){
    this.setState({isLoading:true});
    TranslateHandler();
  }
  render(){
    return(
      <Button style={{margin:"1%"}} bsStyle="primary" bsSize="large" disabled={this.state.isLoading} onClick={this.state.isLoading ? null : this.handleClick.bind(this)}>{this.state.isLoading ? "Translating..." : "Translate"}</Button>
    )
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
        <FormControl componentClass="textarea" style={{height:(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)/2}} value={this.state.inputValue} onChange={this.handleChange} className="textArea"/>
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
        <FormControl componentClass="textarea" style={{height:(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)/2}} readOnly value={this.state.outputValue} onChange={this.handleChange} className="textArea" rows="5"/>
      </form>
    );
  }
}

function CalculateRows(text){

}

class LangList extends React.Component {
  constructor(props){
    super(props);
    this.state={langlist:["en"]};
    langlistInstance=this;
  }

  render() {
    var langboxes=[];
    for(var i=0; i<this.state.langlist.length;i++){
      langboxes.push(<LangBox language={this.state.langlist[i]} index={i} />);
    }
    return(
      <div>{langboxes}</div>
    );
  }
}

class LangBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleMoveRight = this.handleMoveRight.bind(this);
    this.handleMoveLeft = this.handleMoveLeft.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange(event){
    langlistInstance.setState(
      Object.assign({},langlistInstance.state,{langlist:langlistInstance.state.langlist.slice(0,this.props.index)
      .concat(event.target.value)
      .concat(langlistInstance.state.langlist.slice(this.props.index+1))})
      );
  }
  handleMoveLeft(){
    langlistInstance.setState(
      Object.assign({},langlistInstance.state,{langlist:langlistInstance.state.langlist.slice(0,this.props.index-1)
      .concat(langlistInstance.state.langlist[this.props.index])
      .concat(langlistInstance.state.langlist[this.props.index-1])
      .concat(langlistInstance.state.langlist.slice(this.props.index+1))})
      );
  }
  handleMoveRight(){
    langlistInstance.setState(
      Object.assign({},langlistInstance.state,{langlist:langlistInstance.state.langlist.slice(0,this.props.index)
      .concat(langlistInstance.state.langlist[this.props.index+1])
      .concat(langlistInstance.state.langlist[this.props.index])
      .concat(langlistInstance.state.langlist.slice(this.props.index+2))})
      );
  }
  handleDelete(){
    langlistInstance.setState(
      Object.assign({},langlistInstance.state,{langlist:langlistInstance.state.langlist.slice(0,this.props.index)
      .concat(langlistInstance.state.langlist.slice(this.props.index+1))})
      );
  }

  render() {
    return(
      <Col xs={2} style={{padding:'1%'}}>
        <FormControl id={"LangBox"+this.props.index} className="LangBox" componentClass="select" value={this.props.language} onChange={this.handleChange.bind(this)}>
        <option value="af">Afrikaans</option><option value="sq">Albanian</option><option value="ar">Arabic</option><option value="az">Azerbaijani</option><option value="eu">Basque</option><option value="bn">Bengali</option><option value="be">Belarusian</option><option value="bg">Bulgarian</option><option value="ca">Catalan</option><option value="zh-CN">Chinese Simplified</option><option value="zh-TW">Chinese Traditional</option><option value="hr">Croatian</option><option value="cs">Czech</option><option value="da">Danish</option><option value="nl">Dutch</option><option value="en">English</option><option value="eo">Esperanto</option><option value="et">Estonian</option><option value="tl">Filipino</option><option value="fi">Finnish</option><option value="fr">French</option><option value="gl">Galician</option><option value="ka">Georgian</option><option value="de">German</option><option value="el">Greek</option><option value="gu">Gujarati</option><option value="ht">Haitian Creole</option><option value="iw">Hebrew</option><option value="hi">Hindi</option><option value="hu">Hungarian</option><option value="is">Icelandic</option><option value="">Indonesian</option><option value="ga">Irish</option><option value="it">Italian</option><option value="ja">Japanese</option><option value="kn">Kannada</option><option value="ko">Korean</option><option value="la">Latin</option><option value="lv">Latvian</option><option value="lt">Lithuanian</option><option value="mk">Macedonian</option><option value="ms">Malay</option><option value="mt">Maltese</option><option value="no">Norwegian</option><option value="fa">Persian</option><option value="pl">Polish</option><option value="pt">Portuguese</option><option value="ro">Romanian</option><option value="ru">Russian</option><option value="sr">Serbian</option><option value="sk">Slovak</option><option value="sl">Slovenian</option><option value="es">Spanish</option><option value="sw">Swahili</option><option value="sv">Swedish</option><option value="ta">Tamil</option><option value="te">Telugu</option><option value="th">Thai</option><option value="tr">Turkish</option><option value="uk">Ukrainian</option><option value="ur">Urdu</option><option value="vi">Vietnamese</option><option value="cy">Welsh</option><option value="yi">Yiddish</option>
        </FormControl>
        <ButtonGroup>
          <Button onClick={this.handleMoveLeft} disabled={this.props.index===0}><Glyphicon glyph="chevron-left" /></Button>
          <Button onClick={this.handleMoveRight} disabled={this.props.index===langlistInstance.state.langlist.length-1}><Glyphicon glyph="chevron-right" /></Button>
          <Button onClick={this.handleDelete} disabled={langlistInstance.state.langlist.length===1}><Glyphicon glyph="remove" /></Button>
        </ButtonGroup>
      </Col>
    );
  }
}

class AddLangBoxButton extends React.Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    langlistInstance.setState(prevState=>({
      langlist: [...prevState.langlist, prevState.langlist[0]]
    }));
  }

  render(){
    return(
      <Button onClick={this.handleClick}><Glyphicon glyph="plus" /></Button>
    )
  }
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
      if(i===langlistInstance.state.langlist.length-2){
        return new Promise((resolve,reject)=>{resolve(translatedText);});
      }
      i++;
      props = {sourceLang:langlistInstance.state.langlist[i], targetLang:langlistInstance.state.langlist[i+1], sourceText:translatedText};
      return loop(i);
    })
  }

  var sourceText = inputText.state.inputValue.replace(/\./g,".\n").replace(/;/g,";\n").split("\n");
  console.log(sourceText);
  async.map(sourceText,function(item, callback){
    var i = 0;
    props = {sourceLang:langlistInstance.state.langlist[i], targetLang:langlistInstance.state.langlist[i+1], sourceText:item};
    loop(i).then((translatedText)=>callback(null,translatedText));
  }, function(err,results){
    console.log(results);
    outputText.setState({outputValue:results.join("\n").replace(/\.\n/g, ". ").replace(/;\n/g, "; ")});
    translateButtonInstance.setState({isLoading:false});
  });
  //var i = 0;
  //props = {sourceLang:langlistInstance.state.langlist[i], targetLang:langlistInstance.state.langlist[i+1], sourceText:sourceText};
  //loop(i).then(translatedText=>{
  //  outputText.setState({outputValue:translatedText});
  //})
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
