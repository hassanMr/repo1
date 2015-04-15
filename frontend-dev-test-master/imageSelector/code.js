// The lis of emoticons
// It should be passed as agrument but for now it's "hardcoded" here

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


//Read the file styles.css dynamically
var cssId = 'imageSelectorCSS';  
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

/*
 * Mouseclick event handler
 */
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

function Emoticon(name, url) {
  this.name = name;
  this.url = url;
  this.img = new Image();
}
 
Emoticon.prototype = {
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
	
	this.imageSelectorDiv=document.createElement('div');
	$(this.imageSelectorDiv).addClass("popup_box").appendTo("body");
}

EmoticonSelector.prototype = {
	
	loadImages: function () {
		var out = "";
		var i;
		for(i = 0; i<imagesJSON.length; i++) {
			var im = new Emoticon (imagesJSON[i].display, imagesJSON[i].url);
			im.loadImage();
			this.imgArray.push(im);
		}
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
	},
	
	hideImages: function (handl, sel, cont) {
		handl.removeAllListeners();
		$(sel).css("display", "none");
		$(cont).focus();
		document.getSelection().removeAllRanges();
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
		})
	},
	

}
