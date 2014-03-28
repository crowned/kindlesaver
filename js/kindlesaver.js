$(function () {

    var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
    var canvas = document.getElementById('imageCanvas');
    var ctx = canvas.getContext('2d');

    function grayScale(context, canvas) {
        var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
            var pixels  = imgData.data;
            for (var i = 0, n = pixels.length; i < n; i += 4) {
            var grayscale = pixels[i] * .3 + pixels[i+1] * .59 + pixels[i+2] * .11;
            pixels[i  ] = grayscale;        // red
            pixels[i+1] = grayscale;        // green
            pixels[i+2] = grayscale;        // blue
            //pixels[i+3]              is alpha
        }
        //redraw the image in black & white
        context.putImageData(imgData, 0, 0);
      };

   function cropImage(){
	   $( '.cropimage' ).each( function () {
	     var image = $(this),
	         cropwidth = image.attr('cropwidth'),
	         cropheight = image.attr('cropheight'),
	         results = image.next('.results' ),
	         x       = $('.cropX', results),
	         y       = $('.cropY', results),
	         w       = $('.cropW', results),
	         h       = $('.cropH', results),
	         download = results.next('.download').find('a');

	       image.cropbox( {width: cropwidth, height: cropheight, showControls: 'auto' } )
	         .on('cropbox', function( event, results, img ) {
	           x.text( results.cropX );
	           y.text( results.cropY );
	           w.text( results.cropW );
	           h.text( results.cropH );
	           download.attr('href', img.getDataURL());
	        });
	   } );

	   $('#select').on('change', function () {
	       var size = parseInt(this.value);
	       $('.cropimage').each(function () {
	         $(this).cropbox({width: size, height: size})
	       });
	   });
   };

    function handleImage(e) {
		$( ".cropFrame" ).remove();
        var reader = new FileReader();
        reader.onload = function (event) {
            var img = new Image();
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
				      grayScale(ctx, canvas);
                var domImg = new Image();
                domImg.className  = "cropimage";
				domImg.setAttribute("cropwidth", 758);
				domImg.setAttribute("cropheight", 1024);
                domImg.src = canvas.toDataURL();
                $('#kindle').prepend(domImg);
   		cropImage();
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);

    }


});