 /*
 * jTabs - 
 * http://do-web.com/jtabs/overview
 *
 * Copyright 2011, Miriam Zusin
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://do-web.com/jtabs/license
 */

(function($){
   $.fn.jTabs = function(options){
	   
	var options = $.extend({
		nav: "ul",
		tab: "div",
		effect: "", //fade, fadeIn, slide, slide_down
		speedOpen: 700,
		speedClose: 500,
		hashchange: true
	},options);

	return this.each(function() {            
		var hndl = this;
		
		this.nav = $(this).find(options.nav);
		this.tabs = $(this).find(options.tab);
		this.lastAnchor = "";
		
		this.nav.addClass("jtab-nav");
		this.tabs.addClass("jtab-tab");
				
		this.open = function(nextEl){
			switch(options.effect){
				case "fade":{
					nextEl.fadeIn(options.speedOpen);
					break;
				}
				case "fadeIn":{
					nextEl.fadeIn(options.speedOpen);
					break;
				}
				case "slide":{
					nextEl.slideDown(options.speedOpen);
					break;
				}
				case "slideDown":{
					nextEl.slideDown(options.speedOpen);
					break;
				}
				default:{
					nextEl.show();
					break;
				}
			}	
		};		
		
		this.makeEffect = function(visibleEl, nextEl){
			
			if(visibleEl == undefined){			
				hndl.open(nextEl);
			}
			else{				
				switch(options.effect){
					case "fade":{
						visibleEl.fadeOut(options.speedClose, function(){
							hndl.open(nextEl);
						});	
						break;
					}
					case "fadeIn":{						
						visibleEl.hide();
						hndl.open(nextEl);
						break;
					}
					case "slide":{					
						visibleEl.slideUp(options.speedClose, function(){
							hndl.open(nextEl);
						});				
						break;
					}
					case "slideDown":{		
						visibleEl.hide();
						hndl.open(nextEl);				
						break;
					}
					default:{
						visibleEl.hide();
						nextEl.show();
						break;
					}
				}		
			}
		};
		
		this.display = function(anchor){
			
			if(!this.tabs.is(":animated ")){
				hndl.makeEffect(hndl.getTabByAnchor(hndl.lastAnchor), hndl.getTabByAnchor(anchor));	
				hndl.set_active(anchor);
				
				//update last anchor
				hndl.lastAnchor = anchor;
			}
		};
		
		this.getTabByAnchor = function(anchor){
		
			var el = hndl.tabs.eq(0);
			
			hndl.tabs.each(function(){	
				
				if($(this).hasClass(anchor.replace("#",""))){
					el = $(this);
				}
			});
			
			return el;
		};
		
		this.set_active = function(anchor){
		
			hndl.nav.find("li").removeClass("active");
			
			if(anchor.replace("#","") == ""){
				hndl.nav.find("li:eq(0)").addClass("active");  
			}
			else{
				hndl.nav.find("li").each(function(){
					if($(this).find("a[href='#" + anchor.replace("#","") + "']").length > 0){
						$(this).addClass("active");
					}
				});
			}
			
		};
			
		if(options.hashchange){
			hndl.updateState = function(anchor){
				hndl.display(anchor);
			};                   
					   
			//onload
			$(window).hashchange(function(){
				hndl.updateState(location.hash)
			});
			
			hndl.tabs.hide();
			hndl.updateState(location.hash);
		}
		else{
			hndl.tabs.hide();
			hndl.display("");
			
			hndl.nav.find("a").unbind().click(function(){
				hndl.display($(this).attr("href").replace("#",""));  
				return false;
			});   
		}	
		
				
	});    
   };
})(jQuery);
