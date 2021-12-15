import { Directive, ElementRef, HostListener, Input } from '@angular/core';

// BE AWARE CHANGING CSS IN DIRECTIVE IS BAD PRACTICE / LEARNING PURPOSE ONLY


@Directive({
  selector: '[appCardBorder]'
})
export class CardBorderDirective {

  private initialColor: string = 'transparent';
  private readonly defaultColor: string = '#009688';
  private defaultHeight: number = 100;
  private defaultWidth: number = 100;


  constructor(private el: ElementRef) {
    this.setBorder(this.initialColor);
    this.setHeight(this.defaultHeight);
    this.setWidth(this.defaultWidth);
  }

  @Input('appCardBorder') borderColor?: string;

  @HostListener('mouseenter') onMouseEnter(){
    this.setBorder(this.borderColor || this.defaultColor);
    this.scalePokemon(1.2);
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.setBorder(this.initialColor);
    this.scalePokemon(1);
  }

  private scalePokemon(value: number){
    const pic = this.el.nativeElement.querySelector(".card-img-top");
    pic.style.transition = 'transform 100ms ease-in-out'
    pic.style.transform = `scale(${value})`;
  }


  private setBorder(color: string) {
    this.el.nativeElement.style.border = this.getBorderStyle(color);
  }

  private setHeight(height: number) {
    this.el.nativeElement.style.height = height + '%';
  }

  private getBorderStyle(color: string): string {
    return 'solid 4px ' + color;
  }

  private setWidth(width: number) {
    this.el.nativeElement.style.height = width + '%';
  }


}
