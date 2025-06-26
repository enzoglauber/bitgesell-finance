const fs = require('fs/promises');

const readData = async (PATH) => {
  const raw = await fs.readFile(PATH, 'utf-8');
  return JSON.parse(raw);
};

const writeData = async (PATH, data) => {
  await fs.writeFile(PATH, JSON.stringify(data, null, 2), 'utf-8');
};

module.exports = { readData, writeData };