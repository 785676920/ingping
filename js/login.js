window.onload = function(){
	var t1 = document.querySelector(".t1")
	var t2 = document.querySelector(".t2")
	var s1 = document.querySelector(".s1")
	var cook = document.cookie	
	var json= JSON.parse(cook.split("=")[1])
	s1.onclick = function(){
		if( t1.value == json.name ){
			if( t2.value == json.pwd ){
				alert("登录成功")
				location.href = "index.html"
			}else{
				alert("密码错误")
			}
		}else{
			alert("用户名不存在")
		}
	}
}
