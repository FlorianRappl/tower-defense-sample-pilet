var Loader = Class.extend({
	init: function(completed, progress, error) {
		this.completed = completed || function() {};
		this.progress = progress || function() {};
		this.error = error || function() {};
		this.sets = [];
	},
	set: function(name, loader, target, keys) {
		this.sets.push({
			name: name,
			resources : keys,
			loader : new loader(target),
		});
	},
	start: function() {
		this.next();
	},
	next: function() {
		var me = this;
		var set = me.sets.pop();

		var completed = function(e) {
			me.next();
		};
		var progress = function(e) {
			e.name = set.name;
			me.progress(e);
		};
		var error = function(e) {
			e.name = set.name;
			me.error(e);
		};

		if (set) {
			me.progress({
				name : set.name,
				recent : '',
				total : set.resources.length,
				progress: 0,
			});
			set.loader.load(set.resources, completed, progress, error);
			return;
		}

		me.completed();
	}
});
