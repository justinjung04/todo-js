(function() {

	$(document).ready(function() {
    	var Todo = Backbone.Model.extend({
			defaults: {
				text: "",
				done: false
			},
			toggle: function() {
				this.set({done: !this.get("done")});
			}
		});

		var TodoView = Backbone.View.extend({
			tagName: "li",
			className: "list-group-item",
			template: _.template($("#item-template").html()),
			events: {
				"click #edit": "_edit",
				"click #done": "_done",
				"click #delete": "_delete",
				"keypress #text": "_editDone",
				"blur #text": "_editBlur"
			},
			initialize: function() {
				this.listenTo(this.model, 'change', this.render);
				this.listenTo(this.model, 'destroy', this.remove);
			},
			render: function() {
				this.$el.html(this.template(this.model.toJSON()));
				this.$el.toggleClass('done', this.model.get('done'));
				return this;
			},
			_edit: function() {
				this.$el.find('#text').attr('contenteditable', true).focus();
			},
			_editDone: function(e) {
				var self = this.$el.find('#text');
				if(e.keyCode==13) {
					this._editBlur();
				}
			},
			_editBlur: function() {
				var self = this.$el.find('#text');
				if(self.html().length<1) {
					this._delete();
				} else {
					self.removeAttr('contenteditable');
				}
			},
			_delete: function() {
				this.model.destroy();
			},
			_done: function() {
				this.model.toggle();
			}
		});

		var TodoListView = Backbone.View.extend({
			el: $("#list-body"),
			events: {
				'keypress #user-input': '_add'
			},
			initialize: function() {
				this.input = this.$el.find('#user-input');
			},
			_add: function(e) {
				if((e.keyCode==13)) {
					var new_todo = new Todo({text: this.input.val()});
					this.input.val('');
					this._addOne(new_todo);
				}
			},
			_addOne: function(todo) {
				var view = new TodoView({model: todo});
				this.$el.append(view.render().el);
			}
		});

    	var todoListView = new TodoListView();
    	todoListView._addOne(new Todo({text: "Example 1"}));
    	todoListView._addOne(new Todo({text: "Example 2"}));
    	todoListView._addOne(new Todo({text: "Example 3"}));
    });

})(jQuery);