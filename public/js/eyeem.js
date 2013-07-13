var FILTER_VALS = {};
var el = document.getElementById("pic");

function reset() {
  FILTER_VALS = {};
  render();
  document.querySelector('output').textContent = '-webkit-filter: none;';
  el.className = '';

  var ranges = document.querySelectorAll('input[type="range"]');
  for (var i = 0, r; r = ranges[i]; i++) {
  r.value = r.min;
  }
}

function set(filter, value) {
  FILTER_VALS[filter] = typeof value == 'number' ? Math.round(value * 10) / 10 : value;
  if (value == 0 || (typeof value == 'string' && value.indexOf('0') == 0)) {
  delete FILTER_VALS[filter];
  }
  render();
}

function render() {
  var vals = [];
  Object.keys(FILTER_VALS).sort().forEach(function(key, i) {
  vals.push(key + '(' + FILTER_VALS[key] + ')');
  });
  var val = vals.join(' ');
  el.style.webkitFilter = val;
  document.querySelector('output').textContent = '-webkit-filter: ' + (val ? val : 'none') + ';';
}

$(document).ready(function(){
	
	//Check for Webkit
	$.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase()); 
	$.browser.safari = /safari/.test(navigator.userAgent.toLowerCase()); 
	
	if(!$.browser.chrome && !$.browser.safari){
	  alert('Only Works on Webkit (Google Chrome, Safari');
	}
	
	//Config Modal 
	$('#photoModal').modal({
			backdrop: true,
			keyboard: true,
			show: false
		}).css({
			// make width 90% of screen
		   'width': function () { 
			   return ($(document).width() * .9) + 'px';  
		   },
			// center model
		   'margin-left': function () { 
			   return -($(this).width() / 2); 
		   }
	});

	//Search Form
	$("body").on("submit","#searchForm", function(e){
		
		e.preventDefault();
		
		//Some Animation
		$(".step1").fadeOut('fast');
		$(".step2").fadeIn('slow');
		$(".loading").fadeToggle();
		$('ul.results').html("");
		$(".loadMoreButton").hide();
		
		var offS = 1;
		var sQuery = $(this).find(".searchInputEye").val();
		
		//Getting Images from EyeEm 
		eyeem.get("search",{q:sQuery, includeAlbums:true, limit:35},function(response){
			
			$(".loading").fadeToggle();	
			
			$(response.albums.items).each(function(i, item){
				
				//The jsonObj to feed to moustache
				jsonObj = {
					thumb: item.thumbUrl
				}
				
				//Feed to moustache
				var template = $('#resultTpl').html(),
					html = Mustache.to_html(template, jsonObj);
				
				$('ul.results').append(html);	
			});
			
			$(".loadMoreButton").show();	
		});
		
		//Load more content
		$("#loadMore").on("click", function(e){
			
			e.preventDefault();
			
			//Getting Images from EyeEm with offset
			eyeem.get("search",{q:sQuery, includeAlbums:true, limit:35, offset: 35},function(response){
				
				$(response.albums.items).each(function(i, item){
					
					//The jsonObj to feed to moustache
					jsonObj = {
						thumb: item.thumbUrl
					}
					
					//Feed to moustache
					var template = $('#resultTpl').html(),
						html = Mustache.to_html(template, jsonObj);
						
					$('ul.results').append(html);	
				});
			});
		});
	});
	
	//Filter editing modal
	$(".results").on('click','.imgWrapper', function(){
		
		//Reset Filters
		reset();
		
		//Init Modal
		var img = $(this).find('img').attr("src");
		$(".modal-body").find("#pic").attr("src", img);
		$('#photoModal').modal('toggle');
		
	});
	
});