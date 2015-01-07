function todoController($scope) {
	$scope.todos = [
		{text:'Example 1', done: false},
		{text:'Example 2', done: false},
		{text:'Example 3', done: false}	
	];

	$scope.add = function(event) {
		if((event.which==13) && ($scope.user_input.length>0)) {
			$scope.todos.push({text:$scope.user_input, done: false, editable: false});
			$scope.user_input = '';
		}
	};
	
	$scope.edit = function(todo, event) {
		$(event.target).closest('div.row').find('#text').attr('contenteditable', true).focus();
	}

	$scope.editDone = function(todo, event) {
		if(event.which==13) {
			$scope.editBlur(todo);
		}
	}

	$scope.editBlur = function(todo) {
		var self = $(event.target).closest('div.row').find('#text');
		if(self.html().length>0) {
			self.removeAttr('contenteditable');
			todo.text = $(event.target).html();
		} else {
			$scope.delete(todo);
		}
	}

	$scope.done = function(todo) {
		todo.done = !todo.done;
	}

	$scope.isDone = function(todo) {
		if(todo.done) {
			return "done";
		}
	}

	$scope.delete = function(todo) {
		$scope.todos = _.reject($scope.todos, function(_todo) {
			return _todo == todo;
		})
		console.log($scope.todos);
	}
}