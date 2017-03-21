/* ------------------------ WELCOME TO WIZARD.JS -------------------------
 * This wizard turns html markup like so:
 *
 *	<div class="wizard" id="myWizard">
 *			<div class="step">
 *					bla bla bla
 *					<button data-action="next">Next</button>
 *					<button data-action="prev">Back</button>
 *			</div>
 *			<div class="step">
 *					bla bla bla
 *					<button data-action="cancel">Cancel</button>
 *			</div>
 *  </div>
 *
 * ...into a "setup wizard" series of steps kind of thing.
 *
 * To use just do something like:
 *
 * 		var myWizard = $('#myWizard').wizard();
 *
 * ...and you should be all set to do things like myWizard.percentComplete(), 
 * myWizard.onNext = function(){ //my stuff here }, etc.
 *
 * Things in each wizard with specific data-actions (next, prev, and cancel) 
 * are automatically all set up to do their thing.
 *
 * TIP: When attaching custom events, attach them to myWizard.parent 
 *			This is because the wizard resets its html every cancel.
 *			ie. myWizard.parent.on(), no $("thing in wizard").on()
 * --------------------------------------------------------------------------
 */

function Wizard( parent ){

	this.parent = parent;
	this.initState = parent.html();	//save initial state for reset on cancel
	this.steps;
	this.current;
	this.onNext = function(){}; //client defined actions that happen at every next
	this.onPrev = function(){}; //client defined actions that happen at every prev
	this.onStep = function(){}; //client defined actions that happen at every step
	this.onChange = function(){}; //client defined actions that happen at every prev, next, or step
	this.onInit = function(){}; //client defined actions that happen at every init
	this.onEnd = function(){}; //client defined actions that happen when user tries to advance past the end
	this.onBeforeStart = function(){}; //client defined actions that happen when user tries to go back past the beginning
	this.onCancel = function(){}; //client defined actions that happen on cancel
	this.onEnable = function( $steps ){}; //client defined actions that happen on enable, is passed enabled steps
	this.onDisable = function( $steps ){}; //client defined actions that happen on cancel, is passed disabled steps
	
	/* initializes the wizard, and resets on cancel
	 *
	 * options = {
	 * 		reset: true/false/string,		< if the wizard should reset to the init state, or to an html string
	 *		startAt: number							< the step to start at, 0 is default
	 * } 
	 *
	 */
	this.init = function( options ){ 
		//make sure options is an array
		if( typeof options != 'object' ){
			options = {};
		}
		//resetting the wizard to this.initState
		if( options['reset'] ){
			if( typeof options['reset'] == 'string' ){
				this.initState = options['reset']; //set initState to html string
			}
			this.parent.html(this.initState); //revert to previous initial state
		}
		//gathering steps
		this.steps = parent.find('.step').not('.disabled');
		$('.step.disabled').hide();
		if( options['startAt'] && typeof options['startAt'] == 'number' && options['startAt'] >= 0 && options['startAt'] < this.steps.length ){
			this.current = options['startAt'];
		}else{
			this.current = 0;
		}
		//setting visibility of steps
		for( var i=0; i<this.steps.length; i++){
			if( i == this.current ){
				$(this.steps[i]).show();
			}else{
				$(this.steps[i]).hide();
			}
		}
		this.onInit();
		return this;
	};
	
	//advances the wizard one step
	//won't go past the last step
	this.next = function(){
		this.scrollIntoView();
		if(this.current<this.steps.length-1){
			var toHide = $(this.steps[this.current]);
			var toShow = $(this.steps[++this.current]);
			toHide.fadeOut(200, function(){
				toShow.fadeIn(100);
			});
			this.onChange();
			this.onNext();
		}else{
			this.onChange();
			this.onEnd();
		}
		return this;
	};
	
	//moves the wizard back one step
	//won't go past the first step
	this.prev = function(){
		this.scrollIntoView();
		if(this.current > 0){
			var toHide = $(this.steps[this.current]);
			var toShow = $(this.steps[--this.current])
			toHide.fadeOut(200, function(){
				toShow.fadeIn(100);
			});
			this.onChange();
			this.onPrev();
		}else{
			this.onChange();
			this.onBeforeStart();
		}
		return this;
	};
	
	//moves the wizard to the desiered step number
	//(step is an integer, not a jQuery object)
	this.step = function(step){
		if(step>=0 && step<this.steps.length){
			this.scrollIntoView();
			var toShow = $(this.steps[step]);
			$(this.steps[this.current]).fadeOut(400, function(){
				toShow.show(400);
			});
			this.current = step;
			this.onChange();
			this.onStep();
		}
		return this;
	};
	
	//reverts wizard back to original state
	this.cancel = function(){
		this.scrollIntoView();
		var thisWizard = this;
		$(this.steps[this.current]).fadeOut(400, function(){
			thisWizard.init({reset:true});
		});
		this.onCancel();
		return this;
	};
	
	//get steps DOM object, indexed starting at 0 
	this.getStep = function(n){
		if( n > this.steps.length || n < 0 ){
			return null
		}
		return $(this.steps[n]);
	};
	
	//returns an integer between 0 and 100 inclusive
	this.percentComplete = function(){
		return Math.floor(this.current/this.steps.length*100);
	};

	//removes the given step n from the wizard, or any step matching a query string
	this.disable = function(step){
		var $step;
		if( typeof step == 'number' ){
			if(step>=0 && step<this.steps.length){
				$step = $(this.steps[step]);
				$step.addClass('disabled').hide();
			}
		}else if( typeof step == 'string' ){
			$step = $(step+".step", this.parent);
			$step.addClass('disabled').hide();
		} 
		this.init({reset:false, startAt:this.current});
		this.onDisable( $step );
		return this;
	};

	//add the given step n to the wizard, or any step matching a query string
	this.enable = function(step){
		var $step;
		if( typeof step == 'number' ){
			if(step>=0 && step<this.steps.length){
				$step = $(this.steps[step]);
				$step.removeClass('disabled').show();
			}
		}else if( typeof step == 'string' ){
			$step = $(step+".step", this.parent);
			$step.removeClass('disabled').show();
		}
		this.init({reset:false, startAt:this.current});
		this.onEnable( $step );
		return this;
	};

	//when going to another step, scroll the next step into view if it is off the screen
	this.scrollIntoView = function(){
		var position = this.parent[0].getBoundingClientRect();
		//if the top of the step is out of the window
		if( position.top < 0 || position.top > $(window).height()){
			//scroll top back into window
			$('html, body').animate({
	      scrollTop: this.parent.offset().top - 180
	  	}, 800);
		}
		return this;
	};

    //reverts wizard back to original state
    this.close = function(){
        var thisWizard = this;
        var domParent = this.parent[0];
        domParent.style.display="none";
        return this;
	};

	/* setup stuff */
	
	//calling initialization
	this.init();

	//listeners
	var thisWizard = this;
	this.parent.on('click', '[data-action=next]', function(e){
		e.preventDefault();
		thisWizard.next();
		thisWizard.scrollIntoView();
	});
	this.parent.on('click', '[data-action=prev]', function(e){
		e.preventDefault();
		thisWizard.prev();
		thisWizard.scrollIntoView();
	});
	this.parent.on('click', '[data-action=cancel]', function(e){
		e.preventDefault();
		thisWizard.cancel();
		thisWizard.scrollIntoView();
	});
    this.parent.on('click', '[data-action=close]', function(e){
        e.preventDefault();
        thisWizard.close();
    });
    this.parent.on('click', '[data-action=goto]', function(e){
        e.preventDefault();
        var stepNumber = e.target.attributes.getNamedItem("step").nodeValue;
        thisWizard.step(stepNumber);
        thisWizard.scrollIntoView();
    });
    this.parent.on('click', '[data-action=ok]', function(e){
        e.preventDefault();

        var v = null;
        e.target.parentNode.childNodes.forEach(function (element, index) {
            if(element.attributes != null && element.attributes.getNamedItem("business-meta") != null) {
                if(element.attributes.getNamedItem("business-meta").nodeValue == 'case') {
                    if(v != null) {
                        v.push(element.value);
                    }
                    else {
                        v = [];
                        v.push(element.value);
                    }
                }
                else {
                    v = element.value;
                }
                return false;
            }
        });

        var nodeType = e.target.attributes.getNamedItem("node").nodeValue;
        var lastTask = app.canvas.getLastTask();
        var shape = null;

        if(nodeType == 'BranchTask') {
            app.canvas.appendBranchTaskFromWizard(lastTask, v);
        }
        else if(nodeType != 'End'){
            app.canvas.appendTask(lastTask, nodeType, v);
        }
        else {
            thisWizard.close();
            return;
        }

        var stepNumber = e.target.attributes.getNamedItem("step").nodeValue;
        thisWizard.step(stepNumber);
        thisWizard.scrollIntoView();
    });
}

//adding to jQuery
var w = {
	wizard: function(){
		$parent = $(this);
		return new Wizard($parent);
	}
}
jQuery.fn.extend(w);