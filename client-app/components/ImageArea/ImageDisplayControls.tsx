import React from 'react';

interface ImageDisplayControlsProps {
  showLineBoundingBox: boolean;
  showWordBoundingBox: boolean;
  setShowLineBoundingBox: (params: boolean) => void;
  setShowWordBoundingBox: (params: boolean) => void;
  setImage: (params: File | null) => void;
}

const ImageDisplayControls: React.FC<ImageDisplayControlsProps> = ({
  showLineBoundingBox,
  showWordBoundingBox,
  setShowLineBoundingBox,
  setShowWordBoundingBox,
  setImage,
}) => {
  const toggleShowLineBoundingBox = () => {
    setShowLineBoundingBox(!showLineBoundingBox);
  };

  const toggleShowWordBoundingBox = () => {
    setShowWordBoundingBox(!showWordBoundingBox);
  };

  const clearImage = () => {
    setImage(null);
  };

  return (
    <div className="flex flex-row justify-end items-center space-x-4 pt-1">
      <div className="space-y-1">
        <div className="space-x-1">
          <input
            type="checkbox"
            id="showLineBoxes"
            defaultChecked={showLineBoundingBox}
            onChange={toggleShowLineBoundingBox}
          />
          <label htmlFor="showLineBoxes">Show Line Bounding Box</label>
        </div>
        <div className="space-x-1">
          <input
            type="checkbox"
            id="showWordBoxes"
            defaultChecked={showWordBoundingBox}
            onChange={toggleShowWordBoundingBox}
          />
          <label htmlFor="showWordBoxes">Show Word Bounding Box</label>
        </div>
      </div>

      <div>
        <button
          className="border border-black rounded md:py-2 md:px-4 py-1 px-2 hover:bg-blue-500 hover:border-blue-500 hover:text-white"
          type="button"
          onClick={clearImage}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default ImageDisplayControls;
