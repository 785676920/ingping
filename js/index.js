window.onload = function(){
	//轮播图
	banner();
	function banner(){
		var $m = 0;
		var timer = setInterval(banner1,2500);
		function banner1(){
			$m++;
			if( $m > 4 ){
				$m = 0
			};
			//当前下标的uli透明度变为1 其他li透明度变为0
			$(".banner .banner1 li").eq($m).animate({opacity:1},500).siblings().animate({opacity:0},500);
			//当前下标的oli透明度变为1 其他li的透明度变为0.4
			$(".banner .banner2 li").eq($m).animate({opacity:1},500).siblings().animate({opacity:0.4},500);	
		}	
		//鼠标移入移出时 控制定时器的启停
		$(".banner .banner2 li").bind({
			mouseenter : function(){
				clearInterval(timer);
				$m = $(this).index()-1;
				banner1();
			},
			mouseleave : function(){
				timer = setInterval(banner1,2500);
			}
		})
	}

	//小轮播图
	bannerMin();
	function bannerMin(){
		//获取一个li的高度
		var $h = $(".header-t3-3 ul li").height()
		var timer = setInterval(bannerMin1,2500);
		function bannerMin1(){	
			//定时器没跳动一次 ul向上移动一个li的宽度 运动完成时 将第一个li剪切至ul最后 同时将ul的垂直偏移设为0 重复第一次运动
			$(".header-t3-3 ul").stop().animate({marginTop:-$h},500,function(){
				$(".header-t3-3 ul").css("margin-top",0);
				$(".header-t3-3 ul li:first").appendTo(".header-t3-3 ul")
			})
		}
		//移入移出span时启停定时器
		$(".header-t3-3 span").bind({
			mouseenter : function(){
				clearInterval(timer);				
			},
			mouseleave : function(){
				timer = setInterval(bannerMin1,2500);
			}
		})
		//点击向上按钮时 进行一次定时器的跳动
		$(".header-t3-3 .s1").click(function(){
			$(".header-t3-3 ul").stop().animate({marginTop:-$h},500,function(){
				$(".header-t3-3 ul").css("margin-top",0);
				$(".header-t3-3 ul li:first").appendTo(".header-t3-3 ul")
			})
		})
		//点击向下按钮时 先将ul中的最后一张图片添加到ul最前 设置ul的垂直偏移量为一个li的高度 然后ul运动至垂直偏移为0
		$(".header-t3-3 .s2").click(function(){
			$(".header-t3-3 ul li:last").prependTo(".header-t3-3 ul")
			$(".header-t3-3 ul").css("margin-top",-$h);
			$(".header-t3-3 ul").stop().animate({marginTop:0},500)
		})
	}
	//商品列表页 鼠标划上商品时 图片抖动
	Shake();
	function Shake(){
		$(".Left-part-2,.Right-part").find("a").bind({
			mouseenter : function(){
				$(this).find("img").stop().animate({right:14},200)	
			},
			mouseleave : function(){
				$(this).find("img").stop().animate({right:8},200)	
			}
		})
	}
	//猜你喜欢页 鼠标划上商品时 图片抖动
	guess();
	function guess(){
		$(".guess-you").find("li").bind({
			mouseenter : function(){
				$(this).find("img").stop().animate({marginRight:10},200);	
				$(this).find("p").css("color","#f60")
			},
			mouseleave : function(){
				$(this).find("img").stop().animate({marginRight:0},200);
				$(this).find("p").css("color","");
			}
		})
	}
	//换一批
	 Change();
	function Change(){
		$(".change").click(function(){
			$(".guess-you").find("ul").eq(0).toggle()
			$(".guess-you").find("ul").eq(1).toggle()
		})
	}
}
