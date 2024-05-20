import { SegmentedControl, VisuallyHidden, rem } from "@mantine/core";
import { IconGridDots, IconListDetails } from "@tabler/icons-react";

interface Props {
  onChange(value: "grid" | "list"): void;
  value: "grid" | "list";
}

const ViewToggle = ({ onChange, value }: Readonly<Props>) => {
  const iconProps = {
    stroke: 1.5,
    style: { display: "block", height: rem(20), width: rem(20) },
  };

  return (
    <SegmentedControl
      data={[
        {
          label: (
            <>
              <IconListDetails {...iconProps} />
              <VisuallyHidden>Preview</VisuallyHidden>
            </>
          ),
          value: "list",
        },
        {
          label: (
            <>
              <IconGridDots {...iconProps} />
              <VisuallyHidden>Code</VisuallyHidden>
            </>
          ),
          value: "grid",
        },
      ]}
      onChange={function (value: string) {
        onChange(value as "grid" | "list");
      }}
      value={value}
    />
  );
};

export default ViewToggle;
