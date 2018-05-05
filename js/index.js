window.onload= function (){
	var sidebar=document.querySelector("#sidebar") ;
	sidebar.onclick=function(e){
			this.querySelectorAll("a").forEach(function(item,index){
				item.classList.remove("active");
				e.target.classList.add('active');
			}) ;
			ajax({
			  url:'https://www.easy-mock.com/mock/5aede0ac96e73977996d139c/yingfengguoji/',
			  type:'GET',
			  data:{
			    url:''
			  },
			  onsuccess:function(ret){
			    console.log(JSON.parse(ret)[1])
			    document.querySelector('.learn .info').innerHTML=JSON.parse(ret)[e.target.id]
			  },
			  onerror:function(){
			    console.log('server error')
			  }
			});
		}
}




function ajax(options){
  var url = options.url
  var type = options.type || 'GET'
  var dataType = options.dataType || 'Json'
  var onsuccess = options.onsuccess || function(){}
  var onerror = options.onerror || function(){}
  var data = options.data || {}
  var dataStr = []
  for(var key in data){
    dataStr.push(key+'='+data[key]) ;
  }
  dataStr = dataStr.join('&') ;
  if(type == 'GET'){
     url+= '?'+dataStr
  }
  var xhr = new XMLHttpRequest()
  xhr.open(type,url,true)
  xhr.onload = function(){
    if((xhr.status >= 200 && xhr.status < 300) || xhr.status ==304){
      //成功啦
      if(dataType === 'json'){
        onsuccess(JSON.parse(xhr.responseText))
      }else {
        onsuccess(xhr.responseText)
      }
    } else {
      onerror()
    }
  }
  xhr.onerror = onerror
  if(type === 'POST'){
    xhr.send(dataStr)
  }else {
    xhr.send()
  }
}