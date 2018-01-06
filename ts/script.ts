var ISOLang : Map<string, string> = new Map<string, string>([
  ["af", "Afrikaans"],["sq", "Albanian"],["ar", "Arabic"],["az", "Azerbaijani"],
  ["eu", "Basque"],["bn", "Bengali"],["be", "Belarusian"],["bg", "Bulgarian"],
  ["ca", "Catalan"],["zh-CN", "Chinese Simplified"],
  ["zh-TW", "Chinese Traditional"],["hr", "Croatian"],["cs", "Czech"],
  ["da", "Danish"],["nl", "Dutch"],["en", "English"],["eo", "Esperanto"],
  ["et", "Estonian"],["tl", "Filipino"],["fi", "Finnish"],["fr", "French"],
  ["gl", "Galician"],["ka", "Georgian"],["de", "German"],["el", "Greek"],
  ["gu", "Gujarati"],["ht", "Haitian Creole"],["iw", "Hebrew"],["hi", "Hindi"],
  ["hu", "Hungarian"],["is", "Icelandic"],["id", "Indonesian"],["ga", "Irish"],
  ["it", "Italian"],["ja", "Japanese"],["kn", "Kannada"],["ko", "Korean"],
  ["la", "Latin"],["lv", "Latvian"],["lt", "Lithuanian"],["mk", "Macedonian"],
  ["ms", "Malay"],["mt", "Maltese"],["no", "Norwegian"],["fa", "Persian"],
  ["pl", "Polish"],["pt", "Portuguese"],["ro", "Romanian"],["ru", "Russian"],
  ["sr", "Serbian"],["sk", "Slovak"],["sl", "Slovenian"],["es", "Spanish"],
  ["sw", "Swahili"],["sv", "Swedish"],["ta", "Tamil"],["te", "Telugu"],
  ["th", "Thai"],["tr", "Turkish"],["uk", "Ukrainian"],["ur", "Urdu"],
  ["vi", "Vietnamese"],["cy", "Welsh"],["yi", "Yiddish"]
]);

//contains the select form and buttons to move it left, move it right, and
//delete it
class LanguageBox {
  selected : string;
  element : HTMLElement;

  constructor(swapWithLeft : () => void, 
              swapWithRight : () => void,
              remove : () => void){
    //make the default language english
    this.selected = "en";
    
    //create the corresponding HTML element
    //create a div that will hold everything
    let div : HTMLDivElement = document.createElement('div');
    div.classList.add("flexDown");
    div.classList.add("column");
    div.classList.add("col-2");
    div.classList.add("col-sm-12");

    //create select box
    let select : HTMLSelectElement = document.createElement('select');
    select.classList.add("form-select");
    //add each of the language options to the select
    ISOLang.forEach( (value : string, key : string) => {
      let option = document.createElement('option');
      option.innerText = value;
      option.value = key;
      select.appendChild(option);
    });
    //set the valure of the select to the selected field
    select.value = this.selected;
    select.onchange = this.handleChange.bind(this);
    div.appendChild(select);

    //create a div to hold the three buttons
    let buttonDiv : HTMLDivElement = document.createElement('div');
    div.classList.add("flexLeft");

    //create shift left button
    let leftButton : HTMLButtonElement = document.createElement('button');
    leftButton.classList.add("btn");
    leftButton.classList.add("languageBtn");
    leftButton.onclick = swapWithLeft;
    leftButton.innerText = "<";
    buttonDiv.appendChild(leftButton);

    //create shift right button
    let rightButton : HTMLButtonElement = document.createElement('button');
    rightButton.classList.add("btn");
    rightButton.classList.add("languageBtn");
    rightButton.onclick = swapWithRight;
    rightButton.innerText = ">";
    buttonDiv.appendChild(rightButton);

    //create remove button
    let removeButton : HTMLButtonElement = document.createElement('button');
    removeButton.classList.add("btn");
    removeButton.classList.add("languageBtn");
    removeButton.onclick = remove;
    removeButton.innerText = "X";
    buttonDiv.appendChild(removeButton);

    //add the button div to the div
    div.appendChild(buttonDiv);

    //set the element member to the div
    this.element = div;
  }

  //update the selected member when the select is changed
  handleChange(){
    this.selected = this.element.getElementsByTagName("select")[0].value;
  }

  //update the select value based on the selected member
  update(){
    this.element.getElementsByTagName("select")[0].value = this.selected;
  }
}

//holds and array of language boxes as a translation path
class LanguageRoute{
  route : LanguageBox[];

  constructor(){
    this.route = new Array<LanguageBox>();
  }

  addLanguageBox() : void{
    //create a new language box, and bind a new instance of the swap and remove
    //methods to the boxes position
    let newLangBox : LanguageBox = new LanguageBox(
      this.swapWithLeft.bind(this, this.route.length),
      this.swapWithRight.bind(this, this.route.length),
      this.removeLanguageBox.bind(this, this.route.length));
    //add the langauge box to the route
    this.route.push(newLangBox);
  
    if(this.route.length !== 1){
      let arrow : HTMLParagraphElement = document.createElement('p');
      arrow.classList.add("icon");
      arrow.innerText = "→";
      document.getElementById("LanguageBoxRoot").appendChild(arrow);
    }

    //add the language box's element to the window
    document.getElementById("LanguageBoxRoot").appendChild(newLangBox.element);
  }

  //swaps a language box with the one to the left of it
  swapWithLeft(position : number) : void{
    //if the language box is the first one, don't do anything
    if(position === 0) return;

    //swap the box with the one to its left
    this.swapLanguageBoxes(position, position-1);
    
    //rerender the box and the one to its left
    this.rerender(position);
    this.rerender(position-1);
  }

  //swaps a language box with the one to the right of it
  swapWithRight(position : number) : void{
    //if the language box is the last one, don't do anything
    if(position === this.route.length-1) return;

    //swap the box with the one to its right
    this.swapLanguageBoxes(position, position+1);
    
    //rerender the box and the one to its right
    this.rerender(position);
    this.rerender(position+1);
  }

  //swap the language boxes by swapping their selected values
  swapLanguageBoxes(a : number, b : number) : void{
    let temp : string = this.route[a].selected;
    this.route[a].selected = this.route[b].selected;
    this.route[b].selected = temp;
  }

  //rerender a box by storing the old element, updating the element, then
  //replacing the old element with the updated element
  rerender(position : number) : void{
    let oldElement = this.route[position].element;
    this.route[position].update();
    document.getElementById("LanguageBoxRoot").replaceChild(
      oldElement, this.route[position].element
    );
  }

  //remove a language box at position by shifting all language boxes after
  //it down by one, then remove the last language box
  removeLanguageBox(position : number) : void {
    if(this.route.length <= 2) return;
    //shift everything after position left by one
    for(let curr : number = position; curr < this.route.length-1; ++curr){
      this.route[curr].selected = this.route[curr+1].selected;
      //rerender each affect box
      this.rerender(curr);
    }

    //remove the last language box from the window
    document.getElementById("LanguageBoxRoot")
    .removeChild(this.route[this.route.length-1].element);
    //pop the langugage box off the route
    this.route.pop();
    document.getElementById("LanguageBoxRoot").removeChild(
      document.getElementById("LanguageBoxRoot").lastChild);
  }

}

//main translate function, which calls the recursive translate helper function
function translate(){
  //set the output text to loading
  document.getElementById("outputText").classList.add("loading");
  
  //if the route is less than two languages, show an alert and return
  let route = TranslationPath.route;
  if(route.length < 2){
    alert("The translation path must have at least two languages.");
    return;
  }

  //get the input text
  let sourceText : string = document.getElementById("inputText").textContent;

  //split the text by periods and semicolons, each piece will be translated
  //individually for faster processing
  sourceText = sourceText.replace(/\. /g, ".<SPLIT_HERE>");
  sourceText = sourceText.replace(/;/g, ";<SPLIT_HERE>");
  let sourceArray = sourceText.split("<SPLIT_HERE>");

  //console.log(sourceArray);
  //start the translation process at the first language of the route
  translateHelper(route, 0, sourceArray);
}

function translateHelper(route: LanguageBox[], 
                          source : number, 
                          sourceText : string[]){
  //create an array to hold promises for each piece of the source text
  let translatedText : Promise<string>[] = new Array<Promise<string>>();
  
  //for each piece of the source text, push a promise to the translatedText
  //array, which will resolve to the translated text
  sourceText.forEach(value => {
    translatedText.push(callTranslateAPI(
      route[source].selected, route[source+1].selected, value));
  });
  
  //wait until all the pieces have been translated succesfully
  Promise.all(translatedText).then(values => {
    //console.log(values);
    //if this was the last translation step, clear the output text and set
    //it to the concatenation of all the translated pieces
    if(source === route.length-2){
      document.getElementById("outputText").textContent = "";
      values.forEach(value => {
        document.getElementById("outputText").textContent += value + " ";
      });
      //set the output text to no longer loading and return
      document.getElementById("outputText").classList.remove("loading");
      return;
    }
    
    //otherwise, use the translated text and go to the next step
    translateHelper(route, source+1, values);
  }, rejectReason => {
    document.getElementById("outputText").textContent =
      "Error, please try again...";
      document.getElementById("outputText").classList.remove("loading");
      return;
  });
}

//calls Google Translate's API and returns a promise which resolves to the
//translated text
function callTranslateAPI(sourceLang : string, 
                      targetLang : string, 
                      sourceText : string) : Promise<string>{
  //build the url for the get request
  let url : string = 
  "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + 
    sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);
  
  //create a new promise that will be returned later
  let p : Promise<string> = new Promise((resolve, reject) => {
    //create a new get request to the previously built url
    let xhr : XMLHttpRequest = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      let status = xhr.status;
      //if everything completed successfully
      if (status === 200) {
        //get the translated text
        let response : Array<any> = xhr.response[0];
        
        //make sure we get all the pieces, just in case it gets split up
        let translatedText : string = "";
        for(let i = 0; i < response.length; ++i){
          translatedText += response[i][0];
        }

        //resolve the translated text
        resolve(translatedText);
      } else {
        //if there was a problem, reject
        reject(xhr.response);
      }
    };
    xhr.send();
  });
  return p;
}

//create a language route object for the page
var TranslationPath : LanguageRoute = new LanguageRoute();

function init(){
for(let i : number = 0; i < 5; ++i){
  TranslationPath.addLanguageBox();
}
TranslationPath.route[1].selected = "es";
TranslationPath.route[2].selected = "zh-CN";
TranslationPath.route[3].selected = "ar";
for(let i : number = 0; i < 5; ++i){
  TranslationPath.rerender(i);
}
}


//used in the in one of the button onclick methods in the HTML code
function addLanguageBox(){
  TranslationPath.addLanguageBox();
}