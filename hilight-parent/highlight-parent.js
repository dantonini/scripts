(function() {
	var addHighlightParentLogic;
	
	var parentStyle = ".parent { background-image: url(/images/notes/orange.png) !important; -webkit-transition: background-image 0.2s ease-in-out; transition: background-image 0.2s ease-in-out;}"
	
	var childStyle = ".child{ color: #2a2a2a !important; background-image: url(/images/notes/blue.png) !important; -webkit-transition: background-image 0.2s ease-in-out; transition: background-image 0.2s ease-in-out; }"
	
	var hiddenStyle = ".hidden{ opacity: 0.3; -webkit-transition: opacity .15s ease-in-out;         -moz-transition: opacity .15s ease-in-out;         -ms-transition: opacity .15s ease-in-out;         -o-transition: opacity .15s ease-in-out;         transition: opacity .15s ease-in-out;}"
  
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

	var hasParent = task.model.attributes.custom_field_1 && task.model.attributes.custom_field_1 != "";
	var hasChildren = task.model.attributes.custom_field_2 && task.model.attributes.custom_field_2 != "";
	if(hasParent || hasChildren){
		
		var image = "parent";
		if(hasParent && hasChildren)
			image = "parent-child";
		else if(hasParent)
			image = "child";

		task.$el.find(".external_id").after("<img class='has-parent-or-children' width='16px' src='https://raw.githubusercontent.com/salvatoreromeo/scripts/master/hilight-parent/" + image + ".png' />")	

	    	$(task.$el).find(".has-parent-or-children").on("mouseover", function(){
			applyToTask(task, 
				function(t){t.$el.addClass("parent");}, 
				function(t){t.$el.addClass("child");},
				function(t){t.$el.addClass("hidden");})
		});
		$(task.$el).find(".has-parent-or-children").on("mouseout", function(){
			applyToTask(task, 
				function(t){t.$el.removeClass("parent");}, 
				function(t){t.$el.removeClass("child");},
				function(t){t.$el.removeClass("hidden");})		
		});	
	}
	

    return task.$el.find('.task_name');
  };

  window.board.on('task:render', addHighlightParentLogic);

  setTimeout(function() {
    return window.board.tasks.each(addHighlightParentLogic);
  }, 750);

}).call(this);
