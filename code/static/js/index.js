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
    static preView(){
        document.getElementById("video").src = window.URL.createObjectURL(document.getElementById("select_btn_1").files[0]);
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
}
void upload;
var postJson={};
var boxarea_class = null;
var uploader = 'http://95.163.194.215:5653/upload/';
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
		removeTimeout:9999999,
		uploader:uploader,
		onUploadSuccess:function(){
                    console.log("uploadsuccess");
                    upload.detect();
		},
		// getUploadedSize:function(file){
		// 	var data = {
		// 		data : {
		// 			fileName : file.name,
		// 			lastModifiedDate : file.lastModifiedDate.getTime()
		// 		}
		// 	};
		// 	console.log(data);
		// 	var url = 'http://95.163.194.215:5653/getloadedsize/';
		// 	var uploadedSize = 0;
		// 	$.ajax({
		// 		url : url,
		// 		data : data,
		// 		async : false,
		// 		type : 'POST',
		// 		success : function(returnData){
		// 			returnData = JSON.parse(returnData);
		// 			uploadedSize = returnData.uploadedSize;
		// 		}
		// 	});
		// 	return uploadedSize;
        // }	
        
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

    $(document).on('click',".boxLeft>span .pickfile",function(){
        var urlpath = prompt("输入地址并确认或者点击取消来选择本地文件");
        if(urlpath){
         $(this).parent().attr("val",urlpath);
         $(this).html(urlpath); 
        }else{
         $('.selectbtn').trigger('click');
         boxarea_class = $(this).parent().attr("class");
        }
    })
     $(document).on('click',".startedit",function(){
     	switch($("input[name='radio']:checked").attr("id")){
     		case "type-1":
     			postJson["type"]="1-1-1-1";
     			break;
     		case "type-2":
     			postJson["type"]="1-3";
     			break;
     		case "type-3":
     			postJson["type"]="9";
     			break;
     		case "type-4":
     			postJson["type"]="all";
     			break;
     	}
     	upload.postUrl(uploader,postJson);
    })

});
