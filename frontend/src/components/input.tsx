import { useController } from "react-hook-form";
import { Input } from "@nextui-org/react";

export function InputCustom(props: any) {
  const { field } = useController({
    control: props.control,
    defaultValue: props.defaultValue,
    name: props.name,
  });

  return (
    <Input
      {...props}
      value={field.value}
      size="md"
      onChange={field.onChange}
      variant="bordered"
      classNames={{
        label: ["text-black/60", "font-[Poppins]", "w-full"],
        input: ["bg-transparent", "text-black/90", "font-[Poppins]",  "placeholder:text-default-600/50"],
      }}
    />
  );
}
