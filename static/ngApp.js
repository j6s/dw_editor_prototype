angular.module('DevwarsApp', [])
    .controller('TeamController', [function() {

        this.primary = 'html';
        this.secondary = 'css';
        this.tertiary = 'js';

        this.select = function(selected) {
            this.primary = selected;
            var notSelected = ['html', 'css', 'js'];
            notSelected.splice(notSelected.indexOf(selected), 1);
            this.secondary = notSelected[0];
            this.tertiary = notSelected[1];
            console.log(this.primary, this.secondary, this.tertiary);
        }

        this.getClass = function(forLang) {
            return (this.primary == forLang) ? 'primary' :
                (this.secondary == forLang) ? 'secondary' :
                (this.tertiary == forLang) ? 'tertiary' :
                '';
        }
    }])


// some other stuff
// enable tabs in textareas
// shamelessly copied from http://stackoverflow.com/questions/6140632/how-to-handle-tab-in-textarea/18303822#18303822
var textareas = document.querySelectorAll('textarea');
for (var i = 0; i < textareas.length; i++) {
	textareas[i].addEventListener('keydown',function(e) {
    	if(e.keyCode === 9) { // tab was pressed
        	// get caret position/selection
	        var start = this.selectionStart;
    	    var end = this.selectionEnd;

	        var target = e.target;
    	    var value = target.value;

	        // set textarea value to: text before caret + tab + text after caret
    	    target.value = value.substring(0, start)
        	    + "\t"
          	  + value.substring(end);

        	// put caret at right position again (add one for the tab)
        	this.selectionStart = this.selectionEnd = start + 1;

        	// prevent the focus lose
        	e.preventDefault();
    	}
	},false);
}
