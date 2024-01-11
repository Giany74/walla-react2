import React, { useState, useEffect } from "react";
import { getTags } from "../../pages/ads/service";

const TagsSelect = ({ onTagsChange }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getTags()
      .then((data) => {
        setTags(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const [checkedTags, setCheckedTags] = useState({});

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    const updatedCheckedTags = { ...checkedTags, [value]: checked };

    setCheckedTags(updatedCheckedTags);

    const selectedTags = Object.keys(updatedCheckedTags).filter(
      (tag) => updatedCheckedTags[tag]
    );

    onTagsChange(selectedTags);
  };

  return (
    <div>
      <label>Tags:</label>
      <div>
        {tags.map((tag) => (
          <div key={tag}>
            <input
              type="checkbox"
              id={tag}
              value={tag}
              checked={checkedTags[tag] || false}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={tag}>{tag}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsSelect;