
window.onload = function(){
	var str = localStorage.getItem("shop")
	if( str == null ){
		return;
	}
	var arr = JSON.parse(str)
	var deff = $.ajax({
		type:"get",
		url:"data.json",
		async:true
	});
	deff.done(function(res){
		var str1 = ""
		for( var i = 0 ; i < arr.length ; i++ ){
			for( var attr in res ){
				if( arr[i].id == res[attr].id ){
					str1+=`<div class="com1">
								<input type="checkbox"${arr[i].ck} class="ck" />
								<img src="../img/${res[attr].src}"/>
								<p>${res[attr].Title}</p>
								<h3>¥<span class="xj">${res[attr].money}</span></h3>
								<h4><span class="reduce">-</span><span class="num" pid=${arr[i].id}>${arr[i].count}</span><span class="plus">+</span></h4>
								<h5>¥<span class="num1">${arr[i].count*res[attr].money}</span></h5>	
								<input type="button"value="删除" class="btn-remove"/>
							</div>`
				}
			}
		}
		$("#com1").append(str1)
	})
	//复选框点击
	$("#com1").on("click",".ck",function(){
		//调用结算函数
		Settlement();
	})
	//全选效果
	$(".cks").click(function(){
		$(".ck").prop("checked",$(".cks").prop("checked"))
		$(".cks1").prop("checked",$(".cks").prop("checked"))
		Settlement();
	})
	$(".cks1").click(function(){
		$(".ck").prop("checked",$(".cks1").prop("checked"))
		$(".cks").prop("checked",$(".cks1").prop("checked"))
		Settlement();
	})
	//加减功能
	Rp()
	function Rp(){
		$("#com1").on("click",".reduce",function(){
			var id = $(this).parent().find(".num").attr("pid")
			for( var i = 0 ; i < arr.length ; i++ ){
				if( arr[i].id == id ){
					//当减至1时 跳出循环
					if( arr[i].count <=1 ){
						break;
					}else{
						arr[i].count--	
						//页面上显示商品数量的变化
						$(this).parent().find(".num").html(arr[i].count)
						//页面上显示商品总价的变化
						$(this).parent().parent().find(".num1").html(Number($(this).parent().parent().find(".xj").html())*arr[i].count)
						//调用结算函数
						Settlement();
						//改变购物车商品显示数量
						Num();
						//将改变后的数组存入localStorage中
						localStorage.setItem("shop",JSON.stringify(arr))
					}
				}
			}
		})
		$("#com1").on("click",".plus",function(){
			//同上
			var id = $(this).parent().find(".num").attr("pid")
			for( var i = 0 ; i < arr.length ; i++ ){
				if( arr[i].id == id ){
					arr[i].count++	
					$(this).parent().find(".num").html(arr[i].count)
					$(this).parent().parent().find(".num1").html(Number($(this).parent().parent().find(".xj").html())*arr[i].count)
					Settlement();
					Num();
					localStorage.setItem("shop",JSON.stringify(arr))
				}
			}
		})
	}
	//删除选中功能
	$(".removes").click(function(){
		$(".ck:checked").each(function(){
			var id = $(this).parent().find(".num").attr("pid")
			for( var i = 0 ; i < arr.length ; i++ ){
				if( arr[i].id == id ){
					arr.splice(i,1)
					$(this).parent().remove()
					Settlement();
					Num();
					localStorage.setItem("shop",JSON.stringify(arr))
					break
				}
			}
		})
	})
	//单个商品删除功能
	$("#com1").on("click",".btn-remove",function(){
		if( confirm("确定要删除该商品吗？") ){
			$(this).parent().remove()	
			var id = $(this).parent().find(".num").attr("pid")
			for( var i = 0 ; i < arr.length ; i++ ){
				if( arr[i].id == id ){
					arr.splice(i,1)
					Settlement();
					Num();
					localStorage.setItem("shop",JSON.stringify(arr))
					break;
				}
			}
		}
	})
	//显示购物车商品数量
	Num();
	function Num(){
		var num = 0
		for( var i = 0 ; i < arr.length ; i++ ){
			num+=arr[i].count
		}
		$(".span-m").html(num)
	}
	//结算功能
	function Settlement(){
		var m = 0 //总数量
		var n = 0 //总价格
		$(".ck:checked").each(function(){
			m+=Number($(this).parent().find(".num1").html())
			n+=Number($(this).parent().find(".num").html())
		})
		$(".span-2").html(m)
		$(".span-1").html(n)
	}
}
