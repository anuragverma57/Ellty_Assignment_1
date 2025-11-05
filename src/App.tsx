import type { MultiSelectOption } from "./components/multiSelect";
import MultiSelect from "./components/multiSelect/MultiSelect";
const options: MultiSelectOption[] = [
  { label: "Page 1", value: "page1" },
  { label: "Page 2", value: "page2" },
  { label: "Page 3", value: "page3" },
  { label: "Page 4", value: "page4" },
];

function handleButtonClick(selected: string[]) {
  alert(`Options Selected are: ${selected.join(", ")}`);
}

export default function App() {
  return (
    <div
      className="main_wrap"
    >
      <h2>Eltty Assignment</h2>
      <p style={{ maxWidth: "400px", textAlign: "center", marginBottom: "30px" }}>
        Choose the pages you want to include in your selection below. You can
        select all, or pick only specific ones.
      </p>

      <MultiSelect optionsList={options} cb={handleButtonClick} />
    </div>
  );
}