
//搜索功能实现
Search();
function Search(){
	//获取用户输入的关键字 遍历json数据库  找到在标题中含有关键字的商品 显示在页面上
	var str = localStorage.getItem("Search")
	var str1 = ""
	var deff = $.ajax({
		type:"get",
		url:"data.json",
		async:true
	});
	deff.done(function(res){
		for( var i in res ){
			if( res[i].Title.indexOf(str) != -1 ){
				str1+=`<li>
							<b><img src="../img/${res[i].src}"/></b>
							<h3>¥<span>${res[i].money}</span></h3>
							<p>${res[i].Title}</p>
							<div class="x-alltime">
								<span class="Number-1">1</span>
								<span class="up">∧</span>
								<span class="down"pid=${res[i].id} >∨</span>
								<input type="button" value="加入购物车"class="btn2 "/>
								<div class="Collection">
									<span>♡</span>
									<h2>收藏</h2>
								</div>									
							</div>
						</li>`
			}
		}
		if( !str1 ){
			//如果数据库中没有商品匹配关键字 则提示没有找到相关商品
			$(".Cant-find").show()
			$(".Caution1").html(str)
		}else{
			$(".t-box").html(str)
			$(".List-of").html(str1)			
		}
	})
}
//加入购物车
Shop();
function Shop(){
	$(".List-of").on("click",".btn2",function(){
		//点击加入购物车时 动态生成商品图片 运动至购物车时删除
		var img = $(this).parent().parent().find("b").html()
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
		var arr = []
		var id = $(this).parent().find(".down").attr("pid")
		var count = Number( $(this).parent().find(".Number-1").html() )
		var flag = true
		var json = {
			"id":id,
			"ck":"",
			"count":count
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
		Show();//侧边栏购物车内显示添加至购物车的商品
	})
}
//商品列表功能实现
Shopping();
function Shopping(){
	//动态创建的商品页 需要事件委托
	//商品个数的加减
	$(".List-of").on("click",".up",function(){
		var m = Number($(this).parent().find(".Number-1").html());
		m++;
		$(this).parent().find(".Number-1").html(m)
	})
	$(".List-of").on("click",".down",function(){
		var n = Number($(this).parent().find(".Number-1").html());
		n--;
		if( n <=0 ){
			n = 1
		}
		$(this).parent().find(".Number-1").html(n)
	})
	//收藏点击效果
	$(".List-of").on("click",".Collection",function(){
		$(this).find("span").css("color","#f66")
		$(this).find("span").html("♥")
	})
}

