import { Button, Select, Space } from 'antd';
import { useLayoutEffect, useRef, useState } from 'react';
const GAP = 8;
const MORE_WIDTH = 80;
const Index = () => {
  const wrapRef = useRef(null);
  const btnRefs = useRef([]);
  const [visibleCount, setVisibleCount] = useState(0);

  const buttons = [
    { key: "add", label: "新增" },
    { key: "edit", label: "编辑" },
    { key: "delete", label: "删除" },
    { key: "export", label: "导出" },
    { key: "print", label: "打印" },
  ];

  useLayoutEffect(() => {
    const calc = () => {
      if (!wrapRef.current) return;

      const maxWidth = wrapRef.current.clientWidth;
      let usedWidth = 0;
      let count = 0;

      for (let i = 0; i < buttons.length; i++) {
        const w = btnRefs.current[i].offsetWidth || 0;
        const needMore = i < buttons.length - 1;
        const nextWidth = usedWidth + w + GAP + (needMore ? MORE_WIDTH : 0);

        if (nextWidth <= maxWidth) {
          usedWidth += w + GAP;
          count++;
        } else {
          break;
        }
      }

      setVisibleCount(count);
    };

    calc();

    const observer = new ResizeObserver(calc);
    observer.observe(wrapRef.current);

    return () => observer.disconnect();
  }, []);

  const visibleBtns = buttons.slice(0, visibleCount);
  const hiddenBtns = buttons.slice(visibleCount);
  return <div ref={wrapRef} style={{ width: "100%" }}>
    <Space size={GAP} wrap={false}>
      {visibleBtns.map((btn, i) => (
        <Button
          key={btn.key}
          ref={(el) => (btnRefs.current[i] = el)}
        >
          {btn.label}
        </Button>
      ))}

      {hiddenBtns.length > 0 && (
        <Select
          size="middle"
          style={{ width: MORE_WIDTH }}
          value="更多"
          options={hiddenBtns.map((b) => ({
            label: b.label,
            value: b.key,
          }))}
          onSelect={(key) => {
            console.log("点击：", key);
          }}
        />
      )}
      <div style={{ position: "absolute", visibility: "hidden" }}>
        {buttons.map((btn, i) => (
          <Button
            key={btn.key}
            ref={(el) => (btnRefs.current[i] = el)}
          >
            {btn.label}
          </Button>
        ))}
      </div>
    </Space>
  </div>
}
export default Index
