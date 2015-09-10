(function() {
  var addHighlightParentLogic;

  addHighlightParentLogic = function(task) {
    	$(task.$el).on("mouseover", function(){
		var parent_id = task.model.attributes.external_id.split(",")[0];
		window.board.tasks.each(function(t){
			var parentIndex = t.model.attributes.external_id.split(",").length - 1
			var t_id = t.model.attributes.external_id.split(",")[parentIndex];
			
			if(t_id && parent_id && t_id == parent_id && t.model.attributes.id != task.model.attributes.id){
				t.prevBackground = t.$el.css("background-image");
				t.$el.css("background-image", "url(/images/notes/orange.png)");
			} 	
		});
	});
	$(task.$el).on("mouseout", function(){
		var parent_id = task.model.attributes.external_id.split(",")[0];
		window.board.tasks.each(function(t){
			var parentIndex = t.model.attributes.external_id.split(",").length - 1
			var t_id = t.model.attributes.external_id.split(",")[parentIndex];
			
			if(t_id && parent_id && t_id == parent_id){
				t.$el.css("background-image", t.prevBackground);
			} 	
		});
		
	});

    return task.$el.find('.task_name');
  };

  window.board.on('task:render', addHighlightParentLogic);

  setTimeout(function() {
    return window.board.tasks.each(addHighlightParentLogic);
  }, 750);

}).call(this);
