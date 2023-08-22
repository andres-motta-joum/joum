import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-codigo-sms',
  templateUrl: './codigo-sms.component.html',
  styleUrls: ['./codigo-sms.component.scss']
})
export class CodigoSMSComponent {
  @ViewChildren('verificationInput') verificationInputs!: QueryList<ElementRef>;
  @ViewChild('firstInput') firstInput!: ElementRef;
  private algo: boolean = false;

  onInput(event: Event,keyboardEvent: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;

    if (/^\d$/.test(inputValue)) {
      if (inputValue.length === 1 && !this.algo) {
        const nextIndex = index + 1;
        const nextInput = this.verificationInputs.toArray()[nextIndex];
        if (nextInput) {
          nextInput.nativeElement.focus();
        }
      }
    } else {
      input.value = ''; 
    }

    if (inputValue.length > 1 ) {
      input.value = inputValue.charAt(0);
    }
    if (keyboardEvent.repeat) {
      keyboardEvent.preventDefault();
    }
  }
  onInputBefore(event: Event,keyboardEvent: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;
    if (inputValue.length !== 0) {
      if (keyboardEvent.key === 'Backspace') {
        this.algo = false;
      }else{
        this.algo = true;
        keyboardEvent.preventDefault();
      }
    }
    if (inputValue.length === 0 && keyboardEvent.key === 'Backspace') {
      this.algo = false;
      const previousIndex = index - 1;
      if (previousIndex >= 0) {
        const previousInput = this.verificationInputs.toArray()[previousIndex];
        if (previousInput) {
          previousInput.nativeElement.focus();
          previousInput.nativeElement.value = '';
        }
      }
    }
    if (inputValue.length === 0 && keyboardEvent.key === 'e') {
      keyboardEvent.preventDefault();
    }
    if (inputValue.length === 0 && (keyboardEvent.key !== 'e' && keyboardEvent.key !== 'Backspace')) {
      this.algo = false;
    }

  }

  ngAfterViewInit(): void {
    this.firstInput.nativeElement.focus();
  }
  
}
