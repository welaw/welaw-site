import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges,
    ElementRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

export class FilterState {
    selectedOpt: string;
    search: string;
    desc: boolean;
}

@Component({
    selector: 'app-filter',
    animations: [
        trigger(
            'filterAnimation', [
                transition(':enter', [
                    style({ opacity: 0, height: 0 }),
                    animate(150, style({ opacity: 1, height: '*' }))
                ]),
                transition(':leave', [
                    style({ opacity: 1, height: '*' }),
                    animate(150, style({ opacity: 0, height: 0 }))
                ])
            ]
        )
    ],
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, OnChanges {

    @Input() opts: string[];
    @Output() onFilterChanged = new EventEmitter<FilterState>();
    private searchField: ElementRef;
    @ViewChild('searchField') set content(content: ElementRef) {
        this.searchField = content;
    }

    filterCtrl: FormGroup;
    descIcon = 'keyboard_arrow_down';
    state: FilterState;
    searching: boolean;
    searchIconColor = '#fafafa';

    constructor(
        private fb: FormBuilder
    ) {
        this.filterCtrl = fb.group({
            opts: [],
            selectedOpt: '',
            search: '',
            desc: true
        });
    }

    ngOnInit() {
        let selectedOpt = '';
        const opts = this.opts;
        if (opts != null && opts.length > 0) {
            selectedOpt = opts[0].replace(' ', '_').toLowerCase();
        }
        this.filterCtrl.patchValue({
            opts: opts,
            selectedOpt: selectedOpt
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        let selectedOpt = '';
        const opts = changes.opts.currentValue;
        if (opts != null && opts.length > 0) {
            selectedOpt = opts[0].replace(' ', '_').toLowerCase();
        }
        this.filterCtrl.patchValue({
            opts: opts,
            selectedOpt: selectedOpt
        });
    }

    submit() {
    }

    onOptChange(e: string) {
        const s = <FilterState>({
            selectedOpt: e,
            desc: this.filterCtrl.value.desc,
            search: this.filterCtrl.value.search
        });
        this.onFilterChanged.emit(s);
    }

    onSearchChange(e) {
        if (e === '') {
        }
        const s = <FilterState>({
            selectedOpt: this.filterCtrl.value.selectedOpt,
            desc: this.filterCtrl.value.desc,
            search: e
        });
        this.onFilterChanged.emit(s);
    }

    onDescChange(e) {
        const s = <FilterState>({
            selectedOpt: this.filterCtrl.value.selectedOpt,
            desc: e,
            search: this.filterCtrl.value.search
        });
        this.onFilterChanged.emit(s);
    }

    clearSearch() {
        this.filterCtrl.patchValue({ search: '' });
        const s = <FilterState>({
            selectedOpt: this.filterCtrl.value.selectedOpt,
            desc: this.filterCtrl.value.desc,
            search: ''
        });
        this.onFilterChanged.emit(s);
    }

    searchToggle() {
        this.searching = !this.searching;
        if (this.searching) {
            setTimeout(() => {
                if (this.searchField == null) {
                    return;
                }
                this.searchField.nativeElement.focus();
            }, 50);
        }
    }
}
