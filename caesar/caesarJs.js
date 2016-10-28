
/*button variable*/
var en_btn = document.getElementById("btn-encry");
var de_btn = document.getElementById("btn-decty");
/*output text area varibale*/
var en_out = document.getElementById("p-dec");
var de_out = document.getElementById("p-enc");
/*logic*/
function encryLis () {
	var en_ined="";
	var en_in = document.getElementById("i-txt").value;
	var k_value = document.getElementById("k-input").value;
	if (k_value==="") {
		alert('k值为null');
	}else if(k_value!==""&&k_value<=26&&en_in!==""){
		for(var i=0;i<en_in.length;i++){
		var asc = en_in[i].charCodeAt();
		var change = asc+parseInt(k_value);
		var temp;
		if(asc>=65&&asc<=90){
			temp = change%65+97;
			if (temp>122) {
				temp = temp-26;
			}
			en_ined+=String.fromCharCode(temp);
		}else if(asc>=97&&asc<=122){
			temp = change%97+65;
			if(temp>90){
				temp = temp-26;
			}
			en_ined+=String.fromCharCode(temp);
		}else{
			alert("out of bound!");
			break;
		}
	}
	var en_out = document.getElementById("p-dec");
	var para = document.createElement("p");
	en_out.appendChild(para);
	var txt = document.createTextNode(en_ined);
	para.appendChild(txt);
	}
}

function decryLis(){
	var de_ined="";
	var de_in = document.getElementById("i-txt2").value;
	var k_value = document.getElementById("k-input").value;

	if (k_value==="") {
		alert('k值为null');
	}else if(k_value!==""&&k_value<=26&&de_in!==""){
		for(var i=0;i<de_in.length;i++){
		var asc = de_in[i].charCodeAt();
		var change = asc-parseInt(k_value);
		var temp;
		if(asc>=65&&asc<=90){
			if(change<65){
				temp = (change+26)%65+97;
			}else{
				temp = change%65+97;
			}
			de_ined+=String.fromCharCode(temp);
		}else if(asc>=97&&asc<=122){
			if(change<97){
				temp = (change+26)%97+65;
			}else{
				temp = change%97+65;
			}
			de_ined+=String.fromCharCode(temp);
		}else{
			alert("out of bound!");
			break;
		}
	}
	//alert(en_ined);
	var de_out = document.getElementById("p-enc");
	var para = document.createElement("p");
	de_out.appendChild(para);
	var txt = document.createTextNode(de_ined);
	para.appendChild(txt);
	}
}