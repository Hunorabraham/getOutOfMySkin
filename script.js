const [inText, IOText] = document.querySelectorAll("Textarea");
//source will be inText.value

//token class
class token{
	constructor(type, value){
		this.type = type;
		this.value = value;
	}
}

class maybe{
	constructor(ok, value){
		this.ok = ok;
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
//currently only single character tokens
let nonSeparatedTokens = [".",",",";",":","(",")","[","]","{","}","!","?","*","/",'"',"'","*","+","-","=",">","<"];

function tokenise(source){
	if(!source) return new maybe(false, "source is empty, or not type string");
	let index = 0;
	let words = [];
	let wordAccumulator = "";
	
	//first separate it into words, based on whitespaces and other operators/special characters
	while(index < source.length){
		let currentCharacter = source[index];
		
		if(whiteSpaces.includes(currentCharacter)){
			if(wordAccumulator){
				words.push(wordAccumulator);
				wordAccumulator = "";
			}
		}
		else if(nonSeparatedTokens.includes(currentCharacter)){
			if(wordAccumulator){
				words.push(wordAccumulator);
				wordAccumulator = "";	
			}
			words.push(currentCharacter);
		}
		else{
			wordAccumulator += currentCharacter;			
		}
		
		index++;
	}
	return new maybe(true, words);
}