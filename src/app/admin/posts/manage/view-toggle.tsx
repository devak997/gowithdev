import { SegmentedControl, VisuallyHidden, rem } from "@mantine/core";
import { IconListDetails, IconGridDots } from "@tabler/icons-react";

interface Props {
  value: "list" | "grid";
  onChange(value: "list" | "grid"): void;
}

function ViewToggle({ value, onChange }: Readonly<Props>) {
  const iconProps = {
    style: { width: rem(20), height: rem(20), display: "block" },
    stroke: 1.5,
  };

  return (
    <SegmentedControl
      value={value}
      onChange={onChange as (value: string) => void}
      data={[
        {
          value: "list",
          label: (
            <>
              <IconListDetails {...iconProps} />
              <VisuallyHidden>Preview</VisuallyHidden>
            </>
          ),
        },
        {
          value: "grid",
          label: (
            <>
              <IconGridDots {...iconProps} />
              <VisuallyHidden>Code</VisuallyHidden>
            </>
          ),
        },
      ]}
    />
  );
}

export default ViewToggle;
