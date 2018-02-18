import { Directive, ElementRef} from '@angular/core';
import * as $ from 'jquery';

@Directive( {
    selector: '[colorPourcent]'
})
export class ColorPourcentDirective {

    private $element: JQuery;

    constructor( el: ElementRef ) {
        this.$element = $(el.nativeElement);
        this.colorPourcent();

    }

    colorPourcent(){
        setTimeout(() => {

            let reg = "-";

            if(this.$element.attr("id").match(reg)){
                this.$element.css("color", "red");
            }else if(!this.$element.attr("id").match(reg)){
                this.$element.css("color", "green");
            }

        }, 50);
    }


}