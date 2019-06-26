//放大镜特效
Magnifier();
function Magnifier(){
	$(".small").bind({
		mouseenter:function(){
			$(".mask").show()
			$(".big").show()
		},
		mouseleave:function(){
			$(".mask").hide()
			$(".big").hide()
		}
	})
	$(".small").mousemove(function(e){
		var e = e || event
		var x = e.pageX - $(".mask").width()/2 - $(".box").offset().left
		var y = e.pageY - $(".mask").height()/2 - $(".box").offset().top - 30 //我也不知道怎么要减30了
		var maxL = $(".small").width() - $(".mask").width()
		var maxT = $(".small").height() - $(".mask").height()
		x = x < 0 ? 0 : ( x > maxL ? maxL : x )
		y = y < 0 ? 0 : ( y > maxT ? maxT : y )
		$(".mask").css("left",x)
		$(".mask").css("top",y)
		
		var m = $(".small").width()/$(".mask").width()
		$(".bigimg").css("left",-x*m)
		$(".bigimg").css("top",-y*m)
	})
}
ajax();
function ajax(){
	var str = location.href
	var id = str.split("?")[1].split("=")[1]
	var deff = $.ajax({
		type:"get",
		url:"data.json",
		async:true
	});
	deff.done(function(res){
		for( var i in res){
			if( res[i].id == id ){
				var str1 = `<img src="../img/${res[i].src}" class="bigimg"/>`
				var str2 = `<img src="../img/${res[i].src}"/>`
				$(".big").append(str1);
				$(".small").append(str2);
				$(".p1,.p2").html(res[i].Title)
				$(".s9").append(res[i].money)
				break;
			}
		}
		
	})
}
//加入购物车
Shop();
function Shop(){
	$(".btn2").click(function(){
		//点击加入购物车时 动态生成商品图片 运动至购物车时删除
		var img = $(".big").html()
		var $div = $("<div>")
		var $p = $(this).offset()
		var $p1 = $(".sidebar1").find("li").eq(2).offset()
		$div.addClass("active").css({"left":$p.left,"top":$p.top})
		$div.animate({left:$p1.left-50,top:$p1.top},1000,function(){
			$div.remove()
		})
		$div.append(img)
		$div.appendTo("body")
		
		//点击加入购物车时 将商品数据存入至storage
		var str = location.href
		var id = str.split("?")[1].split("=")[1]
		var arr = []
		var flag = true
		var json = {
			"id":id,
			"ck":"",
			"count":1
		}
		var str = localStorage.getItem("shop")
		if( str != null ){
			arr = JSON.parse(str)
			for( var i = 0 ; i < arr.length ; i++ ){
				if( arr[i].id == json.id ){
					arr[i].count++
					flag = false
					break;
				}
			}
		}
		if( flag ){
			arr.push(json);
		}
		localStorage.setItem("shop",JSON.stringify(arr))
		Num();//调用函数改变购物车数量
	})
	$(".btn1").click(function(){
		var str = location.href
		var id = str.split("?")[1].split("=")[1]
		var arr = []
		var flag = true
		var json = {
			"id":id,
			"ck":"checked",
			"count":1
		}
		var str = localStorage.getItem("shop")
		if( str != null ){
			arr = JSON.parse(str)
			for( var i = 0 ; i < arr.length ; i++ ){
				if( arr[i].id == json.id ){
					arr[i].count++
					flag = false
					break;
				}
			}
		}
		if( flag ){
			arr.push(json);
		}
		localStorage.setItem("shop",JSON.stringify(arr))
		Num();//调用函数改变购物车数量
		location.href = "shop.html"
	})
}
//显示购物车商品数量
Num();
function Num(){
	var num = 0
	var str = localStorage.getItem("shop")
	var arr = JSON.parse(str)
	for( var i = 0 ; i < arr.length ; i++ ){
		num+=arr[i].count
	}
	$(".span-m").html(num)
}
