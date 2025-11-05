import React, { useState, useRef, useEffect } from "react";
import "./MultiSelect.css";

export interface MultiSelectOption {
    label: string;
    value: string;
}

export interface MultiSelectProps {
    optionsList: MultiSelectOption[];
    cb: (selected: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ optionsList, cb }) => {
    const [selected, setSelected] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(true);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleOption = (value: string) => {
        setSelected((prev) =>
            prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value]
        );
    };

    const handleOutsideClick = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    const handleDone = () => {
        cb(selected);
        setIsOpen(false);
    };

    const placeholderText =
        selected.length > 0 ? selected.join(", ") : "Select pages...";

    return (
        <div className="multi-select-wrapper" ref={dropdownRef}>
            {/* Input toggle */}
            <input
                type="text"
                readOnly
                value={placeholderText}
                placeholder="Select pages..."
                onClick={() => setIsOpen((prev) => !prev)}
                className="multi-input"
            />

            {/* Dropdown */}
            {isOpen && (
                <div className="multi-container absolute-dropdown">
                    <div className="multi-item all">
                        <span>All pages</span>
                        <input
                            type="checkbox"
                            checked={selected.length === optionsList.length}
                            onChange={() => {
                                if (selected.length === optionsList.length)
                                    setSelected([]);
                                else setSelected(optionsList.map((opt) => opt.value));
                            }}
                        />
                    </div>

                    <div className="divider" />

                    {optionsList.map((opt) => (
                        <div key={opt.value} className="multi-item">
                            <span>{opt.label}</span>
                            <input
                                type="checkbox"
                                checked={selected.includes(opt.value)}
                                onChange={() => toggleOption(opt.value)}
                            />
                        </div>
                    ))}

                    <button className="done-btn" onClick={handleDone}>
                        Done
                    </button>
                </div>
            )}
        </div>
    );
};

export default MultiSelect;
