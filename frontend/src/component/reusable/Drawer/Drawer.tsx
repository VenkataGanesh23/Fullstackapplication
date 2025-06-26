import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Divider } from "@mui/material";

const colors = [
  "Black",
  "Blue",
  "Brown",
  "Green",
  "Grey",
  "Multi-Colour",
  "Orange",
  "Pink",
  "Purple",
  "Red",
  "White",
  "Yellow",
];

const categories = [
  "Lifestyle",
  "Jordan",
  "Running",
  "Basketball",
  "Training & Gym",
  "Football",
  "Skateboarding",
  "Golf",
  "Nike By You",
  "Boots",
  "Tennis",
  "Athletics",
  "Sandals, Slides & Flip Flops",
];

const priceRanges = [
  "Under ₹2,500.00",
  "₹2,501.00 - ₹7,500.00",
  "₹7,501.00 - ₹12,999.00",
  "Over ₹13,000.00",
];

const kidsOptions = ["Boys", "Girls"];

const shoeHeights = ["Low", "Mid", "High"];

const brands = ["Nike Sportswear", "Nike By You", "Jordan"];

const collections = ["Air Max", "Air Force 1", "Pegasus"];

const airMaxVariants = [
  "Air Max 1",
  "Air Max Pulse",
  "Air Max Dn",
  "Air Max 90",
];

const widths = ["Regular", "Wide", "Extra Wide"];

const sports = ["Lifestyle", "Running", "Training & Gym", "Basketball"];

const closureTypes = ["Slip-On", "Strap", "Toggle", "Laces"];

const features = ["Spikeless", "Water-Resistant", "Waterproof"];

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return { key, icon, children, label, type } as MenuItem;
}

const Drawer: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleSelect = (key: string) => {
    setSelectedItems((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const renderCheckableItem = (label: string, key: string): MenuItem => {
    const isSelected = selectedItems.includes(key);
    return {
      key,
      label: (
        <div
          onClick={() => toggleSelect(key)}
          className="drawer-dropdown"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <div
            className={`custom-checkbox ${isSelected ? "checked" : ""}`}
          ></div>
          <span>{label}</span>
        </div>
      ),
    };
  };

  const renderColorGrid = () => (
    <div className="drawer-colour">
      {colors.map((color, idx) => {
        const isSelected = selectedItems.includes(`c${idx}`);
        const bg =
          color === "Multi-Colour"
            ? "repeating-conic-gradient(#000 0% 25%, #fff 0% 50%)"
            : color.toLowerCase();

        return (
          <div
            className="drawer-texts"
            key={`c${idx}`}
            onClick={() => toggleSelect(`c${idx}`)}
            title={color}
          >
            <div
              className={`drawer-colour-styles ${isSelected ? "selected" : ""}`}
              style={{ background: bg }}
            >
              {isSelected && <span className="checkmark-badge">✔</span>}
            </div>
            <div className="drawer-colour-font">{color}</div>
          </div>
        );
      })}
    </div>
  );

  const renderDivider = (key: string): MenuItem =>
    getItem(<Divider sx={{ width: "400px" }} />, key);

  const items: MenuItem[] = [
    ...categories.map((cat, i) => getItem(cat, `cat-${i}`)),
    renderDivider("divider1"),
    getItem(
      "Kids",
      "sub-kids",
      undefined,
      kidsOptions.map((k, i) => renderCheckableItem(k, `k${i}`))
    ),
    renderDivider("divider2"),
    getItem(
      "Shop By Price",
      "sub-price",
      undefined,
      priceRanges.map((p, i) => renderCheckableItem(p, `p${i}`))
    ),
    renderDivider("divider3"),
    getItem("Sale & Offers", "sub-sale", undefined, [
      renderCheckableItem("Sale", "s1"),
    ]),
    renderDivider("divider4"),
    getItem("Colour", "sub-colour", undefined, [
      { key: "color-grid", label: renderColorGrid() },
    ]),
    renderDivider("divider5"),
    getItem(
      "Shoe Height",
      "sub-height",
      undefined,
      shoeHeights.map((sh, i) => renderCheckableItem(sh, `sh${i}`))
    ),
    renderDivider("divider6"),
    getItem(
      "Brand",
      "sub-brand",
      undefined,
      brands.map((b, i) => renderCheckableItem(b, `b${i}`))
    ),
    renderDivider("divider7"),
    getItem(
      "Collections",
      "sub-collections",
      undefined,
      collections.map((c, i) => renderCheckableItem(c, `col${i}`))
    ),
    renderDivider("divider8"),
    getItem(
      "Air Max",
      "sub-airmax",
      undefined,
      airMaxVariants.map((s, i) => renderCheckableItem(s, `am${i}`))
    ),
    renderDivider("divider9"),
    getItem(
      "Width",
      "sub-width",
      undefined,
      widths.map((w, i) => renderCheckableItem(w, `w${i}`))
    ),
    renderDivider("divider10"),
    getItem(
      "Sports",
      "sub-sports",
      undefined,
      sports.map((s, i) => renderCheckableItem(s, `sp${i}`))
    ),
    renderDivider("divider11"),
    getItem(
      "Closure Type",
      "sub-closure",
      undefined,
      closureTypes.map((c, i) => renderCheckableItem(c, `cl${i}`))
    ),
    renderDivider("divider12"),
    getItem(
      "Features",
      "sub-features",
      undefined,
      features.map((f, i) => renderCheckableItem(f, `f${i}`))
    ),
  ];

  return (
    <Menu
      theme="light"
      defaultSelectedKeys={["cat-0"]}
      mode="inline"
      items={items}
    />
  );
};

export default Drawer;
