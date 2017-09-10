function Recorder(loopy){
	subscribe("record_gif",  function(){
		loopy.gifconfig = loopy.gifconfig || {
			quality: 10, 
		  	workers: 1,
			repeat: 0, 
			background: null, 
			width: null, 
			height: null, 
			framerate: 5, 
			dither: false, 
			transparent: null, 
			dither: "FloydSteinberg"
		}
		console.log("NOTE alter GIF settings in loopy.gifconfig in javascript console")
		console.dir(loopy.gifconfig)

		loopy.gif = new GIF( Object.assign({
		  workerScript: "js/gif.worker.js"
		}, loopy.gifconfig ) )
		var canvas = document.querySelectorAll("canvas")[0]
		loopy.gif.on('finished', function(blob) {
			saveData( blob, "flow.gif")
		  	//window.open(URL.createObjectURL(blob));
		});

		// capture
		var frameduration = 1000 / loopy.gifconfig.framerate
		var frame = 0
		loopy.recordid = setInterval( function(){
			console.log("frames captured" )
			loopy.gif.addFrame(canvas, {delay: frameduration, copy:true } )  
		}, frameduration)
	})
	subscribe("record_gif_stop",  function(){
		clearInterval( loopy.recordid )
		setTimeout(function(){
			loopy.gif.render()
			console.log("processing GIF..(please wait)")
		})
	})
}

