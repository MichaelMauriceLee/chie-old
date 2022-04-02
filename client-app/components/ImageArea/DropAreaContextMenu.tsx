import React from 'react';
import useContextMenu from '../../hooks/useContextMenu';

interface DropAreaContextMenuProps {
    setFile: (param: File | null) => void
  }

const DropAreaContextMenu: React.FC<DropAreaContextMenuProps> = ({ setFile }) => {
  const { anchorPoint, show } = useContextMenu();

  const onClick = async () => {
    const clipboardItems = await navigator.clipboard.read();
    if (clipboardItems.length !== 0 && clipboardItems[0].types.includes('image/png')) {
      const clipboardItem = clipboardItems[0];
      const blob = await clipboardItem.getType('image/png');
      setFile(blob as File);
    }
  };

  if (show) {
    return (
      <ul className="menu" style={{ top: anchorPoint.y, left: anchorPoint.x }}>
        <li>
          <button type="button" onClick={onClick}>
            Paste image from clipboard
          </button>
        </li>
      </ul>
    );
  }
  return <></>;
};

export default DropAreaContextMenu;
