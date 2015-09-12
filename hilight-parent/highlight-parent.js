(function() {
	var addHighlightParentLogic;
	
	var parentStyle = ".parent{ -webkit-filter: brightness(125%);   filter:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' ><filter id='bright125'><feComponentTransfer><feFuncR type='linear' slope='1.25'/><feFuncG type='linear' slope='1.25' /><feFuncB type='linear' slope='1.25' /></feComponentTransfer></filter></svg>#bright125\");   filter:brightness(125%);  }"
	
	var childStyle = ".child{ -webkit-filter: grayscale(100%);   filter:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' ><filter id='gray'><feColorMatrix in='SourceGraphic' type='saturate' values='0' /></filter></svg>#gray\");   filter:grayscale(100%);}"
	
	var hiddenStyle = ".hidden{ opacity: 0.3;"
  
	$('<style>').html(parentStyle).appendTo('head');
	$('<style>').html(childStyle).appendTo('head');
	$('<style>').html(hiddenStyle).appendTo('head');

  addHighlightParentLogic = function(task) {

	var applyToTask = function(tt, pfunc, cfunc, ofunc){
		var parent_id = tt.model.attributes.custom_field_1;
		var childIdsString = tt.model.attributes.custom_field_2;
		window.board.tasks.each(function(t){
			var t_id = t.model.attributes.external_id;
			if(t_id && t.model.attributes.id != task.model.attributes.id){
				if(childIdsString && childIdsString.indexOf(t_id) >= 0)
					cfunc(t)
				else if (parent_id && t_id == parent_id)
					pfunc(t)
				else
					ofunc(t)
			} 	
		});
	}

	

    	$(task.$el).find(".external_id").on("mouseover", function(){
		applyToTask(task, 
			function(t){t.$el.addClass("parent");}, 
			function(t){t.$el.addClass("child");},
			function(t){t.$el.addClass("hidden");})
	});
	$(task.$el).find(".external_id").on("mouseout", function(){
		applyToTask(task, 
			function(t){t.$el.removeClass("parent");}, 
			function(t){t.$el.removeClass("child");},
			function(t){t.$el.removeClass("hidden");})		
	});

    return task.$el.find('.task_name');
  };

  window.board.on('task:render', addHighlightParentLogic);

  setTimeout(function() {
    return window.board.tasks.each(addHighlightParentLogic);
  }, 750);

}).call(this);
