$(document).ready(function(){

	$("body").delegate("#searchForm","submit", function(e){
		e.preventDefault();
		$(".step1").fadeOut('fast');
		$(".step2").fadeIn('slow');
		$(".loading").fadeToggle();
		$('ul.results').html("");
		$(".loadMoreButton").hide();
		var offS = 1;
		var sQuery = $(this).find(".searchInputEye").val();
		eyeem.get("search",{q:sQuery, includeAlbums:true, limit:35},function(response){
			//console.log(response)
			$(".loading").fadeToggle();	
			$(response.albums.items).each(function(i, item){
				jsonObj = {
					thumb: item.thumbUrl
				}
				var template = $('#resultTpl').html(),
					html = Mustache.to_html(template, jsonObj);
				$('ul.results').append(html);	
				//console.log(item.thumbUrl);
			});
			$(".loadMoreButton").show();
		});
		$("#loadMore").on("click", function(e){
			e.preventDefault();

			eyeem.get("search",{q:sQuery, includeAlbums:true, limit:35, offset: 35},function(response){
				//console.log(response)
				$(response.albums.items).each(function(i, item){
					jsonObj = {
						thumb: item.thumbUrl
					}
					var template = $('#resultTpl').html(),
						html = Mustache.to_html(template, jsonObj);
					$('ul.results').append(html);	
					//console.log(item.thumbUrl);
				});

			});
		})
	});

	//Click to apply filters
	$(".results").on("click","img", function(){
		alert("foo");
		return false;
	})
});