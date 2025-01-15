import { MaxWidthWrapper } from "../utils/MaxWidthWrapper";
import { SiInstagram, SiX, SiYoutube } from "react-icons/si";
import { IconType } from "react-icons";
import Logo from "/img/logo.svg";
import { Group, Text } from "@mantine/core";

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden py-12">
      <MaxWidthWrapper className="relative z-20 grid grid-cols-12 gap-x-1.5 gap-y-6">
        <LogoColumn />

        <GenericColumn
          title="Product"
          links={[
            {
              title: "Features",
              href: "/#features",
            },
            {
              title: "Testimonials",
              href: "/#testimonials",
            },
            {
              title: "Pricing",
              href: "/#pricing",
            },
          ]}
        />
        <GenericColumn
          title="Company"
          links={[
            {
              title: "Careers",
              href: "/#",
            },
            {
              title: "Team",
              href: "/#",
            },
            {
              title: "Contact",
              href: "/#",
            },
          ]}
        />
        <GenericColumn
          title="Legal"
          links={[
            {
              title: "Terms & Conditions",
              href: "/#",
            },
            {
              title: "Privacy Policy",
              href: "/#",
            },
            {
              title: "Refund Policy",
              href: "/#",
            },
          ]}
        />

        <GenericColumn
          title="Socials"
          links={[
            {
              title: "Twitter",
              href: "/#",
              Icon: SiX,
            },
            {
              title: "Instagram",
              href: "/#",
              Icon: SiInstagram,
            },
            {
              title: "Youtube",
              href: "/#",
              Icon: SiYoutube,
            },
          ]}
        />
      </MaxWidthWrapper>
    </footer>
  );
};

const LogoColumn = () => {
  return (
    <div className="col-span-12 md:col-span-4 ">
      <Group gap={2}>
        <div className="h-12 w-auto">
          <img src={Logo} alt="Hover.dev Logo" className="h-full w-auto" />
        </div>

        <Text size="xl">YieldGuard</Text>
      </Group>
      <span className="mt-3 inline-block text-xs text-zinc-400">
        © YieldGuard AI - All rights reserved.
      </span>
    </div>
  );
};

const GenericColumn = ({
  title,
  links,
}: {
  title: string;
  links: { title: string; href: string; Icon?: IconType }[];
}) => {
  return (
    <div className="col-span-6 space-y-2 text-sm md:col-span-2">
      <span className="block text-zinc-50">{title}</span>
      {links.map((l) => (
        <a
          key={l.title}
          href={l.href}
          className="flex items-center gap-1.5 text-zinc-400 transition-colors hover:text-zinc-200 hover:underline"
        >
          {l.Icon && <l.Icon />}
          {l.title}
        </a>
      ))}
    </div>
  );
};
