const [inText, IOText] = document.querySelectorAll("Textarea");
//source will be inText.value

//token class
class token{
	constructor(type, value){
		this.type = type;
		this.value = value;
	}
}

document.querySelectorAll("button")[0].onclick=()=>{
	let tokenList = tokenise(inText.value);
	if(!tokenList.ok){
		console.log(`err tokeniser: ${tokenList.value}`);
		return;
	}
	console.log(tokenList.value);
}

let whiteSpaces = [" ", "\t", "\n"];
//currently only single character tokens, not tokens really
let nonSeparatedTokens = [".",",",";",":","(",")","[","]","{","}","!","?","*","/",'"',"*","+","-","=",">","<"];
let numChars = ["0","1","2","3","4","5","6","7","8","9"];
let keywords = ["if","else","for","while","int","const","func","return","switch","case","break","continue"];
let boolWords = ["true","false"];


function tokenise(source){
	if(!source) return {ok: false, value: "source is empty, or not type string"};
	let words = [];
	let rownums = [];
	let currentRowNum = 1;
	let wordAccumulator = "";
	
	//first separate it into words, based on whitespaces and other operators/special characters
	for(let index = 0; index < source.length; index++){
		let currentCharacter = source[index];
		if(currentCharacter === "\n") currentRowNum++;
		if(whiteSpaces.includes(currentCharacter)){
			if(wordAccumulator){
				words.push(wordAccumulator);
				rownums.push(currentRowNum);
				wordAccumulator = "";
				words.push(currentCharacter);
				rownums.push(currentRowNum);
			}
		}
		else if(nonSeparatedTokens.includes(currentCharacter)){
			if(wordAccumulator){
				words.push(wordAccumulator);
				rownums.push(currentRowNum);
				wordAccumulator = "";	
			}
			words.push(currentCharacter);
			rownums.push(currentRowNum);
		}
		else{
			wordAccumulator += currentCharacter;
		}
	}
	
	let tokens = [];
	//create tokens from words, watch out for string literals
	for(index = 0; index < words.length; index++){
		let currentWord = words[index];
		//check for string literals
		if(currentWord === "\""){
			let valueAccumulator = "";
			while(true){
				index++;
				if(index >= words.length) return {ok: false, value: `on line ${rownums[index-1]}\nstring literal unfinihsed, file ends unexpectedly`};
				if(words[index] !== "\""){
					valueAccumulator += words[index];
				}
				else{
					tokens.push(new token("string literal", valueAccumulator));
					break;
				}
			}
		}
		//discard non literal whitespaces
		else if(whiteSpaces.includes(currentWord)){
			continue;
		}
		else if(nonSeparatedTokens.includes(currentWord)){
			//special character tokens' type currently their text
			tokens.push(new token(currentWord,null));
		}
		else if(keywords.includes(currentWord)){
			//same as above
			tokens.push(new token(currentWord, null));
		}
		else if(boolWords.includes(currentWord)){
			tokens.push(new token("bool",currentWord=="true"?true : false));
		}
		//numbers, no floats yet
		else if(numChars.includes(currentWord[0])){
			let numValueCollector = 0;
			for(let i = 0; i < currentWord.length; i++){
				let currentDigit = currentWord[i];
				if(!numChars.includes(currentDigit)) return {ok: false, value: `on line ${rownums[index]}\nunexpected character in number literal`};
				numValueCollector +=  (currentDigit.charCodeAt(0)-48) * (10**(currentWord.length-i-1));
			}
			tokens.push(new token("int literal", numValueCollector));
		}
		else{
			tokens.push(new token("variable name", words[index]));
		}
	}
	
	
	return {ok: true, value: tokens};
}