import { Directive, OnChanges, Input, Inject, PLATFORM_ID, ElementRef, Renderer, SimpleChanges } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ɵDomAdapter as DomAdapter, DOCUMENT, ɵgetDOM as getDOM} from '@angular/platform-browser';

import { ABTestingSelectionStrategy } from './declarations/strategy'

@Directive({selector: '[abTesting]'})
export class ABTestingDirective implements OnChanges{
    private isBrowser:boolean = true;
    public version:string;
    private _dom: DomAdapter;
    private experimentName:string;
    @Input() set abTesting(v:string){
        this.experimentName = v;
        this.__initFunction();
    }
    @Input('abStyleRules') styleRules:any = {};
    @Input('abClassRules') classRules:any = {};
    @Input('abHidden') hiddenRules:any = {};

    
    constructor(@Inject(DOCUMENT) private _doc: any, private strategy:ABTestingSelectionStrategy, @Inject(PLATFORM_ID) platformId:Object,
        private elementRef:ElementRef, private renderer:Renderer){
        this.isBrowser = isPlatformBrowser(platformId);
    }

    private __initFunction(){
        if(this.isBrowser){
            this.version = this.parse(document.cookie)[`AB_${this.experimentName}`] || this.strategy.selectVersionDisplayed(this.experimentName);
            document.cookie = `AB_${this.experimentName} = `+this.version;
        }else{
            /*this.version = this.parse(Zone.current.get('req').header('cookie'))[`AB_${this.experimentName}`] || this.strategy.selectVersionDisplayed(this.experimentName);*/
        }
    }

    ngOnChanges(change:SimpleChanges){
        if(this.isBrowser){
            if(this.styleRules[this.version]){
                this.elementRef.nativeElement.setAttribute("style", this.styleRules[this.version]);
            }
            
            if(this.classRules[this.version]){
                this.classRules[this.version].split(" ").forEach(_clazz => {
                    this.elementRef.nativeElement.classList.add(_clazz)
                });
            }

            if(this.hiddenRules[this.version]){
                this.elementRef.nativeElement.remove();
            }
        }else{
            if(this.styleRules[this.version]){            
                this.elementRef.nativeElement.attribs.style = this.styleRules[this.version];
            }

            if(this.classRules[this.version]){
                this.elementRef.nativeElement.attribs.class += ' '+this.classRules[this.version];
            }

            if(this.hiddenRules[this.version]){
                this.elementRef.nativeElement.attribs.style = "display:none";
            }
        }
    }

    private parse(str:string):any {
        var decode = decodeURIComponent;
        var obj = {};
        if(str){
            var pairs = str.split(/ *; */);
            var pair;
            if ('' == pairs[0]) return obj;
            for (var i = 0; i < pairs.length; ++i) {
                pair = pairs[i].split('=');
                obj[decode(pair[0])] = decode(pair[1]);
            }
        }
        return obj;
    }
}