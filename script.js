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
	
}



function tokenise(source){
	if(!source) return new maybe(false, "source is empty, or not type string");
	let index = 0;
	while(index < source.length){
		
	}
}