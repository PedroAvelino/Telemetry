/*
VUE App's Directive.
Copyright (c) 2019. Scott Henshaw, Kibble Online Inc. All Rights Reserved.

<div v-sample widget="Sample" enum="SURFACE" available="true" v-bind:author="{ a: someObject }">
    -- Injected sample HTML code here --
    <div id="sample-inner"></div>
</sample-directive>
*/
'use strict';
class Controller {
    constructor( template = "") {
        this.template = template;
    }

    bind( el, binding, vnode ) {

        /*
        binding = {
            name: The name of the directive, without the v- prefix.
            value:
                The value passed to the directive.
                For example in v-my-directive="1 + 1",
                the value would be 2.
            oldValue:
                The previous value, only available in update and componentUpdated.
                It is available whether or not the value has changed.
            expression:
                The expression of the binding as a string.
                For example in v-my-directive="1 + 1", the expression would be "1 + 1".
            arg:
                The argument passed to the directive, if any.
                For example in v-my-directive:foo, the arg would be "foo".
            modifiers:
                An object containing modifiers, if any.
                For example in v-my-directive.foo.bar, the modifiers object would be { foo: true, bar: true }.
        }
        */

        el.innerHTML = this.template;
    }

    inserted( el ) {
        // called when this note is inserted in the dom
    }

    update() {
        // called after container VNode is updated, before children

    }
}

export default Vue.directive('sample', new Controller('<!-- template -->'));