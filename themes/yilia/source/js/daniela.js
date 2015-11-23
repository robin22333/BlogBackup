define([], function (){

	var _collection = [];
	var _count = 0;

  var insData = [
									{"src":"assets/daniela/1.jpg", "text":"", "y":2015, "m":"12月1日"},
									{"src":"assets/daniela/2.jpg", "text":"", "y":2015, "m":"12月1日"},
									{"src":"assets/daniela/3.jpg", "text":"", "y":2015, "m":"12月1日"},
									{"src":"assets/daniela/4.jpg", "text":"", "y":2015, "m":"12月1日"},
									{"src":"assets/daniela/5.jpg", "text":"", "y":2015, "m":"12月1日"},
									{"src":"assets/daniela/6.jpg", "text":"", "y":2015, "m":"12月1日"},
									{"src":"assets/daniela/7.jpg", "text":"", "y":2015, "m":"12月1日"},
									{"src":"assets/daniela/8.jpg", "text":"", "y":2015, "m":"12月1日"},
									{"src":"assets/daniela/9.jpg", "text":"", "y":2015, "m":"12月1日"},
							  ];

	var render = function(data){

		var ulTmpl = "";

		for(var em in data){
			var liTmpl = "";
			for(var i=0,len=data[em].srclist.length;i<len;i++){

				liTmpl += '<li>\
								<div class="img-box">\
									<a class="img-bg" rel="example_group" href="'+data[em].srclist[i]+'" title="'+data[em].text[i]+'"></a>\
									<img lazy-src="'+data[em].srclist[i]+'" alt="">\
								</div>\
							</li>';
			}
			ulTmpl = '<section class="archives album"><h1 class="year">'+data[em].year+'<em>'+data[em].month+'</em></h1>\
				<ul class="img-box-ul">'+liTmpl+'</ul>\
				</section>'+ ulTmpl;
		}
		$(ulTmpl).appendTo($(".daniela"));

		$(".daniela").lazyload();
		$("a[rel=example_group]").fancybox();
	}

	var replacer = function(str){
		var arr = str.split("/");
		return "/assets/daniela/" + arr[arr.length-1];
	}

	var ctrler = function(data){
		var imgObj = {};
		for(var i=0,len=data.length;i<len;i++){
			var y = data[i].y;
			var m = data[i].m;
			var src = replacer(data[i].src);
			var text = data[i].text;
			var key = y+""+((m+"").length == 1?"0"+m : m);
			if(imgObj[key]){
				imgObj[key].srclist.push(src);
				imgObj[key].text.push(text);
			}else{
				imgObj[key] = {
					year:y,
					month:m,
					srclist:[src],
					text:[text]
				}
			}
		}
		render(imgObj);
	}

	var getList = function(){
		//$(".open-ins").html("图片来自instagram，正在加载中…");
		//$(".open-ins").html("图片来自instagram，点此访问");
		ctrler(insData);
	}


	return {
		init:function(){
			getList();
		}
	}
});
