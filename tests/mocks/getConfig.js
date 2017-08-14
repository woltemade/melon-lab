const config = {
  exchange: "0xEXCHANGE",
};

export default jest.fn(() => {
  console.log("mocked");
  return config;
});
