var key;
var or_key= document.getElementById("key").value;
var btn_lock = document.getElementById("lock");
var btn_unlock = document.getElementById("unlock");
function lock(){
    createKey(removeDuplicate(or_key));
}

function unlock(){

}

function createKey(keychars){
       //字母顺序数组
       alert("test createKey");
    var allChars = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y'];
       //变量keychars获取字母在字母顺序表中位置，删除该字母
    for(var i = 0 ;i<keychars.length;i++){
        var index = allChars.indexOf(keychars[i]);
        if (index > -1) {
            allChars.splice(index, 1);
        }
    }
       //将keychar中的字母插入到字母表中
    for(var i = keychars.length-1;i>=0;i--){
        allChars.unshift(keychars[i]);
    }
        //从第一列将keychars插入至密码表
    for(var i = 0 ; i<5 ; i++){
        for(var j = 0; j<5 ;j++){
            key[j][i] = allChars[i*5+j];
        }
    }
}

function removeDuplicate(str){
    alert("test removeDuplicate");
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