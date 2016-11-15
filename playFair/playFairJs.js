//字母顺序数组
var allChars = ['A','B','C','D','E','F','G','H','I','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
function showTable(){
    var or_key= document.getElementById("key").value;
    //alert(or_key);
    var rel = removeDuplicate(or_key.toUpperCase());
    //alert(rel);
    createKey(rel);
}

function lock () {
    //用于存储处理后的明文
    var temp="";
    //存储加密后的temp明文
    var encodeArr = "";
    //获取并处理明文
    var encode = document.getElementById("txt").value.toUpperCase().replace(/\s/ig,'');
    for (var i = 0; i < encode.length;) {
        //console.log(encode[0]);
        if(encode[i+1]!=undefined){
            if(encode[i]===encode[i+1]){
                temp+=encode[i];
                temp+='K';
                i++;
            }else{
                temp+=encode[i];
                temp+=encode[i+1];
                i+=2;
            }  
        }else{
            temp+=encode[i];
            temp+='K';
            i++;
        }          
    }
    //console.log(temp);
    //开始加密
    for (var i = 0; i < temp.length; i+=2) {
        var prev = allChars.indexOf(temp[i]);
        var next = allChars.indexOf(temp[i+1]);
        //console.log("prev: "+prev+" next: "+next);
        var pp = Math.floor(prev*1000/5000);
        var nn = Math.floor(next*1000/5000);
        var des = next-prev;
        //console.log("pp: "+pp+" nn: "+nn+" des: "+des);
        if (des<0) des=0-des;
        if (des%5==0) {//相同列
            encodeArr+=allChars[(prev+5)%25];
            encodeArr+=allChars[(next+5)%25];
            // console.log(encodeArr.toString());
        }else if(pp===nn){//相同行
            if(prev>next){
                if(prev+1>pp*5+4)
                    encodeArr+=allChars[pp*5];
                else
                    encodeArr+=allChars[prev+1];                
                encodeArr+=allChars[next+1];
            }else{
                encodeArr+=allChars[prev+1];
                if(next+1>nn*5+4)
                    encodeArr+=allChars[nn*5];
                else
                    encodeArr+=allChars[next+1];
            }
        }else{
            if(prev>next){
                var t = pp-nn;
                encodeArr+=allChars[next+t*5];
                encodeArr+=allChars[prev-t*5];
            }else{
                var t = nn-pp;
                encodeArr+=allChars[next-t*5];
                encodeArr+=allChars[prev+t*5];
            }
        }  
    }
    console.log(encodeArr.toString());
    alert("明文加密后结果："+encodeArr.toString());
}



function unlock(){
    var decode = document.getElementById("secrect").value.toUpperCase();
    var decodeArr = "";
    for(var i=0;i<decode.length;i+=2){
        var d_prev = allChars.indexOf(decode[i]);
        var d_next = allChars.indexOf(decode[i+1]);
        var d_pp = Math.floor(d_prev*1000/5000);
        var d_nn = Math.floor(d_next*1000/5000);
        var d_des = d_next-d_prev;
        if(d_des<0)d_des=0-d_des;
        if(d_des%5===0){//同列
            decodeArr+=allChars[(d_prev+20)%25];
            decodeArr+=allChars[(d_next+20)%25];
            // console.log(decodeArr.toString());ok
        }else if(d_pp==d_nn){//同行
            if(d_prev<d_next){
                if(d_prev==d_pp)
                    decodeArr+=allChars[d_pp*5+4];
                else
                    decodeArr+=allChars[d_prev-1];
                decodeArr+=allChars[d_next-1];
            }else{
                decodeArr+=allChars[d_prev-1];
                if(d_next==d_nn)
                    decodeArr+=allChars[d_nn*5+4];
                else
                    decodeArr+=allChars[d_next-1];
            }
            // console.log(decodeArr.toString());ok
        }else{//不同行和列
            if(d_prev<d_next){
                var dt = d_nn-d_pp;
                decodeArr+=allChars[d_next-dt*5];
                decodeArr+=allChars[d_prev+dt*5];
            }else{
                var dt = d_pp-d_nn;
                decodeArr+=allChars[d_next+dt*5];
                decodeArr+=allChars[d_prev-dt*5];
            }
        }
    }
    console.log(decodeArr.toString());
    alert("密文解密后："+decodeArr);
}



function createKey(keychars){
       //变量keychars获取字母在字母顺序表中位置，删除该字母
    for(var i = 0 ;i<keychars.length;i++){
        var index = allChars.indexOf(keychars[i]);

        if (index > -1) {
            
            allChars.splice(index, 1);
        }

    }
        //console.log(allChars.join(','));
       //将keychar中的字母插入到字母表中
    for(var i = keychars.length-1;i>=0;i--){
        allChars.unshift(keychars[i]);
        
    }
    //console.log(allChars.join(','));
        //从第一列将keychars插入至密码表
    for(var i = 0 ; i<5 ; i++){
        var text="";
        var div = document.getElementById("show");
        var para = document.createElement("p");
        div.appendChild(para);
        for(var j = 0; j<5 ;j++){
            text+=allChars[i*5+j]+"  ";
            //var txt = document.createTextNode(allChars[i*5+j]+" ");
            //console.log(allChars[i*5+j]);
        }
        var txt = document.createTextNode(text);
        para.appendChild(txt);
    }

    //console.log(allChars.join(','));
    //return key;
}

function removeDuplicate(str){
    //alert("test removeDuplicate");
    var result = [],tempStr = "";
    var arr = str.split('');//把字符串分割成数组
        //arr.sort();//排序
        for(var i = 0; i < arr.length; i++){
            var repeatBack = true;//设计变量是为确保字符串前部分不存在相同字符，因为以下算法只能确保连在一起相同的字符
            for(var j = 0;j<result.length ;j++){
                if(arr[i] == result[j])
                    repeatBack = false;
            }
            if(arr[i] !== tempStr && repeatBack){
                result.push(arr[i]);
                tempStr = arr[i];
            }else{
                continue;
            }
        }
        return result.join("");//将数组转换为字符串
}