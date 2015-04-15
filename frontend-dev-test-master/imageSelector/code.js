
var imagesJSON = ([
{
"display": "Fumeur",
"url": "imageSelector/images/Fumeur.gif"
},
{
"display": "Fumeur4",
"url": "imageSelector/images/Fumeur_4.gif"
},
{
"display": "Fumeur5",
"url": "imageSelector/images/Fumeur_5.gif"
},
{
"display": "Fumeur7",
"url": "imageSelector/images/Fumeur_7.gif"
},
{
"display": "Fumeur8",
"url": "imageSelector/images/Fumeur_8.gif"
},
{
"display": "Fumeur9",
"url": "imageSelector/images/Fumeur_9.gif"
},
{
"display": "Fumeur12",
"url": "imageSelector/images/Fumeur_12.gif"
},
{
"display": "Fumeur13",
"url": "imageSelector/images/Fumeur_13.gif"
},
{
"display": "Fumeur14",
"url": "imageSelector/images/Fumeur_14.gif"
},
{
"display": "Fumeur16",
"url": "imageSelector/images/Fumeur_16.gif"
},
{
"display": "Fumeur17",
"url": "imageSelector/images/Fumeur_17.gif"
},
{
"display": "Fumeur18",
"url": "imageSelector/images/Fumeur_18.gif"
},
{
"display": "Fumeur19",
"url": "imageSelector/images/Fumeur_19.gif"
},
{
"display": "Fumeur20",
"url": "imageSelector/images/Fumeur_20.gif"
}
]);

var cssId = 'imageSelectorCSS';  // you could encode the css path itself to generate id..
if (!document.getElementById(cssId))
{
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.id   = cssId;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'imageSelector/styles.css';
    link.media = 'all';
    head.appendChild(link);
}

function Handler(){
	this.listeners = new Array();
}
Handler.prototype = {
	addListener: function(element, event, handler, capture) {
		element.addEventListener(event, handler, capture);
		this.listeners.push({element: element, 
						 event: event, 
						 handler: handler, 
						 capture: capture});
	},
	removeAllListeners: function() {
		this.listeners.forEach(function(h) {
			h.element.removeEventListener(h.event, h.handler, h.capture);
			delete h;
		});
	}
};

function Emoj(name, url) {
  this.name = name;
  this.url = url;
  this.imageLoaded = false;
  this.img = new Image();
}
 
Emoj.prototype = {
  loadImage: function() {
    this.img.src = this.url;
  },
  
  getImage: function() {
	  return this.img;
  },
  
  getElt: function() {
	  return "<img src="+this.url+">";
  },
  getName: function() {
	  return this.name;
  }
}

function EmoticonSelector(textContainer) {
	this.textContainer = textContainer;
	this.imgArray = new Array();
	this.mouseHandler = new Handler();
	//this.imageSelectorDiv = this.createPopup();
	//var imageSelectorDiv = document.getElementById(devId);
	
	this.imageSelectorDiv=document.createElement('div');
	$(this.imageSelectorDiv).addClass("popup_box").appendTo("body");
    
	
	
	//var $imageSelectorDiv = $("<div>", {id: "imageSel", class:"popup_box"}).appendTo('body');
	//var $imageSelectorDiv = $('<div />').appendTo('body');
	//document.getElementsByTagName('body')[0].appendChild($(imageSelectorDiv));
	
	//$( "body" ).append(this.imageSelectorDiv);
	/*
	var devId = 'imageSelectorDIV';  // you could encode the css path itself to generate id..
	if (!imageSelectorDiv)
	{
		this.imageSelectorDiv = document.createElement('div');
		this.imageSelectorDiv.id = devId;
		this.imageSelectorDiv.className = 'popup_box';
		document.getElementsByTagName('body')[0].appendChild(this.imageSelectorDiv);
		//theDiv.append('<a id="popupBoxClose">Close</a>');  

	}
	var jqueryImgSel = $("#imageSelectorDIV");
	*/
	//alert($(this.imageSelectorDiv));
	//var disp = $(this.imageSelectorDiv).css("background-color");
	//alert(disp);
	//$(this.imageSelectorDiv).css("display","block"); 
	//alert(this.imageSelectorDiv);
}

EmoticonSelector.prototype = {
	
	loadImages: function () {
		var out = "";
		var i;
		for(i = 0; i<imagesJSON.length; i++) {
			var im = new Emoj (imagesJSON[i].display, imagesJSON[i].url);
			im.loadImage();
			this.imgArray.push(im);
		}
		//this.createPopup();
	},
	
	clicked: function (im) {
		var sel, range, node;
		if (window.getSelection) {
			sel = window.getSelection();
			if (sel.getRangeAt && sel.rangeCount) {
				range = window.getSelection().getRangeAt(0);
				node = range.createContextualFragment(im.getElt());
				range.insertNode(node);
			}
		} else if (document.selection && document.selection.createRange) {
			document.selection.createRange().pasteHTML(im.getImage());
		}
		//EmoticonSelector.prototype.hideImages();
	},
	
	hideImages: function (handl, sel, cont) {
		handl.removeAllListeners();
		//$(this.imageSelectorDiv).css({"display":"none"});
		
		//$( this.imageSelectorDiv ).css( "opacity:1" );
		$(sel).css("display", "none");
		$(cont).focus();
		document.getSelection().removeAllRanges();
		/*this.mouseHandler.removeAllListeners();
		//$(this.imageSelectorDiv).css({"display":"none"});
		
		//$( this.imageSelectorDiv ).css( "opacity:1" );
		$(this.imageSelectorDiv).css("opacity", "1");
		$(this.textContainer).focus();*/
	},
			
	showImages: function () {
		var _this = this;
		$(_this.imageSelectorDiv).css("display","block"); 
		this.imgArray.forEach(function(entry) {
			var im = entry;
			console.log(im.getElt());
			var img = im.getImage();
			$(_this.imageSelectorDiv).prepend(img);
			
			_this.mouseHandler.addListener(img, 'click', function(){
				EmoticonSelector.prototype.clicked(im);
				EmoticonSelector.prototype.hideImages(_this.mouseHandler, _this.imageSelectorDiv, _this.textContainer);
			}, true);
		});
		//console.log($(_this.imageSelectorDiv));
	},
	

}