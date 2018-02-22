import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

export class FilterState {
    value: string;
    desc: boolean;
}

@Component({
    selector: 'app-filter-mobile',
    templateUrl: './filter-mobile.component.html',
    styleUrls: ['./filter-mobile.component.css']
})
export class FilterMobileComponent implements OnInit, OnChanges {

    @Input() opts: string[];
    @Input() desc: boolean;
    @Output() onFilterChanged = new EventEmitter<FilterState>();

    filterCtrl: FormGroup;
    descIcon = 'keyboard_arrow_down';
    sortOptions = [];
    state: FilterState;

    constructor(
        private fb: FormBuilder
    ) {
        this.filterCtrl = fb.group({
            opts: [],
            value: '',
            desc: false
        });
    }

    ngOnInit() {
        this.filterCtrl.patchValue({
            opts: this.opts
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        this.filterCtrl.patchValue({
            opts: changes.opts.currentValue
        });
    }

    submit() {
    }

    onOptChange(e) {
        const state = <FilterState>({
            value: e.value,
            desc: this.filterCtrl.value.desc
        });
        this.onFilterChanged.emit(state);
    }

    onValueChange(e) {
    }

    onDescChange(e) {
        const state = <FilterState>({
            value: this.filterCtrl.value.value,
            desc: e.checked
        });
        if (e.checked) {
            this.descIcon = 'keyboard_arrow_up';
        } else {
            this.descIcon = 'keyboard_arrow_down';
        }
        this.onFilterChanged.emit(state);
    }

}
