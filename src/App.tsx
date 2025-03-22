import { ArrowLeft, DollarSign } from "lucide-react";
import Button from "./components/atoms/Button";
import Input from "./components/atoms/Input";
import { useRef } from "react";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      style={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Input
        label="Email"
        placeholder="example@domain.com"
        mask="___,___,___,___,___"
        maskChar="_"
        allowedChars={/[0-9]/}
        startAdornment={<DollarSign />}
        onChange={(e) => {
          console.log(e.target.value);
        }}
        onInputChange={(value) => {
          console.log(value);
        }}
      />
      <Button
        variant="primary"
        shadow="lg"
        icon={<ArrowLeft />}
        onClick={() => {
          inputRef.current?.focus();
        }}
      >
        Focus Input
      </Button>
    </div>
  );
}

export default App;
