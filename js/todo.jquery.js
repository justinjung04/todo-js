(function() {

	function _add(user_input) {
		var new_list = $('<li class="list-group-item"></li>');
		var new_row = $('<div class="row"></div>');
		var new_text = $('<div class="col-md-9 col-sm-9 col-xs-9" id="text"></div>');
		var new_edit_div = $('<div class="col-md-1 col-sm-1 col-xs-1"></div>');
		var new_edit = $('<a id="edit"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a>');
		var new_done_div = $('<div class="col-md-1 col-sm-1 col-xs-1"></div>');
		var new_done = $('<a id="done"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></a>');
		var new_delete_div = $('<div class="col-md-1 col-sm-1 col-xs-1"></div>');
		var new_delete = $('<a id="delete"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>');

		$(new_edit).click(function() {
			_edit($(this).parent().parent());
		});

		$(new_done).click(function() {
			_done($(this).parent().parent().parent());
		});

		$(new_delete).click(function() {
			_delete($(this).parent().parent().parent());
		});

		$(new_text).append(user_input);
		$(new_edit_div).append($(new_edit));
		$(new_done_div).append($(new_done));
		$(new_delete_div).append($(new_delete));
		$(new_row).append($(new_text)).append($(new_edit_div)).append($(new_done_div)).append($(new_delete_div));
		$(new_list).append($(new_row));
		$("#list-body").append($(new_list));
	}

	function _edit(target) {
		var self = target.children('#text');
		self.attr('contenteditable', true).focus();
		self.keypress(function(e) {
			if(e.keyCode==13) {
				if($(this).html().length<1) {
					_delete(target.parent());
				} else {
					$(this).blur();
				}
			}
		}).blur(function() {
			if($(this).html().length<1) {
				_delete(target.parent());
			} else {
				$(this).removeAttr('contenteditable');
			}
		});
	}

	function _done(target) {
		console.log(target);
		target.toggleClass('done');
	}

	function _delete(target) {
		target.remove();
	}

	$(document).ready(function() {
		$("#user-input").keypress(function(e){
			if((e.keyCode==13) && ($(this).val().length>0)) {
				_add($(this).val());
				$(this).val('');
			}
		});

		_add("Example 1");
		_add("Example 2");
		_add("Example 3");
	});

})(jQuery);