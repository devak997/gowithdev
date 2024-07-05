import { Anchor, Breadcrumbs, Group, Text } from "@mantine/core";
import { IconChevronRight, IconHome } from "@tabler/icons-react";
import React from "react";

export type BreadcrumbItem = {
  href: string;
  title: string;
};

const BreadcrumbsComponent: React.FC<{ items?: BreadcrumbItem[] }> = ({
  items = [],
}) => {
  return (
    <Breadcrumbs fw="bolder" mb="sm" separator={<IconChevronRight size={16} />}>
      <Anchor href="/">
        <Group gap={4}>
          <IconHome height={16} width={16} />
          <Text>Home</Text>
        </Group>
      </Anchor>
      {items.map((item, index) => (
        <Anchor href={item.href} key={index}>
          {item.title}
        </Anchor>
      ))}
    </Breadcrumbs>
  );
};

export default BreadcrumbsComponent;
