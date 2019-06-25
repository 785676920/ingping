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
