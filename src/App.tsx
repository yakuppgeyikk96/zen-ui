import { Send } from "lucide-react";
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
        width: "25%",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <form>
        <Input
          name="checkbox"
          label="Is this a checkbox?"
          type="checkbox"
          placeholder="Is this a checkbox?"
          size="large"
          onChange={(e) => {
            console.log(e.target.value);
          }}
          onInputChange={(value) => {
            console.log(value);
          }}
        />
        <br />

        <Input
          name="radio"
          label="Is this a radio?"
          type="radio"
          placeholder="Is this a radio?"
          size="large"
        />

        <br />
        <Button
          variant="primary"
          type="submit"
          icon={<Send />}
          fullWidth
          onClick={() => {
            inputRef.current?.focus();
          }}
        >
          Focus Input
        </Button>
      </form>
    </div>
  );
}

export default App;
