window.onload = function(){
	var t1 = document.querySelector(".t1")
	var t2 = document.querySelector(".t2")
	var s1 = document.querySelector(".s1")
	var reg1  = /^1[35789]\d{9}$/	//账号
	var reg2  = /^.{6,18}$/ //密码
	var flag1 = false
	var flag2 = false
	t1.onblur = function(){
		if( reg1.test( t1.value ) ){
			flag1 = true
			span1.innerHTML = "格式正确"
		}else{
			span1.innerHTML = "格式错误"
		}
	}
	t2.onblur = function(){
		if( reg2.test( t2.value ) ){
			flag2 = true
			span2.innerHTML = "格式正确"
		}else{
			span2.innerHTML = "格式错误"
		}		
	}
	s1.onclick = function(){
		if( flag1 && flag2 ){
			alert("注册成功")
			var _json = {
				name : t1.value,
				pwd : t2.value
			}
			document.cookie = "zh="+JSON.stringify(_json)
			location.href = "login.html"
		}
	}
}
