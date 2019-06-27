window.onload = function(){
	//判断是否有cookie 
	Cook();
	function Cook(){
		var cook = document.cookie
		if( cook ){
			var json = JSON.parse(cook.split("=")[1])
			var str = `<span>欢迎您,</span><span class="User">${json.name}</span>[<a href="login.html">退出</a>]`
			$("#User").html(str)
		}
	}

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
	//搜索时跳转
	sou();
	function sou(){
		$(".btn1").click(function(){
			if( $(".text1").val() ){
				location.href = "list.html"
				localStorage.setItem("Search",$(".text1").val())				
			}
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
	//二级菜单的显示和隐藏
	My();
	function My(){
		//顶部导航
		$(".nav-top1").children("li").eq(0).on({
			mouseenter : function(){
				$(".wodeyinping").show()					
			},
			mouseleave : function(){
				$(".wodeyinping").hide()					
			}
		})
		$(".nav-top1").children("li").eq(3).on({
			mouseenter : function(){
				$(".kefu1").show()					
			},
			mouseleave : function(){
				$(".kefu1").hide()					
			}
		})
		//侧边栏
		$(".sidebar1").find("li").eq(1).on({
			mouseenter : function(){
				var top = $(this).offset().top
				$(".kefu2").show()	
			},
			mouseleave : function(){
				$(".kefu2").hide()					
			}
		})
		$(".sidebar1").find("li").eq(0).on({
			mouseenter : function(){
				var top = $(this).offset().top
				$(".wode").show()	
			},
			mouseleave : function(){
				$(".wode").hide()					
			}
		})
		$(".saoyisao").on({
			mouseenter : function(){				
				$(".saoyisao1").show()	
			},
			mouseleave : function(){
				$(".saoyisao1").hide()					
			}
		})
	}
	//选项卡效果
	information();
	function information(){
		$(".Header-information-1").find("li").mouseenter(function(){
			$(this).addClass("ac").siblings().removeClass("ac")	
			var $index = $(this).index()
			$(".Header-information-2").children("ol").eq($index).css("display","block").siblings().css("display","none")
		})
	}
	//显示购物车商品数量
	Num();
	function Num(){
		var num = 0
		var str = localStorage.getItem("shop")
		if( str == null ){
			return;
		}
		var arr = JSON.parse(str)
		for( var i = 0 ; i < arr.length ; i++ ){
			num+=arr[i].count
		}
		$(".span-m").html(num)
	}
	//购物车运动 移入移出
	Shopmove();
	function Shopmove(){
		$(".sidebar2").click(function(){
			if( $("#sidebar").position().left > 1300 ){
				$("#sidebar").animate({right:300},500)
			}else{
				$("#sidebar").animate({right:0},500)
			}
		})
		$(".no").click(function(){
			$("#sidebar").animate({right:0},500)
		})
	}
	export
	//侧边栏购物车内显示添加至购物车的商品
	Show();
	function Show(){
		var str = localStorage.getItem("shop")
		if( str == null ){
			return;
		}
		var arr = JSON.parse(str)
		var str1 = ""
		var deff = $.ajax({
			type:"get",
			url:"data.json",
			async:true
		});
		deff.done(function(res){
			for( var i = 0 ; i < arr.length ; i++ ){
				for( var attr in res ){
					if( arr[i].id == res[attr].id ){
						str1+=`<div class="shopCart_box">
							<input type="checkbox" class="ck2"/>
							<img src="../img/${res[attr].src}"/>
							<p pid=${arr[i].id} >${res[attr].Title}</p>
							<h4>¥<span class="ss1">${res[attr].money}</span></h4>
							<h5>${arr[i].count}</h5>
						</div>`
						break;
					}
				}
			}
			$(".list").append(str1)
			//跳转至购物车时 判断商品选择状态
			$(".shopa").click(function(){
				$(".ck2:checked").each(function(){
					var id = $(this).parent().find("p").attr("pid")
					for( var i = 0 ; i < arr.length ; i++ ){
						if( arr[i].id == id ){
							arr[i].ck = "checked"
							localStorage.setItem("shop",JSON.stringify(arr))
							break
						}
					}
				})
			})
		})
	}
	//购物车功能实现
	shopfn();
	function shopfn(){
		//全选效果
		$(".ck2s").click(function(){
			$(".ck2").prop("checked",$(".ck2s").prop("checked"))
			Color();//改变背景色
			Settlement1();//结算
		})
		$(".list").on("click",".ck2",function(){
			Color();//改变背景色			
			Settlement1();//调用结算函数
		})
		//结算功能
		function Settlement1(){
			var m = 0 //总数量
			var n = 0 //总价格
			$(".ck2:checked").each(function(){
				m+=Number($(this).parent().find(".ss1").html())
				n+=Number($(this).parent().find("h5").html())
			})
			$(".sp2").html(n)
			$(".sp4").html(m)
		}			
		//根据商品复选框状态改变背景色		
		function Color(){
			$(".ck2").each(function(){
				if( $(this).prop("checked") ){
					$(this).parent().css("background","#FFFBF0")
				}else{
					$(this).parent().css("background","#FFF")
				}
			})
		}
	}
	//回到顶部
	window.onscroll = function(){
		var stop = document.body.scrollTop || document.documentElement.scrollTop;
		if( stop > 100 ){
			$(".to-top").show();
			$(".to-top").css("bottom",0);
			$(".saoyisao").css("bottom",40)
			
			//两侧边栏回到顶部功能
			$(".to-top").click(function(){
				document.body.scrollTop = document.documentElement.scrollTop = 0
			})
			$(".Stairs").find("h4").click(function(){
				document.body.scrollTop = document.documentElement.scrollTop = 0
			})
			
		}else if(stop < 100){
			$(".to-top").hide();
			$(".to-top").css("bottom",40);
			$(".saoyisao").css("bottom",0)
		}
		if( stop > 500 ){			
			$(".Stairs").slideDown(300)	
		}else if( stop < 500 ){
			$(".Stairs").slideUp(200)			
		}		
	};
	
	louti();
	function louti(){
		var flag = true;
		$(".Stairs").find("dd").click(function(){
			var $index = $(this).index()
			var $t = $(".Head-Title").eq($index).offset().top
			$("body,html").animate( { scrollTop:$t },1000 ,function(){
				flag = true;
			});
			$(this).addClass("ac2").siblings().removeClass("ac2")
		})
		$(window).scroll(function(){
			if( flag ){
				let sTop = $(document).scrollTop();
				let $floor = $(".Left-part-2").filter(function(){
					return  Math.abs($(this).offset().top - sTop) < $(this).height()/2;
				})
			}
		})
	}
	
}
