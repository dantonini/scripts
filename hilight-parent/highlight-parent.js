(function() {
  var addHighlightParentLogic;

  var parentStyle = ".parent{  -webkit-filter: saturate(50%);  filter:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' ><filter id='saturate50'><feColorMatrix in='SourceGraphic' type='saturate' values='0.5' /></filter></svg>#saturate50\");   filter:saturate(50%); }"
  
  var childStyle = ".child{   -webkit-filter: brightness(125%);   filter:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' ><filter id='bright125'><feComponentTransfer><feFuncR type='linear' slope='1.25'/><feFuncG type='linear' slope='1.25' /><feFuncB type='linear' slope='1.25' /></feComponentTransfer></filter></svg>#bright125\");   filter:brightness(125%); }"

  addHighlightParentLogic = function(task) {

	var applyToChild = function(tt, pfunc){
		var childIdsString = tt.model.attributes.custom_field_2;
		window.board.tasks.each(function(t){
			var t_id = t.model.attributes.external_id;
			if(t_id && parent_id && childIdsString.indexOf(t_id) >= 0 && t.model.attributes.id != task.model.attributes.id){
				pfunc(t)
			} 	
		});
	}

	var applyToParent = function(tt, pfunc){
		var parent_id = tt.model.attributes.custom_field_1;
		window.board.tasks.each(function(t){
			var t_id = t.model.attributes.external_id;
			if(t_id && parent_id && t_id == parent_id && t.model.attributes.id != task.model.attributes.id){
				pfunc(t)
			} 	
		});
	}

    	$(task.$el).on("mouseover", function(){
		applyToParent(task, function(t){t.$el.addClass("parent");})
		applyToChild(task, function(t){t.$el.addClass("child");})
	});
	$(task.$el).on("mouseout", function(){
		applyToParent(task, function(t){t.$el.removeClass("parent")})
		applyToChild(task, function(t){t.$el.removeClass("child")})		
	});

    return task.$el.find('.task_name');
  };

  window.board.on('task:render', addHighlightParentLogic);

  setTimeout(function() {
    return window.board.tasks.each(addHighlightParentLogic);
  }, 750);

}).call(this);
