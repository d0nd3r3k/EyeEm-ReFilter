var eyeem = {
 
 "url": "https://www.eyeem.com/api/v2/",
 
 "get": function( path, params_object, callback ){
 
  if ( ! path ){
   return false;
  }
  if ( ! params_object ){
   params_object = {};
  }
 
  //if is logged in
  if ( true ){
   //pass access token
   params_object.client_id="6GgBoIo0xeSPutzDXWAMM8MLk0r1Xp6y";
 
  }
 
  $.ajax({
   url: this.url+path,
   type: "GET",
   data: params_object,
   dataType: "json",
   timeout: 10000,
   success: function( response ){
    if ( typeof callback == "function" ){
     callback.call( this, response );
    }
   },
   "error": function( jqXHR, textStatus ){
    if ( textStatus != 'abort' ){
     alert('Please check your connection and try again.');
    }
    console.log(jqXHR.responseText);
   }
  });
 },
 
 "post": function( path, params_object, callback ){
 
  if ( ! path ){
   return false;
  }
  if ( ! params_object ){
   params_object = {};
  }
 
  //if is logged in
  if ( true ){
   //pass access token
 
  }
 
  $.ajax({
   url: this.url,
   type: "POST",
   data: params_object,
   dataType: "json",
   timeout: 10000,
   success: function( response ){
    if ( typeof callback == "function" ){
     callback.call( this, response );
    }
   },
   "error": function( jqXHR, textStatus ){
    if ( textStatus != 'abort' ){
     alert('Please check your connection and try again.');
    }
    console.log(jqXHR.responseText);
   }
  });
 }
}
