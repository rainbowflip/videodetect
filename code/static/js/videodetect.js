//$(".a-slider").css("left",$("input[name='radio']:checked").css("left"));
'use strict';
class upload{
    static postUrl(uploader,data){
        console.log("postjson---------------")
        $.ajax({
            url:uploader,
            data:data,
            async:false,
            type:'POST',
            success:function(res){
                resp = JSON.parse(res);
                console.log(resp)
            }
        })
    }
    static viewAsimage(){
        document.getElementById("video").src = window.URL.createObjectURL(document.getElementById("videofile").files[0]);
        var video = document.getElementById("video");
        video.currentTime = 10;
        var canvas = document.createElement("canvas");
        canvas.width = 300;
        canvas.height = 200;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(document.getElementById("video"), 0, 0, canvas.width, canvas.height);
        newDataUrl = canvas.toDataURL("image/jpeg", 0.9);
        console.log('---',newDataUrl);
    }
    static viewAsvideo(id){
        document.getElementById(id).src = window.URL.createObjectURL(document.getElementById("select_btn_1").files[0]);

    }
    static showResults(data){
        console.log("------results------",data)
    }
    static queryResults(url,data){
    	setInterval(function(){
	    $.ajax({
	        url:url,
		data:data,
		type:'POST',
                success:function(res){
		    resp = JOSN.parse(res);
		    if(resp.complete == "done"){
			$(".a-slider").css("left","33%");
		        upload.showResults(res.data);
		    }
		}
	    })
	},5000)
    }
}
void upload;

var postJson={};
var boxarea_class = null;
var uploader = '/upload/';
$(function(){
    var up = $('#upload').Huploadify({
		auto:false,
		fileTypeExts:'*.jpg;*.png;*.exe;*.mp3;*.mp4;*.zip;*.doc;*.docx;*.ppt;*.pptx;*.xls;*.xlsx;*.pdf',
		multi:true,
		fileSizeLimit:99999999,
		breakPoints:true,
		// fileSplitSize:1024*1024*10,
		saveInfoLocal:true,
		showUploadedPercent:true,//是否实时显示上传的百分比，如20%
		showUploadedSize:true,
		removeTimeout:2,
		uploader:uploader,
		onUploadSuccess:function(){
                    console.log("uploadsuccess");
		    
		    queryResults("/getResult/")	
		},
//		getUploadedSize:function(file){
//		 	var data = {
//		 		data : {
//		 			fileName : file.name,
//		 			lastModifiedDate : file.lastModifiedDate.getTime()
//		 		}
//		 	};
//		 	console.log(data);
//		 	var url = '/getloadedsize/';
//		 	var uploadedSize = 0;
//		 	$.ajax({
//		 		url : url,
//		 		data : data,
//		 		async : false,
//		 		type : 'POST',
//		 		success : function(returnData){
//		 			returnData = JSON.parse(returnData);
//		 			uploadedSize = returnData.uploadedSize;
//		 		}
//		 	});
//		 	return uploadedSize;
//         }

	});
	$('#btn1').click(function(){
		up.stop();
	});
	$('#btn2').click(function(){
		up.upload('*');
	});
	$('#btn3').click(function(){
		up.cancel('*');
	});
	$('#btn4').click(function(){
		up.disable();
	});
	$('#btn5').click(function(){
		up.ennable();
	});
    $("#file-uploader-btn").click(function(){
        $("#select_btn_1").click();
	boxarea_class = "originShow";
    })

});
