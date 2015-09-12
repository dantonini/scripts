(function() {
	var addHighlightParentLogic;
	
	var parentStyle = ".parent { background-image: url(/images/notes/red.png) !important; transform: scale(1.3); }"
	
	var childStyle = ".child{ background-image: url(/images/notes/blue.png) !important; scale(0.7); }"
	
	var hiddenStyle = ".hidden{ opacity: 0.3; }"
  
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

	var parent_id = task.model.attributes.custom_field_1;
	if(parent_id && parent_id != ""){
		task.$el.find(".external_id").after("<img class='has-parent' width='16px' src='http://www.vigilanzalalince.it/sito/wp-content/themes/lince/wpv_theme/assets/images/icons/gray_32/user.png' />")	

	    	$(task.$el).find(".has-parent").on("mouseover", function(){
			applyToTask(task, 
				function(t){t.$el.addClass("parent");}, 
				function(t){t.$el.addClass("child");},
				function(t){t.$el.addClass("hidden");})
		});
		$(task.$el).find(".has-parent").on("mouseout", function(){
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
