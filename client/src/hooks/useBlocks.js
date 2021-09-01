import { useEffect, useState } from "react";

import Api from "../lib/api";

const useBlocks = (pageId) => {
  const [blocks, setBlocks] = useState([]);

  const loadBlocks = async () => {
    const response = await Api.get(`/pages/${pageId}/blocks`);
    const data = response.data;
    console.log(Object.values(data));
    setBlocks(Object.values(data));
  };

  const addBlock = async (block) => {
    const response = await Api.post(`/pages/${pageId}/blocks`, block);
    const newBlock = response.data;
    setBlocks((blocks) => [...blocks, newBlock]);
  };

  const updateBlock = async (id, data) => {
    const index = blocks.findIndex((block) => block.id === id);
    const newBlock = { ...blocks[index], data };

    setBlocks((blocks) => {
      blocks[index] = newBlock;
      return [...blocks];
    });

    const response = await Api.put(`/pages/${pageId}/blocks/${id}`, newBlock);
    return response.data;
  };

  useEffect(() => {
    loadBlocks();
  }, [pageId]);

  return {
    blocks,
    addBlock,
    updateBlock,
  };
};

export default useBlocks;
