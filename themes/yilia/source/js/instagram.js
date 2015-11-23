define([], function (){

	var _collection = [];
	var _count = 0;

  var insData = [
									{"src":"assets/2015-11/1.jpg", "text":"草莓 好妹妹", "y":2015, "m":11},
									{"src":"assets/2015-11/2.jpg", "text":"草莓 好妹妹", "y":2015, "m":11},
									{"src":"assets/2015-11/3.jpg", "text":"草莓 好妹妹", "y":2015, "m":11},
									{"src":"assets/2015-11/4.jpg", "text":"草莓 好妹妹", "y":2015, "m":11},
									/*
									{"src":"assets/2015-10/1.jpg", "text":"沙坡尾", "y":2015, "m":10},
									*/
									{"src":"assets/2015-10/2.jpg", "text":"吸血鬼屋", "y":2015, "m":10},
									{"src":"assets/2015-9/1.jpg", "text":"女神", "y":2015, "m":9},
									{"src":"assets/2015-7/1.jpg", "text":"大圣归来", "y":2015, "m":7},
									{"src":"assets/2015-7/2.jpg", "text":"左安西西", "y":2015, "m":7},
									{"src":"assets/2015-7/3.jpg", "text":"左安西西", "y":2015, "m":7},
									{"src":"assets/2015-7/4.jpg", "text":"左安西西", "y":2015, "m":7},
									{"src":"assets/2015-6/1.jpg", "text":"", "y":2015, "m":6},
									{"src":"assets/2015-1/1.jpg", "text":"", "y":2015, "m":1},
									{"src":"assets/2015-1/2.jpg", "text":"", "y":2015, "m":1},
									{"src":"assets/2015-1/3.jpg", "text":"", "y":2015, "m":1},
									/*
									{"src":"assets/2015-1/4.jpg", "text":"", "y":2015, "m":1},
									{"src":"assets/2015-1/5.jpg", "text":"", "y":2015, "m":1},
									*/
									{"src":"assets/2014-12/1.jpg", "text":"", "y":2014, "m":12},
									{"src":"assets/2014-12/2.jpg", "text":"", "y":2014, "m":12},
									{"src":"assets/2014-12/3.jpg", "text":"", "y":2014, "m":12},
									{"src":"assets/2014-6/1.jpg", "text":"", "y":2014, "m":6},
									{"src":"assets/2014-6/2.jpg", "text":"", "y":2014, "m":6},
									{"src":"assets/2014-5/1.jpg", "text":"", "y":2014, "m":5},
									{"src":"assets/2014-5/2.jpg", "text":"", "y":2014, "m":5},
									{"src":"assets/2014-5/3.jpg", "text":"", "y":2014, "m":5},
									{"src":"assets/2014-5/4.jpg", "text":"", "y":2014, "m":5},
									{"src":"assets/2014-5/5.jpg", "text":"", "y":2014, "m":5},
									{"src":"assets/2014-5/6.jpg", "text":"", "y":2014, "m":5},
									{"src":"assets/2014-5/7.jpg", "text":"", "y":2014, "m":5},
									{"src":"assets/2014-4/1.jpg", "text":"", "y":2014, "m":4},
									{"src":"assets/2014-4/2.jpg", "text":"", "y":2014, "m":4},
									{"src":"assets/2014-4/3.jpg", "text":"", "y":2014, "m":4},
									{"src":"assets/2014-4/4.jpg", "text":"", "y":2014, "m":4},
									{"src":"assets/2014-4/5.jpg", "text":"", "y":2014, "m":4}
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
			ulTmpl = '<section class="archives album"><h1 class="year">'+data[em].year+'<em>'+data[em].month+'月</em></h1>\
				<ul class="img-box-ul">'+liTmpl+'</ul>\
				</section>'+ ulTmpl;
		}
		$(ulTmpl).appendTo($(".instagram"));

		$(".instagram").lazyload();
		$("a[rel=example_group]").fancybox();
	}

	var replacer = function(str){
		var arr = str.split("/");
		return "/assets/ins_img/"+arr[arr.length-2] + "/" +arr[arr.length-1];
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
		$(".open-ins").html("图片来自instagram，点此访问");
		ctrler(insData);
	}


	return {
		init:function(){
			getList();
		}
	}
});
