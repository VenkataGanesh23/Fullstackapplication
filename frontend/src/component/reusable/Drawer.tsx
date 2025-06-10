import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Divider } from "@mui/material";
import ProductCard from "./Productcard";

const { Header, Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

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

const Drawer: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
  const renderDivider = (key: string): MenuItem => getItem(<Divider sx={{width:"400px"}} />, key);

  const items: MenuItem[] = [
    getItem("Lifestyle", "1"),
    getItem("Jordan", "2"),
    getItem("Running", "3"),
    getItem("Basketball", "4"),
    getItem("Training & Gym", "5"),
    getItem("Football", "6"),
    getItem("Skateboarding", "7"),
    getItem("Golf", "8"),
    getItem("Nike By You", "9"),
    getItem("Boots", "10"),
    getItem("Tennis", "11"),
    getItem("Athletics", "12"),
    getItem("Sandals, Slides & Flip Flops", "13"),
    renderDivider("divider1"),
    getItem("Kids", "sub1", undefined, [
      renderCheckableItem("Boys", "k1"),
      renderCheckableItem("Girls", "k2"),
    ]),
    renderDivider("divider2"),
    getItem("Shop By Price", "sub2", undefined, [
      renderCheckableItem("Under ₹2,500.00", "p1"),
      renderCheckableItem("₹2,501.00 - \n ₹7,500.00", "p2"),
      renderCheckableItem("₹7,501.00 - ₹12,999.00", "p3"),
      renderCheckableItem("Over ₹13,000.00", "p4"),
    ]),
    renderDivider("divider3"),
    getItem(
      `Sale & Offers${selectedItems.includes("s1") ? " (1)" : ""}`,
      "sub3",
      undefined,
      [renderCheckableItem("Sale", "s1")]
    ),
    renderDivider("divider4"),
    {
      key: "sub4",
      label: "Colour",
      children: [
        {
          key: "color-grid",
          label: renderColorGrid(),
        },
      ],
    },
    renderDivider("divider5"),
    getItem("Shoe Height", "sub5", undefined, [
      renderCheckableItem("Low", "sh1"),
      renderCheckableItem("Mid", "sh2"),
      renderCheckableItem("High", "sh3"),
    ]),
    renderDivider("divider6"),
    getItem("Brand", "sub6", undefined, [
      renderCheckableItem("Nike Sportswear", "b1"),
      renderCheckableItem("Nike By You", "b2"),
      renderCheckableItem("Jordan", "b3"),
    ]),
    renderDivider("divider7"),
    getItem("Collections", "sub7", undefined, [
      renderCheckableItem("Air Max", "col1"),
      renderCheckableItem("Air Force 1", "col2"),
      renderCheckableItem("Pegasus", "col3"),
    ]),
    renderDivider("divider8"),
    getItem("Air Max", "sub8", undefined, [
      renderCheckableItem("Air Max 1", "sust1"),
      renderCheckableItem("Air Max Pulse", "sust2"),
      renderCheckableItem("Air Max Dn", "sust3"),
      renderCheckableItem("Air Max 90", "sust4"),
    ]),
    renderDivider("divider9"),
    getItem("Width", "sub10", undefined, [
      renderCheckableItem("Regular", "bf1"),
      renderCheckableItem("Wide", "bf2"),
      renderCheckableItem("Extra Wide", "bf3"),
    ]),
    renderDivider("divider10"),
    getItem("Sports", "sub11", undefined, [
      renderCheckableItem("Lifestyle", "sp1"),
      renderCheckableItem("Running", "sp2"),
      renderCheckableItem("Training & Gym", "sp3"),
      renderCheckableItem("Basketball", "sp4"),
    ]),
    renderDivider("divider11"),
    getItem("Closure Type", "sub12", undefined, [
      renderCheckableItem("Slip-On", "mat1"),
      renderCheckableItem("Strap", "mat2"),
      renderCheckableItem("Toggle", "mat1"),
      renderCheckableItem("Laces", "mat2"),
    ]),
    renderDivider("divider12"),
    getItem("Features", "sub13", undefined, [
      renderCheckableItem("Spikeless", "wea1"),
      renderCheckableItem("Water-Resistant", "wea2"),
      renderCheckableItem("Waterproof", "wea2"),
    ]),
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="light" width={240} style={{padding:" 0 0 1em 48px"}} >
        <div className="drawer-scrollbar">
          <Menu
            theme="light"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </div>
      </Sider>
      <Layout style={{ overflow: "hidden" }}>
  <Header style={{ padding: 0, background: colorBgContainer }} />
  <div
    className="drawer-right"
    style={{
      background: colorBgContainer,
      height: "calc(100vh - 64px)", 
      overflowY: "auto",
      padding: "0px",
    }}
  >
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0px" }}>
      <ProductCard
        title="Nike Air Max 95"
        subtitle="Older Kids' Shoes"
        message="Available in SNKRS"
        price="₹ 10,295.00"
        image="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e36233ae-108c-4321-a326-4919d85a26b8/AIR+MAX+95+BB+S+%28GS%29.png"
        link="https://www.nike.com/in/launch/r/HF7054-006"
        colorCount="1 Colour"
      />
      <ProductCard
        title="Nike Air Max 95"
        subtitle="Older Kids' Shoes"
        message="Available in SNKRS"
        price="₹ 10,295.00"
        image="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e36233ae-108c-4321-a326-4919d85a26b8/AIR+MAX+95+BB+S+%28GS%29.png"
        link="https://www.nike.com/in/launch/r/HF7054-006"
        colorCount="1 Colour"
      />
      <ProductCard
        title="Nike Air Max 95"
        subtitle="Older Kids' Shoes"
        message="Available in SNKRS"
        price="₹ 10,295.00"
        image="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e36233ae-108c-4321-a326-4919d85a26b8/AIR+MAX+95+BB+S+%28GS%29.png"
        link="https://www.nike.com/in/launch/r/HF7054-006"
        colorCount="1 Colour"
      />
      <ProductCard
        title="Nike Air Max 95"
        subtitle="Older Kids' Shoes"
        message="Available in SNKRS"
        price="₹ 10,295.00"
        image="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e36233ae-108c-4321-a326-4919d85a26b8/AIR+MAX+95+BB+S+%28GS%29.png"
        link="https://www.nike.com/in/launch/r/HF7054-006"
        colorCount="1 Colour"
      />
      <ProductCard
        title="Nike Air Max 95"
        subtitle="Older Kids' Shoes"
        message="Available in SNKRS"
        price="₹ 10,295.00"
        image="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e36233ae-108c-4321-a326-4919d85a26b8/AIR+MAX+95+BB+S+%28GS%29.png"
        link="https://www.nike.com/in/launch/r/HF7054-006"
        colorCount="1 Colour"
      />
      <ProductCard
        title="Nike Air Max 95"
        subtitle="Older Kids' Shoes"
        message="Available in SNKRS"
        price="₹ 10,295.00"
        image="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e36233ae-108c-4321-a326-4919d85a26b8/AIR+MAX+95+BB+S+%28GS%29.png"
        link="https://www.nike.com/in/launch/r/HF7054-006"
        colorCount="1 Colour"
      />
      <ProductCard
        title="Nike Air Max 95"
        subtitle="Older Kids' Shoes"
        message="Available in SNKRS"
        price="₹ 10,295.00"
        image="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e36233ae-108c-4321-a326-4919d85a26b8/AIR+MAX+95+BB+S+%28GS%29.png"
        link="https://www.nike.com/in/launch/r/HF7054-006"
        colorCount="1 Colour"
      /><ProductCard
        title="Nike Air Max 95"
        subtitle="Older Kids' Shoes"
        message="Available in SNKRS"
        price="₹ 10,295.00"
        image="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e36233ae-108c-4321-a326-4919d85a26b8/AIR+MAX+95+BB+S+%28GS%29.png"
        link="https://www.nike.com/in/launch/r/HF7054-006"
        colorCount="1 Colour"
      />
      <ProductCard
        title="Nike Air Max 95"
        subtitle="Older Kids' Shoes"
        message="Available in SNKRS"
        price="₹ 10,295.00"
        image="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e36233ae-108c-4321-a326-4919d85a26b8/AIR+MAX+95+BB+S+%28GS%29.png"
        link="https://www.nike.com/in/launch/r/HF7054-006"
        colorCount="1 Colour"
      />
      <ProductCard
        title="Nike Air Max 95"
        subtitle="Older Kids' Shoes"
        message="Available in SNKRS"
        price="₹ 10,295.00"
        image="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e36233ae-108c-4321-a326-4919d85a26b8/AIR+MAX+95+BB+S+%28GS%29.png"
        link="https://www.nike.com/in/launch/r/HF7054-006"
        colorCount="1 Colour"
      />
      <ProductCard
        title="Nike Air Max 95"
        subtitle="Older Kids' Shoes"
        message="Available in SNKRS"
        price="₹ 10,295.00"
        image="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e36233ae-108c-4321-a326-4919d85a26b8/AIR+MAX+95+BB+S+%28GS%29.png"
        link="https://www.nike.com/in/launch/r/HF7054-006"
        colorCount="1 Colour"
      />
    </div>
  </div>
</Layout>

    </Layout>
  );
};

export default Drawer;
