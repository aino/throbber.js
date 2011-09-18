/*global hljs, examples:true */

examples = (function(window) {

    return function() {

        var document = window.document,
            examples = document.getElementById('examples'),
            codes = examples.getElementsByTagName('code'),
            toggler, code, i,
            show = 'Show code',
            hide = 'Hide code',
            torun = [],
            ie = '<div><h2>Greetings old friend!</h2><p>Your browser does not fully support Throbber.js, ' +
                 'but have a look at <a href="#ie">Example 04</a> where we describe how you can use a fallback.</p></div>',

            onclick = function(code) {
                return function() {
                    if( code.style.display == 'block' ) {
                        code.style.display = 'none';
                        this.innerHTML = show;
                        return false;
                    }
                    code.style.display = 'block';
                    this.innerHTML = hide;
                    return false;
                };
            };

        if ( !( 'getContext' in document.createElement('canvas') ) ) {
            document.getElementById('note').innerHTML = ie;
        }

        for (i=0; codes[i]; i++) {
            torun.push('(function() {'+codes[i].innerHTML+'}());');
        }

        hljs.initHighlighting();

        for (i=0; codes[i]; i++) {

            code = codes[i].parentNode;
            toggler = document.createElement('a');
            toggler.href = '#';
            toggler.innerHTML = show;

            toggler.onclick = onclick( code );

            code.style.display = 'none';
            code.parentNode.insertBefore( toggler, code );
            eval( torun[i] ); // not evil!
        }
    };

}(this));