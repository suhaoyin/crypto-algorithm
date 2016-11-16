//声明全局数组，用于储存密钥矩阵
var randomKey = new Array();
//字母表
var chars = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

/**
*createRandomKey 用于产生密钥,并输出密钥矩阵
*/
function createRandomKey () {
	var div = document.getElementById("show");
	for(var i=0;i<3;i++){
		randomKey[i]=new Array();
		for(var k=0;k<3;k++){
			randomKey[i][k] = Math.round(Math.random()*100%26);
		}
	}
	for(var i=0;i<3;i++){
		var textShow="";
		var para = document.createElement("p");
		div.appendChild(para);
		for(var k=0;k<3;k++){
			textShow=textShow+" "+randomKey[i][k];
		}
		var text = document.createTextNode(textShow);
		para.appendChild(text);
	}
}

/**
*lock 用于接收明文并且加密明文
*/
function lock () {
	//用于存储encode中的字母位置
	var indexArr = Array();
	var calArr = Array();
	var temp = "";
	var encode = document.getElementById("txt").value.toUpperCase().replace(/\s/ig,'');
	while(encode.length%3!=0) 
		encode+='X';
	for(var i=0;i<encode.length;i++)
		indexArr[i]=chars.indexOf(encode[i]);
	for(var i=0;i<indexArr.length;i+=3){
		calArr[0]=indexArr[i];				
		calArr[1]=indexArr[i+1];
		calArr[2]=indexArr[i+2];
		for(var k=0;k<3;k++){
			calArr[k]=(calArr[k]*randomKey[k][0]+calArr[k]*randomKey[k][1]+calArr[k]*randomKey[k][2])%26;
			temp+=chars[calArr[k]];
		}
	}
	console.log(temp);
	alert("明文加密后："+temp);
}