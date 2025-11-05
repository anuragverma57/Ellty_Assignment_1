
export interface MultiSelectOption {
    label: string;
    checked: string;
}

export interface MultiSelectProps {
    optionsList: MultiSelectOption[];
    cb: any;
}